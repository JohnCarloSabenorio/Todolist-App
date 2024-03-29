const addBtn = document.getElementById('add-task');
const saveBtn = document.querySelector('.save-btn');
let draggables = document.querySelectorAll('.draggable');
const taskContainer = document.querySelector('.task-div');
let currentTaskCount = draggables.length;
let delBtns = document.querySelectorAll('.del-btn');
let editBtns = document.querySelectorAll('.edit-btn');
const delModal = document.querySelector(".confdel-modal");
const yesBtn = document.querySelector('.yes-btn');
const inputTask = document.querySelector('.input-task');
let newTaskCount = 0

saveBtn.addEventListener('click', (e) => {    
    saveBtn.disabled = true;
    saveTasks();


});

async function saveTasks() {
    taskDesc = document.querySelectorAll('.task-item');

    saveData = {};

    taskDesc.forEach((task) => {
        task_title = task.querySelector('.task-desc').value;
        task_order = task.classList.item(4);
        saveData[task.id] = [task_title, task_order[task_order.length-1]];
    });

    data = new FormData();
    data.append('tasks', saveData);
    try {
      const response = await fetch('/savetasks', {
        method: "POST",
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify(saveData), // Use JSON.stringify for stringify data
      });
      const data = await response.json();


      console.log("Status:", data['status']); // Log data after successful parsing
  
      return true;
    } catch (error) {
      console.error("Error saving tasks:", error); // Handle errors
      return false;
    }
}

delBtns.forEach((btn) => {
    addDelTaskListener(btn);
});

editBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        task_input = btn.parentNode.parentNode.querySelector('.task-desc');
        editTask(task_input);
    });
});

addContainerListener(taskContainer);
draggables.forEach(draggable => {
    addDragstartListener(draggable);
    addDragEndListener(draggable);
});

// Checks if a task is being dragged and switches position when a task is dropped on top of another.
function addContainerListener(container){
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const dragTask = document.querySelector('.dragging');
        if (afterElement == null){
            container.appendChild(dragTask);
        }
        else{
            container.insertBefore(dragTask, afterElement);
        }
    });
}

// Removes dragging class from the task
function addDragEndListener(item){
    item.addEventListener('dragend', ()=> {
        draggables = document.querySelectorAll('.draggable');
        item.classList.remove("dragging");
        updateOrder(draggables);
    });  
}

// Adds dragging class from the task
function addDragstartListener(item){
    item.addEventListener('dragstart', () =>{
        item.classList.add('dragging');
    });
}

function addTask(container){
    
    //creates a draggable box
    currentTaskCount++;
    newTaskCount++;
    const newDiv = document.createElement("div");
    newDiv.classList.add('row');
    newDiv.classList.add('draggable');
    newDiv.classList.add('task-item');
    newDiv.classList.add('justify-content-center');
    newDiv.classList.add('order-' + currentTaskCount); 
    newDiv.draggable = true;


    //Creates a div for input box
    const inputDiv = document.createElement('div');
    inputDiv.classList.add("col-8");
    inputDiv.classList.add("taskinp-div");

    // Creates a new input box inside the draggable box
    const newInput = document.createElement('input');
    newInput.type = "text";
    newInput.name = "task";
    newInput.classList.add("task-desc");
    newInput.value = inputTask.value;

    //Creates a div for delete and edit button
    const btnDiv = document.createElement('div');
    btnDiv.classList.add('col');
    btnDiv.classList.add('btn-div');

    //Creates a delete button
    const delBtn = document.createElement('button');
    delBtn.classList.add('task-btn');
    delBtn.classList.add('del-btn');
    delBtn.textContent = "Delete";

    //Creates an edit button
    const editBtn = document.createElement('button');
    editBtn.classList.add('task-btn');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = "Edit";
    editBtn.type = "button";

    editBtn.addEventListener("click", () => {
        task_input = editBtn.parentNode.parentNode.querySelector('.task-desc');
        editTask(task_input);
    });    
    
    addDelTaskListener(delBtn);
    //Adds the elements to the new div
    btnDiv.appendChild(delBtn);
    btnDiv.appendChild(editBtn);
    inputDiv.appendChild(newInput);
    newDiv.appendChild(inputDiv);
    newDiv.appendChild(btnDiv);
    addDragstartListener(newDiv);
    addDragEndListener(newDiv);
    newDiv.id = "new-task-" + newTaskCount;
    container.appendChild(newDiv);  
    inputTask.value = "";


    saveTasks();
}

// fix this
function updateOrder(tasks){
    let taskCount = 1;
    for(let i = 0; i < tasks.length; i++){
        // Converts task classlist to array to remove a class using index
        let classToDelete = Array.from(tasks[i].classList)[4];
        tasks[i].classList.remove(classToDelete);

        //reorders tasks
        tasks[i].classList.add('order-' + taskCount)
        taskCount++;
    }

    saveTasks();
}
// Gets the task that the item is being dragged to.
function getDragAfterElement(container, y){
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
    return draggableElements.reduce((closest, child)=>{
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset){
            return { offset: offset, element: child }
        }
        else{
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}


function addDelTaskListener(btn){
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showDelModal();
        task_id = btn.parentNode.parentNode.id;
        delete_data = new FormData();
        delete_data.append("task_id", task_id);
        
        yesBtn.addEventListener("click", () => deleteTask(delete_data, task_id, btn));
    });
}
 


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

async function deleteTask(delete_data, delete_id, btn){
    btn.disabled = true;
    const response = await fetch('/delTasks', {
        method : "POST",
        headers: {
            "X-CSRFToken" : getCookie("csrftoken"),
        },
        body: delete_data
    }).then(response => response.json())
    .then(data => {
        console.log(data['status']);
    });
    //Deletes the displayed task 
    // const deletedTask = document.getElementById(delete_id);
    // deletedTask.parentNode.removeChild(deletedTask);

    const el = btn.parentNode.parentNode;
    el.remove();

    //Updates the order of the tasks after deleting an item
    draggables = document.querySelectorAll('.draggable');
    updateOrder(draggables);
    console.log('element deleted!');
    hideDelModal();

    return true;
}

function editTask(task_input){
    task_input.disabled = task_input.disabled == true ? false : true;
    task_input.focus();
}


function showDelModal(){
    delModal.style.display = "block";
}

function hideDelModal(){
    delModal.style.display = "none";
}
