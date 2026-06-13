const taskInput = document.getElementById('task-input');
const addButton = document.querySelector('.btn-add');
const taskList  = document.getElementById('task-list');

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const tasks = loadTasks();
  tasks.push(text);
  saveTasks(tasks);
  renderTasks(tasks);

  taskInput.value = '';
  taskInput.focus();
}

function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach((text) => {
    const li = document.createElement('li');
    li.className = 'task-item';

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = text;

    li.appendChild(span);
    taskList.appendChild(li);
  });
}

const STORAGE_KEY = 'todo-app-tasks';

function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

renderTasks(loadTasks());
