import express from "express";
import { Server as WebSocketServer } from "socket.io";
import http from "http";
import { v4 as uuid } from "uuid";

const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server);

let notes = [
  { title: "Note 1", description: "Lorem 1", id: "1" },
  { title: "Note 2", description: "Lorem 2", id: "2" },
  { title: "Note 3", description: "Lorem 3", id: "3" },
  { title: "Note 4", description: "Lorem 4", id: "4" },
];

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("Nueva Conexion:", socket.id);

  io.emit("server:loadnotes", notes);

  socket.on("client:newnote", (newNote) => {
    const note = { ...newNote, id: uuid() };
    notes.push(note);
    io.emit("server:newnotes", note);
  });

  socket.on("client:deletenote", (id) => {
    notes = notes.filter((note) => note.id !== id);
    io.emit("server:loadnotes", notes);
  });

  socket.on("client:getnote", (id) => {
    const note = notes.find((note) => note.id === id);
    socket.emit("server:selectednote", note);
  });

  socket.on("client:updatenote", (updatedNote) => {
    notes.map((note) => {
      if (note.id == updatedNote.id) {
        note.title = updatedNote.title;
        note.description = updatedNote.description;
        return note;
      }
    });
    io.emit("server:loadnotes", notes);
  });
});

server.listen(3000);
console.log("Server on port: ", 3000);
