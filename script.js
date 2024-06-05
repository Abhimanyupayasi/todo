// script. = new Date().toLocaleString();
firstEntertime = new Date().toLocaleString();
localStorage.setItem('firstEntertime', firstEntertime);




if(localStorage.getItem('todos') === null){
    console.log("itne baje kaun uthta hai yr");
    document.getElementById('teraNote').innerHTML = "😂😂 Etne baje kaun uthta hai yr chalo ab jo jo karna hai btao mujhe 👇👇";
}
else{

    console.log("Welcome back");
    document.getElementById('teraNote').innerHTML = "Welcome back bro 😉 <br> Malbazi to chal rahi hai na thik se😂";

}



setInterval(function() {
    const timeisnow = new Date().toLocaleTimeString(Date.now);
    document.getElementById('time').innerHTML = timeisnow;
}, 1000);
// timeisnow = new Date().toLocaleString();
// document.getElementById('time').innerHTML = timeisnow;
document.getElementById('add-todo').addEventListener('click', function() {
    const value = document.getElementById('todo-input').value;
    if (value) {
        addItem(value, new Date().getTime() );
        document.getElementById('todo-input').value = '';
    }
});

function addItem(text, timestamp, addToLS = true) {
    const list = document.getElementById('todo-list');

    const item = document.createElement('li');
    

    const todoTime = document.createElement('span');
    todoTime.innerText = new Date(timestamp).toLocaleTimeString();
    todoTime.classList.add('todotime');
    item.appendChild(todoTime);

   




    const todoText = document.createElement('p');

    let words = text.split(' ');
    let formattedText = '';

for (let i = 0; i < words.length; i++) {
    if (words[i].length > 20) {
        for (let j = 0; j < words[i].length; j++) {
            if (j > 0 && j % 20 === 0) {
                formattedText += '<br>';
            }
            formattedText += words[i][j];
        }
    } else {
        formattedText += words[i];
    }
    if (i < words.length - 1) {
        formattedText += ' ';
    }
}
    
    todoText.innerHTML = formattedText;
    todoText.classList.add('todotext');
    item.appendChild(todoText);

    const remove = document.createElement('button');
    remove.innerText = 'Remove';
    remove.addEventListener('click', function() {

        
        list.removeChild(item);
        //item.style.backgroundColor ='blue';
        removeFromLocalStorage(text);
    });
    item.appendChild(remove);

    list.appendChild(item);

    if (addToLS) {
        addToLocalStorage(text, timestamp);
    }
}

function addToLocalStorage(text) {
    const todoSaveTime = new Date().getTime();
    const todos = getTodosFromLocalStorage();
    todos.push({text: text, timestamp: new Date().getTime()});
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodosFromLocalStorage() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

function removeFromLocalStorage(text) {
    const todos = getTodosFromLocalStorage();
    const filteredTodos = todos.filter(todo => todo.text !== text);
    localStorage.setItem('todos', JSON.stringify(filteredTodos));
}

function loadTodos() {
    document.getElementById('todo-list').innerHTML = '';

    const todos = getTodosFromLocalStorage();
    const currentTime = new Date().getTime();
    todos.forEach(todo => {
        if (currentTime - todo.timestamp < 24 * 60 * 60 * 1000) {
            addItem(todo.text, todo.timestamp, false);
        } else {
            removeFromLocalStorage(todo.text);
        }
    });
}

loadTodos();

function ClearAll() {
    // Clear local storage
    localStorage.clear();

    // Clear the todo list
    const list = document.getElementById('todo-list');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

const clearAll  = document.querySelector('.clearAll')
clearAll.addEventListener('click', ClearAll)
const afterad = document.querySelector('.afterad')


window.onload = function() {
    const clearAll  = document.querySelector('.clearAll')
    const afterad = document.querySelector('.afterad')
     // replace 'clearAll' with the actual id of your element
    const todos = localStorage.getItem('todos');
    if(todos === null || todos === '[]'){
        clearAll.style.display = 'none';
        afterad.style.display = 'none';
    }
}
