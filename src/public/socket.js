const socket = io();
/**
 * Save a new note
 * @param {string} title
 * @param {string} description
 */
const saveNote = (title, description) => {
  socket.emit("client:newnote", {
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
  socket.emit("client:updatenote", {
    id,
    title,
    description,
  });
};

/**
 * Delete Note
 * @param {string} id
 */
const deleteNote = (id) => {
  socket.emit("client:deletenote", id);
};

/**
 * Get id note
 * @param {string} id
 */
const getNote = (id) => {
  socket.emit("client:getnote", id);
};

socket.on("server:newnotes", (note) => appendNote(note));

socket.on("server:loadnotes", (notes) => renderNotes(notes));

socket.on("server:selectednote", (note) => {
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  title.value = note.title;
  description.value = note.description;
  noteID = note.id;
});
