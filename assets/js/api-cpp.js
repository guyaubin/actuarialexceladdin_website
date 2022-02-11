// Function to call API
const url_api_root = 'https://aea-api.herokuapp.com/';

const ympe1 = document.getElementById('jsYMPE1');
const ympe2 = document.getElementById('jsYMPE2');
const exemption = document.getElementById('jsExemption');
const pension = document.getElementById('jsPension');
const indexation = document.getElementById('jsIndexation');
const contr1 = document.getElementById('jsContr1');
const contr2 = document.getElementById('jsContr2');
const contr3 = document.getElementById('jsContr3');
const contrmax = document.getElementById('jsContrMax');
const year = document.getElementById('jsYear');

const today = new Date();
const yearToday = today.getFullYear();
var yyyy = String(yearToday);
const yearMin = 1966;
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
    console.log(json);
    ympe1.innerHTML = cleanInnerHTML(json, 'ympe1', is_number=true, precision=0, style="currency");
    ympe2.innerHTML = cleanInnerHTML(json, 'ympe2', is_number=true, precision=0, style="currency");
    exemption.innerHTML = cleanInnerHTML(json, 'exemption', is_number=true, precision=0, style="currency");
    pension.innerHTML = cleanInnerHTML(json, 'pension', is_number=true, precision=2, style="currency");
    indexation.innerHTML = cleanInnerHTML(json, 'indexation', is_number=true, precision=1, style="percent");
    contr1.innerHTML = cleanInnerHTML(json, 'contr1', is_number=true, precision=3, style="percent");
    contr2.innerHTML = cleanInnerHTML(json, 'contr2', is_number=true, precision=3, style="percent");
    contr3.innerHTML = cleanInnerHTML(json, 'contr3', is_number=true, precision=3, style="percent");
    contrmax.innerHTML = cleanInnerHTML(json, 'contrmax', is_number=true, precision=2, style="currency");
    year.innerHTML = json.year;
}

function showStat() {
    yyyy = document.getElementById("yearInput").value;
    let url = new URL(url_api_root + 'cpp');
    url.searchParams.set('year', yyyy);
    fetch(url)
        .then(getResponse)
        .then(processJSON);
}