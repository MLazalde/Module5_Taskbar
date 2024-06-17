// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
// Todo: create a function to generate a unique task id
// Find the button by its ID and attach an event listener
function generateTaskId() {
  return nextId++;
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
  localStorage.setItem("nextId", JSON.stringify(nextId));
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  console.log(
    "======================= CREATING TASK CARD FUNCTION  ======================="
  );
  let cardID = task.id;

  let taskCard = $(
    `<div class="task-card draggable" draggable=true id="${cardID}"></div>`
  );
  taskCard.append(
    `<h5 class="card-header" id="header-${cardID}">${task.title}</h5>`
  );

  let cardBody = $(`<div class="card-Content" id="body-${cardID}"></div>`);
  cardBody.append(`<h5 class="card-title">${task.description}</h5>`);
  cardBody.append(`<p class="card-text">Due: ${task.date}</p>`);
  cardBody.append(
    `<a class="btn btn-primary delete-btn" data-id="${cardID}">Delete</a>`
  );

  taskCard.append(cardBody);
  $("#todo-cards").append(taskCard);

  // Add event listener to the delete button
  $(`.delete-btn[data-id="${cardID}"]`).on("click", function () {
    let task = document.getElementById(cardID);
    task.remove();
    deleteTask(cardID);
  });

  // Date validation
  const today = dayjs();
  let reformatToday = today.format("YYYY-MM-DD");
  if (task.date < reformatToday) {
    alert("ENTER A VALID DATE");
  }
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  if (taskList == null) {
    taskList = [];
    return;
  }
  taskList.forEach((task) => createTaskCard(task));
  makeDraggable();
}

//early return principle
// return do? return ends a function and returns back whatever is there
// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  console.log("EVENT RAN!");
  //first step when a user submits a form
  // - // validate that the user has inputted fields.
  const taskTitle = $("#taskTitle").val().toUpperCase();
  const taskDueDate = $("#taskDueDate").val();
  const taskDescription = $("#taskDescription").val();
  if (
    taskTitle.length < 5 ||
    taskDueDate.length == 0 ||
    taskDescription.length == 0
  ) {
    alert("MUST ENTER VALID VALUES");
    return;
  }
  const newTask = {
    title: taskTitle,
    date: taskDueDate,
    description: taskDescription,
    id: generateTaskId(),
  };
  taskList.push(newTask);
  saveTasksToLocalStorage();
  createTaskCard(newTask);
}

// Todo: create a function to handle deleting a task
function deleteTask(id) {
  taskList = taskList.filter((task) => task.id !== id);
  saveTasksToLocalStorage();
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
//taskList is an array?
// //FOR LOOP
const makeDraggable = function () {
  let draggables = document.querySelectorAll(".draggable");
  let containers = document.querySelectorAll(".container");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      let draggable = document.querySelector(".dragging");
      container.appendChild(draggable);
    });
  });
};

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  $("#taskForm").on("submit", handleAddTask);
});
