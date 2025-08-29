// Authentication Check
const user = localStorage.getItem("currentUser");
if (!user && window.location.pathname.endsWith("todo.html")) {
  window.location.href = "index.html";
}

if (document.getElementById("welcomeMsg")) {
  document.getElementById("welcomeMsg").textContent = `📝 Welcome, ${user}`;
}

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem(`tasks_${user}`)) || [];
renderTasks();

if (addTaskBtn) {
  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (!taskText) return;
    tasks.push({ text: taskText, completed: false });
    updateTasks();
    taskInput.value = "";
  });
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
      <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
      <div>
        <button class="complete-btn btn-sm">✔️</button>
        <button class="delete-btn btn-sm">🗑️</button>
      </div>
    `;

    li.querySelector(".complete-btn").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      updateTasks();
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks.splice(index, 1);
      updateTasks();
    });

    taskList.appendChild(li);
  });
}

function updateTasks() {
  localStorage.setItem(`tasks_${user}`, JSON.stringify(tasks));
  renderTasks();
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  });
}

