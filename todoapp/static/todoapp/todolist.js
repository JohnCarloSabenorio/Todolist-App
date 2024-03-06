addBtn = document.getElementById('add-task');
draggables = document.querySelectorAll('.draggable');
taskDiv = document.querySelector('.task-div');


draggables.forEach((draggable) => {
    draggable.addEventLIstener('dragstart', () =>{

    });
});




function addTask(){
    alert("Adding a task!");
}