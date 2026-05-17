let input = document.querySelector("input");
let taskList = document.querySelector(".task-list");

window.onload = function () {
  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach(function (task) {
    addTaskToScreen(task);
  });
};

function addtask() {
  let taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  addTaskToScreen(taskText);

  saveTask(taskText);

  input.value = "";
}

function addTaskToScreen(task) {
  let li = document.createElement("li");

  li.innerHTML = `
        <span class="task-text">${task}</span>

        <div class="btn-box">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

  taskList.appendChild(li);

  let deleteBtn = li.querySelector(".delete-btn");
  let editBtn = li.querySelector(".edit-btn");
  let taskText = li.querySelector(".task-text");

  deleteBtn.addEventListener("click", function () {
    li.remove();

    removeTask(task);
  });

  editBtn.addEventListener("click", function () {
    let updatedTask = prompt("Edit your task", taskText.innerText);

    if (updatedTask !== null && updatedTask.trim() !== "") {
      updateTask(taskText.innerText, updatedTask);

      taskText.innerText = updatedTask;
    }
  });
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  let updatedTasks = tasks.filter(function (item) {
    return item !== task;
  });

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function updateTask(oldTask, newTask) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  let updatedTasks = tasks.map(function (item) {
    if (item === oldTask) {
      return newTask;
    }

    return item;
  });

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
