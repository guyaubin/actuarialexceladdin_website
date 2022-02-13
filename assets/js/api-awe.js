// Function to call API
const url_api_root = 'https://aea-api.herokuapp.com/';

const rate_1 = document.getElementById('jsRate_1');
const rate_ytd = document.getElementById('jsRate_ytd');
const rate_12 = document.getElementById('jsRate_12');
const period = document.getElementById('jsPeriod');
const yearInput = document.getElementById('yearInput');
const monthInput = document.getElementById('monthInput');
const today = new Date();
const yearToday = today.getFullYear();
const monthToday = today.getMonth() + 1; //January is 0!
const yearMin = 1984; // AWE stat starts with Jan 1983 - needs 12 months of stat to calculate rate_12 (12 months)
var yearMax = yearToday;
var monthMax = monthToday;

// CPI monthly stats are available with 2 or 3 months lag
if (monthToday === 2) {
    yearMax--;
    monthMax = 12;
    }
else if (monthToday === 1) {
    yearMax--;
    monthMax = 11;
    }
else {
    monthMax-=2;
}
var yyyy = String(yearMax);
var mm = String(monthMax);

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
    rate_1.innerHTML = cleanInnerHTML(json, 'rate_1', is_number=true, precision=1, style="percent");
    rate_ytd.innerHTML = cleanInnerHTML(json, 'rate_ytd', is_number=true, precision=1, style="percent");
    rate_12.innerHTML = cleanInnerHTML(json, 'rate_12', is_number=true, precision=1, style="percent");
    period.innerHTML = getPeriod(json);
    yearInput.value = json.year;
    monthInput.value = json.month;
}

function showStat() {
    yyyy = yearInput.value;
    mm = monthInput.value;
    let url = new URL(url_api_root + 'awe');
    url.searchParams.set('year', yyyy);
    url.searchParams.set('month', mm);
    fetch(url)
        .then(getResponse)
        .then(processJSON);
}