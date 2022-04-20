// Function to call API
const url_api_root = 'https://aea-api.herokuapp.com/';

const rate_1 = document.getElementById('jsRate_1');
const rate_ytd = document.getElementById('jsRate_ytd');
const rate_12 = document.getElementById('jsRate_12');
const period = document.getElementById('jsPeriod');
const province = document.getElementById('jsProvince');
const yearInput = document.getElementById('yearInput');
const monthInput = document.getElementById('monthInput');
const provinceInput = document.getElementById('provinceInput');
const today = new Date();
const yearToday = today.getFullYear();
const monthToday = today.getMonth() + 1; //January is 0!
const yearMin = 1915; // CPI stat starts with Jan 1914 - needs 12 months of stat to calculate rate_12 (12 months)
var yearMax = yearToday;
var monthMax = monthToday;

// CPI monthly stats are available with 1 or 2 months lag
if (monthToday === 1) {
    yearMax--;
    monthMax = 12;
    }
else {
    monthMax--;
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

// function getProvince(json) {
//     return 'Inflation in ' + findProvince(json.province);
// }


const getResponse = response => response.json();
const processJSON = json => {
    rate_1.innerHTML = cleanInnerHTML(json, 'rate_1', is_number=true, precision=1, style="percent");
    rate_ytd.innerHTML = cleanInnerHTML(json, 'rate_ytd', is_number=true, precision=1, style="percent");
    rate_12.innerHTML = cleanInnerHTML(json, 'rate_12', is_number=true, precision=1, style="percent");
    period.innerHTML = getPeriod(json);
    province.innerHTML = getProvince(json.province);
    yearInput.value = json.year;
    monthInput.value = json.month;
    provinceInput = json.province;
}

function showStat() {
    yyyy = yearInput.value;
    mm = monthInput.value;
    prov = provinceInput.value;
    if ((prov != 'CA') && (yyyy < 1980)) {
        yyyy = 1980;
    }

    let url = new URL(url_api_root + 'cpi');
    url.searchParams.set('year', yyyy);
    url.searchParams.set('month', mm);
    url.searchParams.set('province', prov);
    fetch(url)
        .then(getResponse)
        .then(processJSON);
}