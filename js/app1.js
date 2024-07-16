const todolist = document.getElementById('todolist')
const addTodoListInput = document.getElementById('add__todolist-input')
const addTodoListBtn = document.getElementById('add__todolist-btn')
const div = getAddingTemplate()
document.getElementById('content').appendChild(div)

let todoListItems = [
  {
    id: 'todolist-1',
    title: 'TodoList 1',
    tasks: [
      {
        id: '1',
        title: 'Task 1',
        checked: true
      },
      {
        id: '2',
        title: 'Task 2',
        checked: false
      },
      {
        id: '3',
        title: 'Task 3',
        checked: true
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
  todoListItems = todoListItems.filter(f => f.id !== id)
  render()
}

function deleteTask(id, taskID) {
  const todolist = todoListItems.find(t => t.id === id)
  console.log(id)
  const tasks = todolist.tasks.filter(task => task.id !== taskID)
  console.log(tasks)
  todoListItems = todoListItems.map(t => t.id !== id ? t : {...t, tasks})
  render()
}

function addTask(id, title) {
  if (title.length > 0) {
    const tl = todoListItems.find(t => t.id === id)
    if (tl) {
      const taskID = `${id}-${createId}`
      const tasks = tl.tasks
      tasks.unshift({id: taskID, title, checked: false})
      todoListItems = todoListItems.map(t => t.id !== id ? t : {...t, tasks})
      render()
    }
  }
}

function createId() {
  return Math.ceil(Math.random() * 10e8)
}

function getTaskTemplate(id, task) {
  return (`
    <li class="tasks__item">
      <input class="tasks__item-checkbox" type="checkbox" checked=${task.checked}>
      <h4 class="tasks__item-title">${task.title}</h4>
      <button onclick="deleteTask('${id}','${task.id}')" class="tasks__item-btn">&#10006;</button>
    </li>
  `)
}

function getTodoListTemplate(todolist) {
  let editMode = false
  const taskElements = todolist.tasks.map(task => getTaskTemplate(todolist.id, task)).join('\t')
  const addingInput = `<input class="adding__input" type="text" placeholder="Add task">`

  return (`
  <li id="${todolist.id}" class="todolist__item">
      <div class="todolists__item-header">
        ${!editMode
    ? `<h4 class="todolists__item-title">${todolist.title}</h4>`
    : `<input type="text"/>`
  }
        <button onclick=deleteTodoList('${todolist.id}') class="todolists__item-btn_delete">&#10006;</button>
      </div>
      <div class="todolists__item-adding adding">
        ${addingInput}
        <button onclick="addTask('${todolist.id}', '${todolist.id}')" class="adding__btn">+</button>
      </div>
      <ul class="todolists__item-tasks tasks">
        ${taskElements}
      </ul>
      <div class="todolists__item-buttons">
        <button class="todolists__item-btn todolists__item-btn_active">active</button>
        <button class="todolists__item-btn todolists__item-btn_completed">completed</button>
        <button class="todolists__item-btn">all</button>
      </div>
  </li>
  `)
}

function render() {
  const items = todoListItems.map(t => getTodoListTemplate(t))

  todolist.innerHTML = items
}

addTodoListBtn.addEventListener('click', addTodoList)

render()

function getAddingTemplate() {
  const div = document.createElement('div')
  const input = document.createElement('input')
  const btn = document.createElement('button')

  let value = 'add'

  function clickHandler(){
    console.log(value)
  }

  function changeHandler(e){
    value = e.currentTarget.value
    console.log(value)
  }
  div.style.position = 'absolute'
  div.style.top = '200px'
  div.style.right = '200px'
  div.className = 'adding'
  input.className = 'adding__input'
  btn.className = 'adding__btn'

  btn.innerHTML = '+'
  input.value = value

  btn.addEventListener('click', clickHandler)
  input.addEventListener('change', changeHandler)

  div.insertAdjacentElement('afterbegin', input)
  div.insertAdjacentElement('beforeend', btn)

  return div
}