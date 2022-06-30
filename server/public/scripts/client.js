$(document).ready(readyWhenever);

let notation = '';

function readyWhenever() {
    // console.log('jQuery is ready');
    appendCalculation();
    $('.btn').on('click', addNotation);
    $('.clear-button').on('click', reset)
    $('.submit-button').on('click', handleSubmitBtn);
}

function addNotation() {
    notation = $(this).text();
}

function handleSubmitBtn() {
    // collect inputs

    const newInput = {
        numOne: $('#numOne').val(),
        numTwo: $('#numTwo').val(),
        notation: notation
    }

    $.ajax({
        url: '/calculations',
        method: 'POST',
        data: newInput // data here becomes req.body on the server
    }).then(function(response) {
        console.log(response);

        //trigger a get
        appendCalculation();
    }).catch(function(error) {
        console.log(error);
        alert('Error in POST /calculations');
    })
};

function appendCalculation() {
    console.log('Start of appendCalculation');

    // Get the result from the server
    $.ajax({
        url: '/calculations',
        method: 'GET'
    }).then(function(response) {
        console.log('GET /calculations sent:', response)

        // Render result to the DOM
        render(response);
    }).catch(function(error) {
        console.log(error);
        alert('Error in GET /calculations');
    })
    console.log('End of appendCalculation');
};

function render(calculationsList) {
    if (calculationsList.length === 0) {
        console.log('No calculation to perform, yet')
    } else {
    lastResult = calculationsList[calculationsList.length-1]
    $('#result').text(`${lastResult.result}`)
    
    // empty
    $('#previousCalculations').empty();

    // append to the DOM
    for (calculation of calculationsList) {
        $('#previousCalculations').append(`
        <div>${calculation.numOne} ${calculation.notation} ${calculation.numTwo} = 
        ${calculation.result}</div>
        `);
    }
}
};

function reset() {
    $('input').val('');
}