const todolist = document.getElementById('todolist')
const addTodoListInput = document.getElementById('add__todolist-input')
const addTodoListBtn = document.getElementById('add__todolist-btn')

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

function createId() {
  return Math.ceil(Math.random() * 10e8)
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
  const taskElements = todolist.tasks.map(task => getTaskTemplate(todolist.id, task)).join('\t')

  return (`
  <li id="${todolist.id}" class="todolist__item">
      <div class="todolists__item-header">
        <h4 class="todolists__item-title">${todolist.title}</h4>
        <button onclick=deleteTodoList('${todolist.id}') class="todolists__item-btn_delete">&#10006;</button>
      </div>
      <div class="todolists__item-adding adding">
        <input class="adding__input" type="text" placeholder="Add task">
        <button class="adding__btn">+</button>
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

function func() {
  const items = todolist.querySelectorAll('.todolist__item')

  items.forEach(tl => {
    const addBtn = tl.querySelector('.adding__btn')
    const addInput = tl.querySelector('.adding__input')
    addBtn.addEventListener('click', () => addTask(tl.id, addInput.value))
  })
}

render()
func()