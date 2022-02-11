$(document).ready(readyNow)

function readyNow(){
    console.log('JQuery is working!!');
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
            data: taskObject
        }).then( function (response) {
            $('#task').val(''),
            getTasks();
        });
    
    
}