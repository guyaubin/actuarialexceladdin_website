// Function to call API
const url_api_root = 'https://aea-api.herokuapp.com/';

const db = document.getElementById('jsDB');
const dc = document.getElementById('jsDC');
const rrsp = document.getElementById('jsRRSP');
const dpsp = document.getElementById('jsDPSP');
const pa = document.getElementById('jsPA');
const excluded = document.getElementById('jsExcluded');
const period = document.getElementById('jsPeriod');
const year = document.getElementById('jsYear');

const today = new Date();
const yearToday = today.getFullYear();
var yyyy = String(yearToday);
const yearMin = 1990;
const yearMax = yearToday + 1;

var yearParent = document.getElementById("yearInput");

for (let year = yearMax; year >= yearMin; year--) {
    var newOption = document.createElement("option");
    newOption.appendChild(document.createTextNode(String(year)));
    yearParent.appendChild(newOption);
    }

yearParent.value = yyyy;



function getPeriod(json) {
    return " for " + json.year;
}


const getResponse = response => response.json();
const processJSON = json => {
    console.log(json);
    db.innerHTML = cleanInnerHTML(json, 'db', is_number=true, precision=2, style="currency");
    dc.innerHTML = cleanInnerHTML(json, 'dc', is_number=true, precision=0, style="currency");
    rrsp.innerHTML = cleanInnerHTML(json, 'rrsp', is_number=true, precision=0, style="currency");
    dpsp.innerHTML = cleanInnerHTML(json, 'dpsp', is_number=true, precision=0, style="currency");
    pa.innerHTML = cleanInnerHTML(json, 'pa', is_number=true, precision=0, style="currency");
    excluded.innerHTML = cleanInnerHTML(json, 'excluded', is_number=true, precision=0, style="currency");
    year.innerHTML = json.year;
}

function showStat() {
    yyyy = document.getElementById("yearInput").value;
    let url = new URL(url_api_root + 'tax');
    url.searchParams.set('year', yyyy);
    console.log("url - 17h47: "+ url);
    fetch(url)
        .then(getResponse)
        .then(processJSON);
}