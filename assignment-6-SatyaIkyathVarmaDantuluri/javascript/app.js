// var dataURL = 'data/data.json'
// var data = [];
var random = 0;
var data = [];


var todoItem = function(title, description, date, time) {
    var id = random++;
    var check = 0;
    return {
        id,
        title,
        description,
        date,
        time,
        check
    };
}


//Selectors

const todoInput = document.querySelector('.todo-input');
const todoInput_desc = document.querySelector('.todo-input-Desc');
const todoInput_date = document.querySelector('.todo-input-Date');
const todoInput_time = document.querySelector('.todo-input-Time');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoDetail = document.querySelector('.todo-detail');
// const todoItem = document.querySelector('.todo-item');

//EventListeners
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
// todoItem.addEventListener('click',detailView);

//Functions
function addTodo(event) {

    todoList.innerHTML = "";

    var form = document.getElementById("todoForm");
    var newTodoElement = todoItem(form[0].value, form[1].value, form[2].value, form[3].value);
    data.push(newTodoElement);
    form.reset();
    console.log(data);
    // debugger;
    //preventing submit form 
    event.preventDefault();
    // let i = 0;

    refreshtable();
   
} 

function refreshtable(){

    todoList.innerHTML = "";
    
    for(i = 0; i<data.length;i++){
        

        //todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText=data[i].title;
        newTodo.classList.add('todo-item');
        newTodo.setAttribute("rowindex",data[i].id);
        todoDiv.appendChild(newTodo);
        //check mark button
        const completedButton = document.createElement('button');
        completedButton.innerText="check";
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //remove button
        const removeButton = document.createElement('button');
        removeButton.innerText="delete";
        removeButton.classList.add("remove-btn");
        todoDiv.appendChild(removeButton);
        //Detailed Button
        const detailButton = document.createElement('button');
        detailButton.innerText="Detail";
        detailButton.classList.add("detail-btn");
        todoDiv.appendChild(detailButton);
        //Append to list
        todoList.appendChild(todoDiv);
        //Clear to do input value
        // todoInput.value="";
        if(data[i].check.toString() == 1){
            newTodo.classList.toggle("completed");
        }
    
}
}

function deleteCheck(e){
    const item = e.target;
    // console.log(item.parentElement.children[0]);
    //Delete TODO
    if(item.classList[0]==='remove-btn'){
        for(i = 0; i<data.length;i++){
            // console.log(item.parentElement.children[0].getAttribute("rowindex"));
            // console.log(data[i].id);
            if(item.parentElement.children[0].getAttribute("rowindex") === data[i].id.toString()){
                // console.log(data[i]);
                data.splice(i,1);
                // console.log(data[i]);
                refreshtable();
                break; 
    }
}

    }
    //check mark
    if(item.classList[0]==='complete-btn'){
        const todo = item.parentElement;
        // todo.classList.toggle("completed");
        for(i = 0; i<data.length;i++){
            // console.log(item.parentElement.children[0].getAttribute("rowindex"));
            // console.log(data[i].id);
            if(item.parentElement.children[0].getAttribute("rowindex") === data[i].id.toString()){
                // console.log(data[i]);
                if (data[i].check==1){
                    data[i].check=0;
                }
                else{
                    data[i].check=1;
                }
                
                // console.log(data[i]);
                refreshtable();
                break; 
    }
    }
}
    //Detail Button

    if(item.classList[0]==='detail-btn'){

        // console.log(item.parentElement.parentElement)
        todoDetail.innerHTML = "";

        for(i = 0; i<data.length;i++){ 
        
            if(item.parentElement.children[0].getAttribute("rowindex") === data[i].id.toString()){
                // todop.classList.remove("todoView");
                
                const todoView = document.createElement("div");
                
                

                todoView.classList.add("todoView");

                //Create li
                const newTodoDetailDesc = document.createElement('li');
                newTodoDetailDesc.innerText=data[i].description;
                newTodoDetailDesc.classList.add('todo-values');
                todoView.appendChild(newTodoDetailDesc);
                //Create li
                const newTodoDetailDate = document.createElement('li');
                newTodoDetailDate.innerText=data[i].date;
                newTodoDetailDate.classList.add('todo-values');
                todoView.appendChild(newTodoDetailDate);
                //Create li
                const newTodoDetailTime = document.createElement('li');
                newTodoDetailTime.innerText=data[i].time;
                newTodoDetailTime.classList.add('todo-values');
                todoView.appendChild(newTodoDetailTime);

                todoDetail.appendChild(todoView);

                console.log(todop);
            }
        }

    }




}

data = document.addEventListener("DOMContentLoaded", xhrload());

function xhrload(){
// const xhr = new XMLHttpRequest();
// var dataURL = 'data/data.json'


// xhr.open("GET", dataURL, true);
// xhr.addEventListener('load',(evt)=>{var data = JSON.parse(xhr.responseText);
//     refreshtable();});
// xhr.send();

var xmlhttp = new XMLHttpRequest();
var url = "data/data.json";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText);
        refreshtable();
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
return data;
}


function myFunction() {
    var x = document.getElementById("fromDisplay");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

