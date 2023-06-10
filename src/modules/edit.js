export const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

export function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

export function addTask(taskValue) {
  if (taskValue === '') {
    return;
  }

  const task = {
    text: taskValue,
    completed: false,
    index: savedTasks.length + 1,
  };

  savedTasks.push(task);
  saveTasks();
}

export function updateIndexes() {
  savedTasks.forEach((task, index) => {
    task.index = index + 1;
  });
}
