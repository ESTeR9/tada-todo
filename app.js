//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addInputTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Functions
function addInputTodo(event){
    //prevent form from submitting
    event.preventDefault();
    if(todoInput.value==""){
        return;
    }
    addTodo(todoInput.value)
    saveLocalTodos(todoInput.value);
    todoInput.value="";
}

function deleteCheck(e){
    const itemClicked=e.target;
    //Delete TODO
    if(itemClicked.classList[0]==="del-btn")
    {
        const todo=itemClicked.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodo(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
    }
    //Check Mark
    if(itemClicked.classList[0]==="completed-btn")
    {
        const todo=itemClicked.parentElement;
        todo.classList.toggle("completed"); 
    }
}

function filterTodo(e){
    const todos=todoList.childNodes;
    console.log(todos)
    todos.forEach(function(todo,index){
        if(index===0){
            return;
        }
        switch(e.target.value){
            case 'all':
                todo.style.display='flex';
            break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display='flex';
                }
                else{
                    todo.style.display='none';
                }
            break;
            case 'uncompleted':
                if(!(todo.classList.contains('completed'))){
                    todo.style.display='flex';
                }
                else{                  
                    todo.style.display='none';
                }
            break;
        }
    })
}

function saveLocalTodos(todo){
    //hey, do I already have things in there
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        addTodo(todo);
    })
}

function addTodo(todoText){
    //add TODO divs
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoText;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //CHECK button
    const completedButton=document.createElement('button');
    completedButton.innerHTML= '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
    //DEL button
    const delButton=document.createElement('button');
    delButton.innerHTML= '<i class="fas fa-trash"></i>';
    delButton.classList.add('del-btn');
    todoDiv.appendChild(delButton);
    //APPEND to list
    todoList.appendChild(todoDiv)
}

function removeLocalTodo(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }   
    todos.splice(todos.indexOf(todo.children[0].innerText),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}