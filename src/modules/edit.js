export const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

export function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(savedTasks));
}
