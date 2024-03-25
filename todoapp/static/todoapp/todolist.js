const addBtn = document.getElementById('add-task');
let draggables = document.querySelectorAll('.draggable');
const taskContainer = document.querySelector('.task-div');
let currentTaskCount = draggables.length;
let delBtns = document.querySelectorAll('.del-btn');

delBtns.forEach((btn) => {
    addDelTaskListener(btn);
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
        updateTasks(draggables);
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
    newInput.value = currentTaskCount;

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

    addDelTaskListener(delBtn);

    //Adds the elements to the new div
    btnDiv.appendChild(delBtn);
    btnDiv.appendChild(editBtn);
    inputDiv.appendChild(newInput);
    newDiv.appendChild(inputDiv);
    newDiv.appendChild(btnDiv);
    addDragstartListener(newDiv);
    addDragEndListener(newDiv);
    container.appendChild(newDiv);  
}


function updateTasks(tasks){
    console.log(tasks);
    let taskCount = 1;
    for(let i = 0; i < tasks.length; i++){
        tasks.classList[4] = 'order-' + taskCount;
        taskCount++;
    }

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
        task_id = btn.parentNode.parentNode.id;
        console.log(task_id);
        delete_data = new FormData();
        delete_data.append("task_id", task_id);

        
    });
}
