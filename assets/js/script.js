// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
// Find the button by its ID and attach an event listener
// const addTaskButton = document.getElementById("formModal");
// addTaskButton.addEventListener("click", generateTaskId);

function generateTaskId() {
  // get the values from the inputs in the modal
  // add popup
  // alert();
}

// Todo: create a function to create a task card
function createTaskCard(task) {}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  if (!taskList) {
    taskList = [];
  }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
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
  // put data in local storage
  taskList.push(userObj);
  localStorage.setItem("task", JSON.stringify(taskList));
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
