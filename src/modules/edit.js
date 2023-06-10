import { saveTasks, savedTasks } from './localStorage.js';

export function updateStatus(index, completed) {
  savedTasks[index].completed = completed;
  saveTasks();
}

export function removeTask(index) {
  savedTasks.splice(index, 1);
  saveTasks();
}
