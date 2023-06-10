const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

export { savedTasks, saveTasks };
