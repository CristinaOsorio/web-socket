const noteForm = document.querySelector("#noteForm");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  noteID
    ? updateNote(noteID, title.value, description.value)
    : saveNote(title.value, description.value);
  title.value = "";
  description.value = "";
  title.focus();
});
