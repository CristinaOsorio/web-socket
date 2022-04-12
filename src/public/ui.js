const notesList = document.querySelector("#notes");

let noteID = "";

const noteUI = (note) => {
  const div = document.createElement("div");

  div.innerHTML = `
    <div class="card card-body rounded-0 mb-2 animate__animated animate__slideInUp">
        <div class="d-flex justify-content-between">
            <h1 class="h3 card-title">${note.title}</h1>
            <div>
              <button class="btn btn-danger delete" data-id="${note.id}">Eliminar</button>
              <button class="btn btn-warning update text-white" data-id="${note.id}">Actualizar</button>
          </div>
        </div>
        <p>${note.description}</p>
    </div>
  `;

  const btnDelete = div.querySelector(".delete");
  const btnUpdate = div.querySelector(".update");

  btnDelete.addEventListener("click", () => {
    deleteNote(btnDelete.dataset.id);
  });

  btnUpdate.addEventListener("click", () => {
    getNote(btnUpdate.dataset.id);
  });

  return div;
};

const renderNotes = (notes) => {
  console.log("render");
  notesList.innerHTML = "";
  notes.forEach((note) => {
    notesList.append(noteUI(note));
  });
};

const appendNote = (note) => {
  notesList.append(noteUI(note));
};

/**
 * Create notification
 * @param {string} message
 * @param {"success" | "error" | "warning"} type
 */
const createNotification = (message, type) => {
  const divNotifications = document.querySelector("#notification");
  const notification = document.createElement("div");
  const style = types[type || "default"];

  notification.innerHTML = `
    <div class="toast align-items-center text-white ${style?.color} border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body"></div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  if (style.icon) {
    const toastBody = notification.querySelector(".toast-body");
    toastBody.innerHTML += `<i class="${style.icon}"></i> `;
    toastBody.innerHTML += message;
  }

  divNotifications.appendChild(notification);

  const toast = notification.querySelector(".toast");

  const toastElement = new bootstrap.Toast(toast, {
    animation: true,
    delay: 3000,
  });

  toastElement.show();

  setTimeout(() => {
    notification.remove();
  }, 3000);
};

const types = {
  info: {
    icon: "fas fa-info-circle",
    type: "info",
    color: "bg-info",
  },
  error: {
    icon: "fas fa-exclamation-circle",
    type: "error",
    color: "bg-danger",
  },
  success: {
    icon: "fas fa-check-circle",
    type: "success",
    color: "bg-success",
  },
  warning: {
    icon: "fas fa-exclamation-triangle",
    type: "warning",
    color: "bg-warning",
  },
  default: {
    icon: "",
    type: "default",
    color: "",
  },
};
