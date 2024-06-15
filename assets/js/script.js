// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
// Todo: create a function to generate a unique task id
// Find the button by its ID and attach an event listener
function generateTaskId() {
  const randomID = Math.round(Math.random() * 10000000);
  console.log("Random ID I make in my function: ", randomID);
  return randomID;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  console.log(
    "======================= CREATING TASK CARD FUNCTION  ======================="
  );
  $("#todo-cards").append('<div class="task-card">');
  $(".task-card").append(`<h5 class="card-header">${task.title}</h5>`);
  $(".task-card").append('<div class="card-body">');
  $(".card-body").append(`<h5 class="card-title">${task.description}</h5>`);
  $(".card-body").append(`<p class="card-text">Due: ${task.date}</p>`);
  $(".card-body").append('<a href="#" class="btn btn-primary">Delete</a>');
  const today = dayjs();
  let reformatToday = today.format("YYYY-MM-DD");
  if (task.date < reformatToday) {
    alert("ENTER A VALID DATE");
    return;
  }
  console.log("=========Delete Button=================");
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  if (taskList == null) {
    taskList = [];
    return;
  }
  //taskList is an array?
  //FOR LOOP
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
  console.log("Task Title: ", taskTitle);
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
  console.log("New Task: ", newTask);
  taskList.push(newTask);
  localStorage.setItem("task", JSON.stringify(taskList));
  createTaskCard(newTask);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  $("#taskForm").on("submit", handleAddTask);
});
