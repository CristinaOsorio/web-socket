const socket = io();
/**
 * Save a new note
 * @param {string} title
 * @param {string} description
 */
const saveNote = (title, description) => {
  socket.emit("client:new_note", {
    title,
    description,
  });
};

/**
 * Update note
 * @param {string} id
 * @param {string} title
 * @param {string} description
 */
const updateNote = (id, title, description) => {
  socket.emit("client:update_note", {
    id,
    title,
    description,
  });
};

socket.on("server:update_note_notification", (note) => {
  createNotification(`La nota ${note.id} ha sido actualizada.`, "warning");
});

/**
 * Delete Note
 * @param {string} id
 */
const deleteNote = (id) => {
  socket.emit("client:delete_note", id);
};

socket.on("server:delete_note_notification", () => {
  createNotification("Se ha eliminado una nota.", "error");
});

/**
 * Get id note
 * @param {string} id
 */
const getNote = (id) => {
  socket.emit("client:get_note", id);
};

socket.on("server:new_note", (note) => appendNote(note));

socket.on("server:new_note_notification", (note) => {
  createNotification("Se ha agregado una nueva nota.", "success");
});

socket.on("server:load_notes", (notes) => renderNotes(notes));

socket.on("server:selected_note", (note) => {
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  title.value = note.title;
  description.value = note.description;
  noteID = note.id;
});
