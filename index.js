const leftLists = document.querySelector("[data-left-lists]")
const leftForm = document.querySelector("[data-lists-user-form]")
const leftInput = document.querySelector("[data-lists-user-input]")
const fixedUserName = document.querySelector("user-name")
const litsDeleteBtn = document.querySelector("[data-list-delete]")
const todosDeleteBtn = document.querySelector("[data-todo-delete]")
const todoDisplay = document.querySelector("[data-todo-display]")
const todoTitle = document.querySelector("[data-todo-title]")
const todoCountSpan = document.querySelector("[data-todo-count]")
const todoLists = document.querySelector("[data-todo-lists]")
const todoTemplate = document.querySelector("#todo-template")
const todoForm = document.querySelector("[data-todo-form]")
const todoInput = document.querySelector("[data-todo-input]")
const todoDelete = document.querySelector("[data-todo-delete]")


let LISTS_KEY = "lists-key";
let SELCTED_LISTS_ID = "selected_lists_id_v1"
let lists = JSON.parse(localStorage.getItem(LISTS_KEY)) || []
let selectedlistsId = localStorage.getItem(SELCTED_LISTS_ID)

litsDeleteBtn.addEventListener("click", function(e) {
    lists = lists.filter(list => list.id !== selectedlistsId)
    selectedlistsId = null
    saveAndRender()
})

todoForm.addEventListener("sumbit", function(e) {
    e.preventDefault()
    let todoName = todoInput.value
    let todo = createTodo(todoName)
    console.log(todo)
    let selectedList = lists.find(list => list.id === selectedlistsId)
    selectedList.tasks.push(todo)
    todoInput.value = ""
    saveAndRender()
})

leftLists.addEventListener("click", function(e) {
    if (e.target.tagName.toLowerCase() === "li") {
        selectedlistsId = e.target.dataset.listId
        saveAndRender()
    }
})

leftForm.addEventListener("submit", function(e) {
    e.preventDefault()
    let listName = leftInput.value
    let list = createList(listName)
    leftInput.value = ""
    lists.push(list)
    saveAndRender()
})

function render() {
    clearElement(leftLists)
    renderlists()
    const selectedList = lists.find(list => list.id === selectedlistsId)
    if (selectedlistsId === null) {
        todoDisplay.style.display = "none";
    } else {
        todoDisplay.style.display = "";
        todoTitle.innerHTML = selectedList.list
        todoCount(selectedList)
        renderTodos(selectedList)
    }
}


function renderlists() {
    lists.forEach(list => {
        const li = document.createElement("li")
        li.classList.add("left-content-list")
        li.innerHTML = list.list
        li.dataset.listId = list.id
        if (selectedlistsId === list.id) {
            li.classList.add("active-list")
        }
        leftLists.appendChild(li)
    })
}


function todoCount(selectedList) {

}

function renderTodos(selectedList) {
    selectedList.tasks.forEach(task => {
        const todoElement = document.importNode(todoTemplate.content, true)
        let checkBox = todoElement.querySelector("input")
        checkBox.id = task.id
        checkBox.checked = task.complete
        let label = todoElement.querySelector("label")
        label.htmlFor = task.id
        label.append(task.name)
        todoLists.appendChild(todoElement)

    })
}

function createList(list) {
    return {
        id: new Date().getTime().toString(),
        list,
        tasks = []
    }
}

function createTodo(todo) {
    return {
        id: new Date().getTime().toString(),
        todo,
        complete = false
    }
}

function clearElement(leftLists) {
    while (leftLists.firstElementChild) {
        leftLists.removeChild(leftLists.firstElementChild)
    }
}

function saveF() {
    localStorage.setItem(LISTS_KEY, JSON.stringify(lists))
    localStorage.setItem(SELCTED_LISTS_ID, selectedlistsId)
}


function saveAndRender() {
    render()
    saveF()
}

render()