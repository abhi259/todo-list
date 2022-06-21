userInput = document.getElementById("todoUserInput")
addTodoButton = document.getElementById("addTodoButton")
itemContainer = document.getElementById("todoItemContainer")
saveTodoButton = document.getElementById("saveTodoButton")



let todoList = getTodoListFromLocalStorage()
let idCount = 0

function getTodoListFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem("todoList")
  let parsedTodoList = JSON.parse(stringifiedTodoList)
  if (parsedTodoList === null) {
    return []
  } else {
    return parsedTodoList
  }
}

addTodoButton.onclick = function() {
  
  if (userInput.value === "") {
    alert("Please Enter Valid Text")
    return
  }

  idCount = idCount + 1

  let newTodo = {
    text: userInput.value,
    uniqueNum: idCount,
    isChecked: false,
  }
  todoList.push(newTodo)
  userInput.value = ""
  createAndAppendTodo(newTodo)
}
  


function createAndAppendTodo(todo) {
  listId = "text" + todo.uniqueNum
  checkboxId = "checkbox" + todo.uniqueNum

  let listElement = document.createElement("li")
  listElement.classList.add("todo-item-container", "d-flex", "flex-row")
  listElement.id = listId
  itemContainer.appendChild(listElement)

  let checkboxElement = document.createElement("input")
  checkboxElement.type = "checkbox"
  checkboxElement.id = checkboxId
  checkboxElement.classList.add("checkbox-input")
  checkboxElement.checked = todo.ischecked
  listElement.appendChild(checkboxElement)
  
  let labelContainer = document.createElement("div")
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  listElement.appendChild(labelContainer)

  let labelElement = document.createElement("label")
  labelElement.setAttribute("for", checkboxId)
  labelElement.classList.add("checkbox-label")
  labelElement.textContent = todo.text
  labelContainer.appendChild(labelElement)

  let deleteIconContainer = document.createElement("div")
  listElement.appendChild(deleteIconContainer)

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIconContainer.appendChild(deleteIcon);

  deleteIcon.onclick = function(todo) {
    itemContainer.removeChild(listElement)
    todoList.splice(todo.uniqueNum, 1)

  }

  if (todo.isChecked === true) {
    checkboxElement.checked = true
    labelElement.classList.add("checked")
  }else{
    checkboxElement.checked = false
    labelElement.classList.remove("checked")
  }

  checkboxElement.onclick = function() {
    if (todo.isChecked === false) {
      todo.isChecked = true
      labelElement.classList.add("checked")
    }else {
      todo.isChecked = false
      labelElement.classList.remove("checked")
    }
  }
} 

saveTodoButton.onclick = function() {
  localStorage.setItem("todoList",JSON.stringify(todoList))
}


for (let todo of todoList) {
  createAndAppendTodo(todo)
}