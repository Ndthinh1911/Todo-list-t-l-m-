const taskElm = document.querySelector("#todo-input");
const addBtn = document.querySelector(".input-btn");
const todoList = document.querySelector(".todo-list");

let tasks = getTaskFromLocalStorage();
renderTasks(tasks);

function addTask() {
  if (!taskElm.value) {
    console.log("Please add a task!");
    return;
  }
  var taskId = addBtn.getAttribute("id");
  var tasks = getTaskFromLocalStorage();
  var task = {
    name: taskElm.value,
    taskIsDone: false,
  };
  if (taskId !== null) {
    tasks[taskId] = task;
    addBtn.removeAttribute("id");
  } else {
    tasks.push(task);
  }

  taskElm.value = "";
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(tasks);
}

function renderTasks(tasks) {
  let content = tasks.map((task, index) => {
    return `
        <div class="tasks">
            <span class="task">${task.name}</span>
            <button class="btn edit-btn" onclick = editTask(${index}) data-index="${index}">Edit</button>
            <button class="btn delete-btn" onclick = deleteTask(${index}) data-index="${index}">Delete</button>
          </div>
        `;
  });

  todoList.innerHTML = content.join("");
}
function doneTask(e) {
  var tasks = getTaskFromLocalStorage();
  var index = Array.from(todoList.children).indexOf(e.target.parentElement);
  console.log(index);

  tasks[index].taskIsDone = !tasks[index].taskIsDone;

  if (tasks[index].taskIsDone) {
    e.target.classList.add("active");
  } else {
    e.target.classList.remove("active");
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function editTask(id) {
  let tasks = getTaskFromLocalStorage();
  if (tasks.length > 0 || tasks[id]) {
    taskElm.value = tasks[id].name;
    addBtn.setAttribute("id", id);
  }
  renderTasks(getTaskFromLocalStorage());
}
function deleteTask(id) {
  let tasks = getTaskFromLocalStorage();
  tasks.splice(id, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(getTaskFromLocalStorage());
}
function getTaskFromLocalStorage() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}

addBtn.addEventListener("click", addTask);

todoList.addEventListener("click", function (e) {
  if (e.target.classList.contains("task")) {
    doneTask(e);
  } else if (e.target.classList.contains("edit-btn")) {
    const index = e.target.dataset.index;
    editTask(index);
  } else if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    deleteTask(index);
  }
});
