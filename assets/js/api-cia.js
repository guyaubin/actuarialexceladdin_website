// Function to call API
const url_api_root = 'https://aea-api.herokuapp.com/';

const inputMessage = document.getElementById('jsInputMessage');
const qxTable = document.getElementById('jsQxTable');
const qxScale = document.getElementById('jsQxScale');
const interest1Select = document.getElementById('jsInterest1Select');
const interest1Ultimate = document.getElementById('jsInterest1Ultimate');
const interest2Select = document.getElementById('jsInterest2Select');
const interest2Ultimate = document.getElementById('jsInterest2Ultimate');
const inflationSelect = document.getElementById('jsInflationSelect');
const inflationUltimate = document.getElementById('jsInflationUltimate');
const select = document.getElementById('jsSelect');
const period = document.getElementById('jsPeriod');
const today = new Date();
const yearToday = today.getFullYear();
const monthToday = today.getMonth() + 1; //January is 0!
var yyyy = String(yearToday);
var mm = String(monthToday);
const yearMin = 1988;
var yearMax = yearToday;
var monthMax = monthToday;
if (monthToday === 12) {
    yearMax++;
    monthMax = 1;
    }
else {
    monthMax++;
}
var yearParent = document.getElementById("yearInput");

for (let year = yearMax; year >= yearMin; year--) {
    var newOption = document.createElement("option");
    newOption.appendChild(document.createTextNode(String(year)));
    yearParent.appendChild(newOption);
    }

yearParent.value = yyyy;
document.getElementById("monthInput").value = mm;

function getPeriod(json) {
    return getMonth(json.month) + ' ' + json.year;
}


const getResponse = response => response.json();
const processJSON = json => {
    qxTable.innerHTML = cleanInnerHTML(json, 'qxTable');
    qxScale.innerHTML = cleanInnerHTML(json, 'qxScale');
    interest1Select.innerHTML = cleanInnerHTML(json, 'rateselect', is_number=true, precision=2, style="percent");
    interest1Ultimate.innerHTML = cleanInnerHTML(json, 'rateultimate', is_number=true, precision=2, style="percent");
    interest2Select.innerHTML = cleanInnerHTML(json, 'rateiselect', is_number=true, precision=2, style="percent");
    interest2Ultimate.innerHTML = cleanInnerHTML(json, 'rateiultimate', is_number=true, precision=2, style="percent");
    inflationSelect.innerHTML = cleanInnerHTML(json, 'inflationselect', is_number=true, precision=4, style="percent");
    inflationUltimate.innerHTML = cleanInnerHTML(json, 'inflationultimate', is_number=true, precision=4, style="percent");
    select.innerHTML = cleanInnerHTML(json, 'select');
    period.innerHTML = getPeriod(json);
}

function showStat() {
    yyyy = document.getElementById("yearInput").value;
    mm = document.getElementById("monthInput").value;
    if ((yyyy > yearMax) || (yyyy == yearMax && (mm > monthMax))) {
        yyyy = yearToday;
        mm = monthToday;
    }
    let url = new URL(url_api_root + 'cia');
    url.searchParams.set('year', yyyy);
    url.searchParams.set('month', mm);
    fetch(url)
        .then(getResponse)
        .then(processJSON);
}