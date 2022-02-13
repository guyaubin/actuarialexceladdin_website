// Function to call API
const url_api_root = 'https://aea-api.herokuapp.com/';

const oas1 = document.getElementById('jsOAS1');
const oas2 = document.getElementById('jsOAS2');
const oas3 = document.getElementById('jsOAS3');
const oas4 = document.getElementById('jsOAS4');
const clawback = document.getElementById('jsClawback');
const year = document.getElementById('jsYear');

const today = new Date();
const yearToday = today.getFullYear();
var yyyy = String(yearToday);
const yearMin = 1952;
const yearMax = yearToday + 1;

var yearParent = document.getElementById("yearInput");

for (let year = yearMax; year >= yearMin; year--) {
    var newOption = document.createElement("option");
    newOption.appendChild(document.createTextNode(String(year)));
    yearParent.appendChild(newOption);
    }

yearParent.value = yyyy;


const getResponse = response => response.json();
const processJSON = json => {
    oas1.innerHTML = cleanInnerHTML(json, 'oas1', is_number=true, precision=2, style="currency");
    oas2.innerHTML = cleanInnerHTML(json, 'oas2', is_number=true, precision=2, style="currency");
    oas3.innerHTML = cleanInnerHTML(json, 'oas3', is_number=true, precision=2, style="currency");
    oas4.innerHTML = cleanInnerHTML(json, 'oas4', is_number=true, precision=2, style="currency");
    clawback.innerHTML = cleanInnerHTML(json, 'clawback', is_number=true, precision=0, style="currency");
    year.innerHTML = json.year;
}

function showStat() {
    yyyy = document.getElementById("yearInput").value;
    let url = new URL(url_api_root + 'oas');
    url.searchParams.set('year', yyyy);
    fetch(url)
        .then(getResponse)
        .then(processJSON);
}