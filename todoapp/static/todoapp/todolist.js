const addBtn = document.getElementById('add-task');
let draggables = document.querySelectorAll('.draggable');
const taskContainer = document.querySelector('.task-div');
let currentTaskCount = draggables.length;


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
    const newDiv = document.createElement("div");
    newDiv.classList.add('draggable');
    newDiv.classList.add('task-item');
    newDiv.draggable = true;
    currentTaskCount++;
    newDiv.id = 'task-' + currentTaskCount; 
    newDiv.innerHTML = currentTaskCount;
    addDragstartListener(newDiv);
    addDragEndListener(newDiv);
    container.appendChild(newDiv);  
}


function updateTasks(tasks){
    console.log(tasks);
    let taskCount = 1;
    for(let i = 0; i < tasks.length; i++){
        tasks[i].id = 'task-' + taskCount;
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
