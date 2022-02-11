$(document).ready(readyNow)

function readyNow(){
    console.log('JQuery is working!!');
    getTasks();
$('#submitButton').on('click', submitTask);
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
            data: {taskObject}
        }).then( function (response) {
            
            getTasks();
        });
        $('#task').val('');
    
}

function getTasks(){
$("taskTableBody").empty();
        $.ajax({
        type: 'GET',
        url: `/tasks`
        }).then(function(response){
            console.log('GET /tasks response', response);
            for (let i = 0; i < response.length; i++) {
                const taskitem = response[i];
                $('#taskTableBody').append(`
                <tr data-id = ${taskitem.id}>
                    <td>${taskitem.task}</td>
                    <td>${taskitem.isCompleted}</td>
                    <td>
                        <button class = "btn-delete" data-delete = ${taskitem.id}>Delete</button>
                        <button class = "btn-complete" data-complete = ${taskitem.id}>Complete</button>
                    </td>
                </tr>
            `);
                
            }
        })



}