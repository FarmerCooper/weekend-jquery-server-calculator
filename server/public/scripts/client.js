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
        getResult();
    }).catch(function(error) {
        console.log(error);
        alert('Error in POST /calculations');
    })
};

function getResult() {
    console.log('Start of getResult');

    // Get the result from the server
    $.ajax({
        url: '/calculations',
        method: 'GET'
    }).then(function(response) {
        console.log(response)

        // Render result to the DOM
        render(response);
    }).catch(function(error) {
        console.log(error);
        alert('Error in GET /calculations');
    })
    console.log('End of getResult');
};

function render(calculationsList) {
    // empty?

    // append to the DOM
    for (calculation of calculationsList) {
        $('#previousCalculations').append(`<div>${calculation.numOne} 'calc' ${calculation.numTwo} = </div>`);
    }
};