var todos = JSON.parse(localStorage.getItem("todos"));
var todoList = document.getElementsByClassName("todo__list")[0];

function renderTodos() {
  if (!todos || todos.length === 0) {
    var emptyTodoList = document.createElement("div");
    emptyTodoList.classList.add("todo__list__empty");
    var emptyIcon = document.createElement("i");
    emptyIcon.classList.add("fas", "fa-box-open");
    var emptyText = document.createElement("h1");
    emptyText.innerText = "There are no todos to display...";
    emptyTodoList.append(emptyIcon, emptyText);
    todoList.innerHTML = "";
    todoList.appendChild(emptyTodoList);
    // alternatively you can use inner html

    /* 
     todoList.innerHTML = `
        <div class="todo__list__empty">
        <i class="fas fa-box-open"></i><br />
        <h1>There are no todos to display...</h1>
        </div>
     `; 
    */
  } else {
    setTodoView(todos);
  }
}

//set todos view
function setTodoView(myTodos) {
  todoList.innerHTML = "";

  myTodos.forEach((todo) => {
    var todoItem = document.createElement("div");
    todoItem.classList.add("todo__item");

    var todoItemContent = document.createElement("div");
    todoItemContent.classList.add("todo__item__content");
    todoItemContent.innerText = todo.text;

    var todoItemFooter = document.createElement("div");
    todoItemFooter.classList.add("todo__item__footer");

    var todoItemDate = document.createElement("div");
    todoItemDate.classList.add("todo__item__date");
    todoItemDate.innerText = moment(todo.date).format("dddd, Do MMMM YYYY. LT");

    var todoItemControls = document.createElement("div");
    todoItemControls.classList.add("todo__item__controls");
    var copyIcon = document.createElement("i");
    copyIcon.classList.add("fas", "fa-copy");
    copyIcon.setAttribute("onclick", `copyTodo('${todo.text}');`);
    var editIcon = document.createElement("i");
    editIcon.classList.add("fas", "fa-pencil-alt");
    var deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt");

    todoItemControls.append(copyIcon, editIcon, deleteIcon);
    todoItemFooter.append(todoItemDate, todoItemControls);
    todoItem.append(todoItemContent, todoItemFooter);
    todoList.appendChild(todoItem);
  });
}

//event listeners
document.getElementById("addTodo").addEventListener("submit", addTodo);
document.getElementById("searchTodo").addEventListener("keyup", searchTodo);
document
  .getElementById("searchTodo__btn")
  .addEventListener("click", searchTodo);

function addTodo(e) {
  e.preventDefault();
  var value = document.querySelector(".addTodo__form").value;
  var newTodo = {
    id: todos ? todos.length : 0,
    text: value,
    date: new Date(),
  };
  todos ? todos.unshift(newTodo) : (todos = [newTodo]);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function searchTodo(e) {
  e.preventDefault();
  var value = document.querySelector(".searchTodo__form").value;
  if (todos && todos.length > 0) {
    if (value === "") {
      setTodoView(todos);
    } else {
      var todosCp = [...todos];
      var searchResult = todosCp.filter(
        (todo) => todo.text.toLowerCase().indexOf(value) > -1
      );
      setTodoView(searchResult);
    }
  }
}

function copyTodo(text) {
  console.log(text);
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      window.alert(`${text} copied to clipboard`);
    },
    function (err) {
      console.error("Could not be copied to clipboard: ", err);
    }
  );
}
