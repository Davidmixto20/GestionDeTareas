function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const form = document.getElementById("task-form");
const formTitle = document.getElementById("form-title");
const cardsContainer = document.getElementById("cards-container");
const stats = document.getElementById("stats");

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeModalBtn = document.getElementById("close-modal");

const filterSubject = document.getElementById("filter-subject");
const filterPriority = document.getElementById("filter-priority");
const sortBy = document.getElementById("sort-by");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const idField = document.getElementById("task-id").value;
  const editing = idField !== "";

  const task = {
    id: editing ? Number(idField) : Date.now(),
    dueDate: document.getElementById("due-date").value,
    subject: document.getElementById("subject").value,
    priority: document.getElementById("priority").value,
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    completed: editing ? getTasks().find(t => t.id == idField).completed : false
  };

  let tasks = getTasks();
  
  if (editing) {
    tasks = tasks.map(t => t.id === task.id ? task : t);
  } else {
    tasks.push(task);
  }

  saveTasks(tasks);
  resetForm();
  render();
});

document.getElementById("reset-btn").addEventListener("click", resetForm);

function resetForm() {
  form.reset();
  document.getElementById("task-id").value = "";
  formTitle.textContent = "Agregar Tarea";
}

function getTaskStatus(task) {
  if(task.completed) return "Completada";
  const today = new Date().toISOString().split("T")[0];
  return task.dueDate < today ? "Retrasada" : "Pendiente";
}

function render() {
  let tasks = getTasks();

  if (filterSubject.value.trim() !== "") {
    tasks = tasks.filter(t =>
      t.subject.toLowerCase().includes(filterSubject.value.toLowerCase())
    );
  }

  if (filterPriority.value !== "") {
    tasks = tasks.filter(t => t.priority === filterPriority.value);
  }

  if (sortBy.value === "date-asc") tasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  if (sortBy.value === "date-desc") tasks.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
  if (sortBy.value === "priority-desc") {
    const order = { Alta: 3, Media: 2, Baja: 1 };
    tasks.sort((a, b) => order[b.priority] - order[a.priority]);
  }

  drawCards(tasks);
  updateStats(tasks);
}

function drawCards(tasks) {
  cardsContainer.innerHTML = "";

  if (tasks.length === 0) {
    cardsContainer.innerHTML = "<p>No hay tareas registradas.</p>";
    return;
  }

  tasks.forEach(task => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="top">
        <span class="date">${task.dueDate}</span>
        <span class="badge badge-priority-${task.priority}">${task.priority}</span>
        <span class="badge badge-status-${getTaskStatus(task)}">${getTaskStatus(task)}</span>
      </div>

      <h3>${task.title}</h3>
      <p class="desc">${task.description}</p>
      <p class="small"><b>Materia:</b> ${task.subject}</p>
      
      <div class="actions">
        <button class="btn-edit"><i class="fa fa-eye"></i> Ver más</button>
        <button class="btn-delete"><i class="fa fa-trash"></i></button>
        ${!task.completed ? `<button class="btn-complete" title="Completar"><i class="fa fa-check"></i></button>` : ""}
      </div>
    `;

    card.querySelector(".btn-edit").onclick = () => openModal(task);
    card.querySelector(".btn-delete").onclick = () => deleteTask(task.id);

    const completeBtn = card.querySelector(".btn-complete");
    if (completeBtn) completeBtn.onclick = () => toggleComplete(task.id);

    cardsContainer.appendChild(card);
  });
}

function toggleComplete(id) {
  let tasks = getTasks().map(t => t.id === id ? {...t, completed: true} : t);
  saveTasks(tasks);
  render();
}

function deleteTask(id) {
  if (!confirm("¿Eliminar esta tarea?")) return;

  let tasks = getTasks().filter(t => t.id !== id);
  saveTasks(tasks);
  render();
}

function openModal(task) {
  modalBody.innerHTML = `
    <h2>${task.title}</h2>
    <p><b>Materia:</b> ${task.subject}</p>
    <p><b>Prioridad:</b> ${task.priority}</p>
    <p><b>Fecha de entrega:</b> ${task.dueDate}</p>
    <p><b>Estado:</b> ${getTaskStatus(task)}</p>
    <hr>
    <p>${task.description}</p>
    <br>
    <button id="edit-task">Editar</button>
  `;

  document.getElementById("edit-task").onclick = () => {
    loadTaskInForm(task);
    closeModal();
  };

  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

function loadTaskInForm(task) {
  document.getElementById("task-id").value = task.id;
  document.getElementById("due-date").value = task.dueDate;
  document.getElementById("subject").value = task.subject;
  document.getElementById("priority").value = task.priority;
  document.getElementById("title").value = task.title;
  document.getElementById("description").value = task.description;

  formTitle.textContent = "Editar Tarea";
}

function updateStats(tasks) {
  stats.textContent = `Total: ${tasks.length}`;
}


filterPriority.addEventListener("change", render);
sortBy.addEventListener("change", render);

document.getElementById("clear-filters").addEventListener("click", () => {
  filterSubject.value = "";
  filterPriority.value = "";
  sortBy.value = "date-asc";
  render();
});

render();
