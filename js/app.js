const todolist = document.getElementById('todolist')
const addTodoListInput = document.getElementById('add__todolist-input')
const addTodoListBtn = document.getElementById('add__todolist-btn')

const todoListItems = [
  {
    id: 'todolist-1',
    title: 'TodoList 1',
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        checked: false
      }
    ]
  }
]



function addTodoList() {
  const id = `todolist-${createId()}`
  const title = addTodoListInput.value
  if (title.length > 0) todoListItems.unshift({id, title, tasks: []})
  render()
}

function deleteTodoList(id) {
  const item = todoListItems.find(t => t.id === id);
  todoListItems.pop(item)
  render()
}

function changeTodoListTitle(){

}

function createId() {
  return Math.ceil(Math.random() * 10e8)
}

function renderTask(){

}

function renderTodoList(id, title, tasks) {
  return (`
  <li id='${id}' class="todolist__item">
      <div class="todolists__item-header">
        <h4 class="todolists__item-title">${title}</h4>
        <button onclick="deleteTodoList(id)" class="todolists__item-btn_delete">&#10006;</button>
      </div>
      <div class="todolists__item-adding adding">
        <input class="adding__input" type="text" placeholder="Add task">
        <button class="adding__btn">+</button>
      </div>
      <ul class="todolists__item-tasks tasks">
        <li class="tasks__item">
          <input class="tasks__item-checkbox" type="checkbox">
          <h4 class="tasks__item-title">Task 1</h4>
          <button class="tasks__item-btn">&#10006;</button>
        </li>
      </ul>
      <div class="todolists__item-buttons">
        <button class="todolists__item-btn todolists__item-btn_active">active</button>
        <button class="todolists__item-btn todolists__item-btn_completed">completed</button>
        <button class="todolists__item-btn">all</button>
      </div>
  </li>
  `)
}

function render(){
  const items = todoListItems.map(t => renderTodoList(t.id, t.title, t.tasks))

  todolist.innerHTML = items
}

addTodoListBtn.addEventListener('click', addTodoList)

render()