import './style.css';
import { saveTasks, savedTasks } from './modules/edit.js';

const taskInput = document.getElementById('input');
const addButton = document.getElementById('button');
const todoList = document.getElementById('todo-list');
const clearButton = document.getElementById('clearButton');

function updateIndexes() {
  const taskItems = todoList.children;
  for (let i = 0; i < taskItems.length; i += 1) {
    const taskItem = taskItems[i];
    const checkbox = taskItem.querySelector('input[type="checkbox"]');
    checkbox.dataset.index = i;
  }
}

function removeTask(index) {
  savedTasks.splice(index, 1);
  saveTasks();
  updateIndexes();
}

function removeTaskElement(li) {
  const index = parseInt(li.querySelector('input[type="checkbox"]').dataset.index, 10);
  removeTask(index);

  todoList.removeChild(li);
  updateIndexes();
}

function editTask(li) {
  const taskValue = li.firstChild.nextSibling.textContent.trim();

  const popupDiv = document.createElement('div');
  popupDiv.classList.add('popup');
  const heading = document.createElement('h2');
  heading.textContent = 'Edit task';
  const input = document.createElement('input');
  input.type = 'text';

  input.setAttribute('value', taskValue);

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.addEventListener('click', () => {
    const editedTaskValue = input.value.trim();
    if (editedTaskValue !== '') {
      li.firstChild.nextSibling.nodeValue = editedTaskValue;

      const index = parseInt(li.querySelector('input[type="checkbox"]').dataset.index, 10);

      savedTasks[index].text = editedTaskValue;
      saveTasks();
      popupDiv.remove();
    }
  });
  popupDiv.appendChild(heading);
  popupDiv.appendChild(input);
  popupDiv.appendChild(saveButton);
  document.body.appendChild(popupDiv);
}

function renderTasks() {
  todoList.innerHTML = ''; // Clear the existing list before rendering

  savedTasks.forEach((task, index) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.dataset.index = index;

    li.appendChild(checkbox);
    li.innerHTML += `${task.text} <button class="remove-button">X</button> <button class="edit-button">Edit</button>`;
    todoList.appendChild(li);

    const removeButton = li.querySelector('.remove-button');
    removeButton.addEventListener('click', () => {
      removeTaskElement(li);
    });

    const editButton = li.querySelector('.edit-button');
    editButton.addEventListener('click', () => {
      editTask(li);
    });
  });

  updateIndexes();
}

function toggleTaskStatus(index) {
  savedTasks[index].completed = !savedTasks[index].completed;
  saveTasks();
}

function handleCheckboxChange(event) {
  const checkbox = event.target;
  const index = parseInt(checkbox.dataset.index, 10);
  toggleTaskStatus(index);
}

function clearCompletedTasks() {
  const completedTasks = savedTasks.filter((task) => task.completed);
  completedTasks.forEach((task) => {
    const index = savedTasks.indexOf(task);
    removeTask(index);
  });
  renderTasks();
}

function addTask() {
  const taskValue = taskInput.value.trim();

  if (taskValue === '') {
    return;
  }

  const task = {
    text: taskValue,
    completed: false,
  };

  savedTasks.push(task);
  saveTasks();

  taskInput.value = '';
  renderTasks();
}

renderTasks();

addButton.addEventListener('click', addTask);
clearButton.addEventListener('click', clearCompletedTasks);
todoList.addEventListener('change', handleCheckboxChange);
