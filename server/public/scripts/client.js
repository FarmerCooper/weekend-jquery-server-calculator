$(document).ready(readyWhenever);

function readyWhenever() {
    // console.log('jQuery is ready');

    $('.submit-button').on('click', handleSubmitBtn);
}

function handleSubmitBtn() {
    // collect inputs

    const newInput = {
        numOne: $('#numOne').val(),
        numTwo: $('#numTwo').val()
    }

    $.ajax({
        url: '/calculations',
        method: 'POST',
        data: newInput // data here becomes req.body on the server
    }).then(function(response) {
        console.log(response);

        //trigger a get
    }).catch(function(error) {
        console.log(error);
        alert('Error in POST /calculations');
    })
};

