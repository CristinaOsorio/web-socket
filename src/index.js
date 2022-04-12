import express from "express";
import { Server as WebSocketServer } from "socket.io";
import http from "http";
import { v4 as uuid } from "uuid";

const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server);

let notes = [];

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("Nueva Conexion:", socket.id);

  io.emit("server:load_notes", notes);

  socket.on("client:new_note", (newNote) => {
    const note = { ...newNote, id: uuid() };
    notes.push(note);
    io.emit("server:new_note", note);
    socket.broadcast.emit("server:new_note_notification", note);
  });

  socket.on("client:delete_note", (id) => {
    notes = notes.filter((note) => note.id !== id);
    io.emit("server:load_notes", notes);
    socket.broadcast.emit("server:delete_note_notification");
  });

  socket.on("client:get_note", (id) => {
    const note = notes.find((note) => note.id === id);
    socket.emit("server:selected_note", note);
  });

  socket.on("client:update_note", (updatedNote) => {
    notes.map((note) => {
      if (note.id == updatedNote.id) {
        note.title = updatedNote.title;
        note.description = updatedNote.description;
        return note;
      }
    });
    socket.broadcast.emit("server:update_note_notification", updatedNote);
    io.emit("server:load_notes", notes);
  });
});

server.listen(3000);
console.log("Server on port: ", 3000);
