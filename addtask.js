// Selectors
const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');

// Event Listeners
toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));

// Check if one theme has been set previously and apply it (or std theme if not found):
let savedTheme = localStorage.getItem('savedTheme');
savedTheme === null ? changeTheme('standard') : changeTheme(savedTheme);

// Functions;
function addToDo(event) {
    // Prevents form from submitting / Prevents form from reloading;
    event.preventDefault();

    // Get selected category from dropdown
    const category = document.querySelector('.task-category').value;
    const dueDate = document.querySelector('.due-date-input').value;

    // toDo DIV;
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    // Create LI
    const newToDo = document.createElement('li');
    if (toDoInput.value === '') {
        alert("You must write something!");
    } else {
        // Combine task, category, and due date
        newToDo.innerText = `${category}: ${toDoInput.value} - Due: ${dueDate ? dueDate : "No due date"}`;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        // Adding to local storage;
        savelocal(toDoInput.value, category, dueDate);

        // check btn;
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(checked);

        // delete btn;
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        // Append to list;
        toDoList.appendChild(toDoDiv);

        // Clearing the input;
        toDoInput.value = '';
        document.querySelector('.task-category').value = ''; // Reset dropdown to default
        document.querySelector('.due-date-input').value = '';  // Clear the date input
    }
}

function deletecheck(event) {
    const item = event.target;

    // delete
    if (item.classList[0] === 'delete-btn') {
        item.parentElement.classList.add("fall");

        // removing local todos;
        removeLocalTodos(item.parentElement);

        item.parentElement.addEventListener('transitionend', function () {
            item.parentElement.remove();
        });
    }

    // check
    if (item.classList[0] === 'check-btn') {
        item.parentElement.classList.toggle("completed");
    }
}

// Saving to local storage:
function savelocal(todoText, category, dueDate) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push({ text: todoText, category, dueDate });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {
        // toDo DIV;
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add('todo', `${savedTheme}-todo`);

        // Create LI
        const newToDo = document.createElement('li');
        const taskText = `${todo.category}: ${todo.text}`;
        const dueText = todo.dueDate ? ` Due: ${todo.dueDate}` : ' No due date';
        newToDo.innerText = taskText + dueText;
        
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        // check btn;
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(checked);

        // delete btn;
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        // Append to list;
        toDoList.appendChild(toDoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoText = todo.children[0].innerText;
    const todoIndex = todos.findIndex(todo => `${todo.category}: ${todo.text} - Due: ${todo.dueDate ? todo.dueDate : "No due date"}` === todoText);
    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

// Change theme function:
function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = localStorage.getItem('savedTheme');

    document.body.className = color;

    // Change blinking cursor for darker theme:
    if (color === 'darker') {
        document.getElementById('title').classList.add('darker-title');
    } else {
        document.getElementById('title').classList.remove('darker-title');
    }

    document.querySelector('input').className = `${color}-input`;

    // Change todo color without changing their status (completed or not):
    document.querySelectorAll('.todo').forEach(todo => {
        if (Array.from(todo.classList).some(item => item === 'completed')) {
            todo.className = `${todo.className} ${color}-todo completed`;
        } else {
            todo.className = `${todo.className} ${color}-todo`;
        }
    });

    // Change buttons color according to their type (todo, check, or delete):
    document.querySelectorAll('button').forEach(button => {
        if (button.classList.contains('check-btn')) {
            button.className = `check-btn ${color}-button`;
        } else if (button.classList.contains('delete-btn')) {
            button.className = `delete-btn ${color}-button`;
        } else if (button.classList.contains('todo-btn')) {
            button.className = `todo-btn ${color}-button`;
        }
    });
}

