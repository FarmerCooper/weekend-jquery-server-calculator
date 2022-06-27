$(document).ready(readyWhenever);

function readyWhenever() {
    // console.log('jQuery is ready');

    $('.btn').click(function(event) {
        let buttonClicked = this.innerHTML;
        console.log('button clicked', buttonClicked)
    })

    $('.submit-button').on('click', handleSubmitBtn);
}

function handleSubmitBtn() {
    // collect inputs

    const newInput = {
        numOne: $('#numOne').val(),
        numTwo: $('#numTwo').val(),
        type: $('.addition').val(),
        tipo: $('.subtraction').val()
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
        console.log(response)

        // Render result to the DOM
        render(response);
    }).catch(function(error) {
        console.log(error);
        alert('Error in GET /calculations');
    })
    console.log('End of appendCalculation');

    handleCalculations();
};

function render(calculationsList) {
    // empty
    $('#previousCalculations').empty();

    // append to the DOM
    for (calculation of calculationsList) {
        $('#previousCalculations').append(`<div>${calculation.numOne} + ${calculation.numTwo} = <span id = "displayResult"></span></div>`);
    }
};

function handleCalculations() {
    // collect inputs
    const newInput = {
        numOne: $('#numOne').val(),
        numTwo: $('#numTwo').val()
    }

    $.ajax({
        url: '/results',
        method: 'POST',
        data: newInput // data here becomes req.body on the server
    }).then(function(response) {
        console.log(response);

        //trigger a get
        getResult();
    }).catch(function(error) {
        console.log(error);
        alert('Error in POST /results');
    })
};

function getResult() {
    console.log('Start of getResult');

    // Get the result from the server
    $.ajax({
        url: '/results',
        method: 'GET'
    }).then(function(response) {
        console.log(response)

        // Render result to the DOM
        renderResult(response);
    }).catch(function(error) {
        console.log(error);
        alert('Error in GET /results');
    })
    console.log('End of getResult');
};

function renderResult(result) {
    $('#result').empty();
    // append to the DOM

    $('#result').append(`<div>${result}</div>`);

    if ($('#displayResult').length === 0) {
        console.log('does not exist, yet')
    }
    else {
        $('#displayResult').append(result)
    }
};
