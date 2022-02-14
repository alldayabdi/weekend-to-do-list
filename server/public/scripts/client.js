$(document).ready(readyNow)

function readyNow(){
    console.log('JQuery is working!!');
    getTasks();
$('#submitButton').on('click', submitTask);
$('#taskTableBody').on('click', '.btn-complete', completeTask)
$('#taskTableBody').on('click', '.btn-delete', deleteTask)
}

function submitTask(){
    console.log('Testing Submit Button');
        let taskObject = {
            task: $('#task').val(),
        }
        console.log(taskObject);
        
        $.ajax({
            type: 'POST',
            url: '/tasks',
            data: taskObject
        }).then( function (response) {
            
            getTasks();
        });
        $('#task').val('');
    
}

function getTasks(){
        $.ajax({
        type: 'GET',
        url: `/tasks`
        }).then(function(response){
            console.log('GET /tasks response', response);
            renderTasks(response)
        }).catch(function(response){
            console.log('Error in GET', error);    
        })
}

function renderTasks(tasks){
    $('#taskTableBody').empty()
    for (let i = 0; i < tasks.length; i++) {
        const taskitem = tasks[i];
        $('#taskTableBody').append(
        `
        <tr data-id = ${taskitem.id}>
            <td id = taskDone>${taskitem.task}</td>
            <td>
            <button class = "btn-complete" data-complete = ${taskitem.id}>Complete</button>
                <button class = "btn-delete" data-delete = ${taskitem.id}>Delete</button>
            </td>
        </tr>
    `);
    
        
    



        }
}

function completeTask(){
    $('tr').css('background-color','green');
    let id =$(this).closest('tr').data().id
    let complete = $(this).text();
    console.log(complete);
   
  
    $.ajax({
      method: 'PUT',
      url: `/tasks/${id}`,
      data: {
          complete: complete
      }
  }).then(function(response){
      getTasks();
  }).catch(function(response){
      console.log('Error!!', response);
  })    
}

function deleteTask(){
    let newTaskId = $(this).data().delete  
    console.log(newTaskId);
      $.ajax({
        method: 'DELETE',
        url: `/tasks/${newTaskId}`
    }).then(function(response){
        console.log('Deleted it!', response);
        getTasks();
    }).catch(function(error){
        console.log('Error DELETING', error);
    })
    // console.log('Clicked Delete!!');
  }