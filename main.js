const taskElm = document.querySelector("#todo-input");
const addBtn = document.querySelector(".input-btn");
const todoList = document.querySelector(".todo-list");

let tasks = getTaskFromLocalStorage();
renderTasks(tasks);

function addTask() {
  if (!taskElm.value) {
    console.log("Nhập công việc");
    return;
  }
  var taskId = addBtn.getAttribute("id");
  var tasks = getTaskFromLocalStorage();
  var task = {
    name: taskElm.value,
    taskIsDone: false,
  };
  if ((taskId = 0 || taskId)) {
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
  console.log(tasks);

  if (e.target === this.children[0] || e.target === this) {
    tasks.taskIsDone = !tasks.taskIsDone;
    console.log(tasks.taskIsDone);

    if (tasks.taskIsDone) {
      this.children[0].classList.add("active");
    } else {
      this.children[0].classList.remove("active");
    }
  }
}

function editTask(id) {
  let tasks = getTaskFromLocalStorage();
  if (tasks.length > 0) {
    taskElm.value = tasks[id].name;
    addBtn.setAttribute("id", id);
  }
}
function getTaskFromLocalStorage() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}

addBtn.addEventListener("click", addTask);

var todoListChildren = Array.from(todoList.children);
todoListChildren.forEach(function (chilElm) {
  chilElm.addEventListener("click", doneTask);
});
