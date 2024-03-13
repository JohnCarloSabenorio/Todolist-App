const addBtn = document.getElementById('add-task');
let draggables = document.querySelectorAll('.draggable');
const taskContainer = document.querySelector('.task-div');


draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () =>{
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', ()=> {
        draggables = document.querySelectorAll('.draggable');
        draggable.classList.remove("dragging");
        updateTaskOrder(draggables);
    });

    taskContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(taskContainer, e.clientY);
        const dragTask = document.querySelector('.dragging');
        if (afterElement == null){
            taskContainer.appendChild(dragTask);
        }
        else{
            taskContainer.insertBefore(dragTask, afterElement);
        }
    });
});



function addTask(){
    alert("Adding a task!");
}

function updateTaskOrder(tasks){
    console.log(tasks);

    let taskCount = 1;
    for(let i = 0; i < tasks.length; i++){
        tasks[i].id = 'task-' + taskCount;
        taskCount++;
    }
}

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