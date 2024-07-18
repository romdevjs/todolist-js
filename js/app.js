const todolistElement = document.getElementById('todolist')

let todoListItems = [
  {
    id: 'todolist-1',
    title: 'TodoList 1',
    filter: 'all',
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

function addTodoList(title) {
  const id = `todolist-${createId()}`
  if (title.length > 0) todoListItems.unshift({id, title, filter: 'all', tasks: []})
  render()
}

function deleteTodoList(id) {
  todoListItems = todoListItems.filter(f => f.id !== id)
  render(todoListItems)
}

function changeTodoListFilter(id, filter) {
  todoListItems = todoListItems.map(t => t.id !== id ? t : {...t, filter})
  render()
}

function getFilteredTasks(filter, tasks) {
  if (filter === 'active') tasks = tasks.filter(task => !task.checked)
  if (filter === 'completed') tasks = tasks.filter(task => task.checked)
  return tasks
}

function createId() {
  return Math.ceil(Math.random() * 10e8)
}

function addTask(id, title) {
  if (title.length > 0) {
    const tl = todoListItems.find(t => t.id === id)
    if (tl) {
      const taskID = `${id}-${createId()}`
      const tasks = tl.tasks
      tasks.unshift({id: taskID, title, checked: false})
      todoListItems = todoListItems.map(t => t.id !== id ? t : {...t, tasks})
      render()
    }
  }
}

function deleteTask(id, taskID) {
  const todolist = todoListItems.find(t => t.id === id)
  const tasks = todolist.tasks.filter(task => task.id !== taskID)
  todoListItems = todoListItems.map(t => t.id !== id ? t : {...t, tasks})
  render()
}

function changeTaskChecked(id, taskID, checked) {
  const todolist = todoListItems.find(t => t.id === id)
  const tasks = todolist.tasks.map(task => task.id !== taskID ? task : {...task, checked})
  todoListItems = todoListItems.map(t => t.id !== id ? t : {...t, tasks})
  render()
}

function getTaskTemplate(id, task) {
  return (`
    <li id="${task.id}" class="tasks__item ${task.checked && 'tasks__item_completed'}">
      <input class="tasks__item-checkbox" type="checkbox">
      <h4 class="tasks__item-title">${task.title}</h4>
      <button class="tasks__item-btn">&#10006;</button>
    </li>
  `)
}

function getTodoListTemplate(todolist) {
  const taskElements = todolist.tasks.map(task => getTaskTemplate(todolist.id, task)).join('\t')

  return (`
  <li data-filter="${todolist.filter}" id="${todolist.id}" class="todolist__item">
      <div class="todolists__item-header">
        <h4 class="todolists__item-title">${todolist.title}</h4>
        <button class="todolists__item-btn_delete">&#10006;</button>
      </div>
      <div class="todolists__item-adding adding">
        <input class="adding__input" type="text" placeholder="Add task">
        <button class="adding__btn">+</button>
      </div>
      <ul class="todolists__item-tasks tasks">
        ${taskElements.length > 0 ? taskElements : '<div class="empty">Empty</div>'}
      </ul>
      <div class="todolists__item-buttons">
        <button data-filter="active" class="todolists__item-btn todolists__item-btn_active">active</button>
        <button data-filter="completed" class="todolists__item-btn todolists__item-btn_completed">completed</button>
        <button data-filter="all" class="todolists__item-btn">all</button>
      </div>
  </li>
  `)
}

function render() {

  if(todoListItems.length > 0){
    const items = todoListItems
      .map(t => ({...t, tasks: getFilteredTasks(t.filter, t.tasks)}))
      .map(t => getTodoListTemplate(t))

    todolistElement.innerHTML = items.join('\t')
    todolistElement.classList.remove('todolist_empty')
  } else{
    todolistElement.classList.add('todolist_empty')
    todolistElement.innerHTML = 'Empty'
  }


  addingValuesForElements()
  addingListeners()
}

function keyPressHandler(e, callBack) {
  if (e.key === 'Enter') {
    callBack()
    e.currentTarget.value = ''
  }
  if (e.key === 'Escape') e.currentTarget.value = ''
}

function addingValuesForElements() {
  const todolistElements = todolistElement.querySelectorAll('.todolist__item')

  todolistElements.forEach(todolist => {
    const todolistItem = todoListItems.find(t => t.id === todolist.id)
    const tasks = todolist.querySelectorAll('.tasks__item')
    const filterButtons = todolist.querySelectorAll('.todolists__item-btn')

    tasks.forEach(task => {
      const taskItem = todolistItem.tasks.find(el => el.id === task.id)
      const taskCheckbox = task.querySelector('.tasks__item-checkbox')

      if (taskItem) taskCheckbox.checked = taskItem.checked
    })

    filterButtons.forEach(b => {
      const filter = b.dataset.filter
      filter === todolist.dataset.filter ? b.classList.add('_active') : b.classList.remove('_active')
    })
  })
}

function addingListeners() {
  const items = todolistElement.querySelectorAll('.todolist__item')
  const addTodoListInput = document.getElementById('add__todolist-input')
  const addTodoListBtn = document.getElementById('add__todolist-btn')

  addTodoListBtn.addEventListener('click', () => {
    addTodoList(addTodoListInput.value)
    addTodoListInput.value = ''
  })
  addTodoListInput.addEventListener('keydown', (e) => keyPressHandler(e, () => addTodoList(addTodoListInput.value)))

  items.forEach(todolist => {
    const deleteTodolistBtn = todolist.querySelector('.todolists__item-btn_delete')
    const addTaskBtn = todolist.querySelector('.adding__btn')
    const addTaskInput = todolist.querySelector('.adding__input')
    const tasks = todolist.querySelectorAll('.tasks__item')
    const filterButtons = todolist.querySelectorAll('.todolists__item-btn')

    filterButtons.forEach(b => {
      b.addEventListener('click', () => changeTodoListFilter(todolist.id, b.dataset.filter))
    })

    deleteTodolistBtn.addEventListener('click', () => deleteTodoList(todolist.id))
    addTaskBtn.addEventListener('click', () => {
      addTask(todolist.id, addTaskInput.value)
      addTaskInput.value = ''
    })
    addTaskInput.addEventListener('keydown', (e) => keyPressHandler(e, () => addTask(todolist.id, addTaskInput.value)))

    tasks.forEach(task => {
      const taskTitle = task.querySelector('.tasks__item-title')
      const taskCheckbox = task.querySelector('.tasks__item-checkbox')
      const taskDeleteBtn = task.querySelector('.tasks__item-btn')

      taskTitle.addEventListener('dblclick', () => console.log('task title'))
      taskCheckbox.addEventListener('change', (e) => changeTaskChecked(todolist.id, task.id, e.currentTarget.checked))
      taskDeleteBtn.addEventListener('click', () => deleteTask(todolist.id, task.id))
    })
  })
}

render()