
const apiKey = 'AhtyWutlCy3tlxIqRfLEbL4r5cuyPp11ZVG3SRfV'; 
let searchUrl = 'https://developer.nps.gov/api/v1/parks';
const states = '';

function getStates(){
    $('.request-form').submit(event => {
        event.preventDefault();
        console.log("submitted");
        let url = buildUrl();
        getParks(url);
    })
}

function buildUrl(){
    let limit = $('.max-results').val();
    let states = $('.states').val().toLowerCase();
    let api_key = '&api_key=';
    const stateQuery = '?stateCode=';

    let search = searchUrl + stateQuery + states + '&limit=' + limit +
    api_key + apiKey;
    
    return search;
}
function getParks(url){
    fetch(url)
    .then(response => {
        if (response.ok){
            return response.json();
        }
        else{
            throw new Error();
        }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => console.log(error.message));
};

function displayResults(responseJson){
    $('.display-results').empty();
    for (let i = 0; i < responseJson.data.length; i++){
        $('.display-results').append(`<h2> ${responseJson.data[i].fullName} </h2>
        <h2> Location: ${responseJson.data[i].states} </h2>
        <p> ${responseJson.data[i].description} </p>
        <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>`);
    }
}

function start(){
    console.log('started');
    getStates();
}

$(start);