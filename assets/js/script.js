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
  // create 3 variables that will store the element we are trying to append to.
  const todoList = $("#to-do");
  const inProgress = $("#in-progress");
  const doneColumn = $("#done");

  // Iterate over "tasklist" variable
  for(let task of taskList) {
    // task = first object in array [0]
    if (task.status === "To-Do") {
      todoList.append(createTaskCard(task)) 
    }
    else if (task.status === "in-progress") {
      inProgress.append(createTaskCard(task))
    }
    else if (task.status === "done") {
      doneColumn.append(createTaskCard(task))
    }
  }
  // in this iteration, we will have if condition
  // if task.status === "To-Do" we will append it to the correct column
  // now use variable above for id="to-dos".append method
  // what you append is where we pass the task
  // now, we can have an else if {} task.status === "in progress"
  // then take variable above refencing the "status"
  // the next else if {} task.status === "done"

  // taskList.forEach((task) => createTaskCard(task));
  // makeDraggable();
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
    status: "To-Do",
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
const makeDraggable = function (event, ui) {
  const cards = document.querySelectorAll(".task-card");
  const containers = document.querySelectorAll(".cardContainer");

  cards.forEach((card) => {
    card.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("text", event.target.id);
      console.log(event);
    });
  });

  containers.forEach((container) => {
    container.addEventListener("dragover", function (event) {
      event.preventDefault();
    });
    container.addEventListener("drop", function (event) {
      event.preventDefault();
      // Append the dragged task card to the container
      const cardId = event.dataTransfer.getData("text");
      const taskCard = document.getElementById(cardId);
      container.appendChild(taskCard);
    });
  });
};

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  $("#taskForm").on("submit", handleAddTask);
});
