// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
// Find the button by its ID and attach an event listener
function generateTaskId(event) {
  // get the values from the inputs in the modal
  event.preventDefault();
  // Get user input
  const taskTitle = $("#taskTitle").val();
  const taskDueDate = $("#taskDueDate").val();
  const taskDescription = $("#taskDescription").val();
  const userObj = {
    title: taskTitle,
    date: taskDueDate,
    description: taskDescription,
  };
  console.log(userObj);
  // put data in local storage
  taskList.push(userObj);
  localStorage.setItem("task", JSON.stringify(taskList));
  createTaskCard();
}

// Todo: create a function to create a task card
function createTaskCard() {
  $("#todo-cards").append('<div class="task-card">');
  $(".task-card").append('<h5 class="card-header">');
  $(".task-card").append('<div class="card-body">');
  $(".card-body").append('<h5 class="card-title">');
  $(".card-body").append('<p class="card-text">');
  $(".card-body").append('<a href="#" class="btn btn-primary">');
}
//   $("#todo-cards").append('<div class="task-card">');
//   $("#task-card").append('<h5 class="card-header">');
//   $("#task-card").append('<div class="card-body">');
//   $("#card-body").append('<h5 class="card-tittle">');
//   $("#card-body").append('<p class="card-text">');
//   $("#card-body").append('<a href="#" class="btn btn-primary">');
// }

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  if (!taskList) {
    taskList = [];
  } else generateTaskId;
}

// Todo: create a function to handle adding a new task
function handleAddTask() {}
//   event.preventDefault();

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  $("#taskForm").on("submit", generateTaskId);
});
