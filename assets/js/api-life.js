"use strict";

// Function to call API
const url_api_root = 'https://aea-api.herokuapp.com/';

var yearInput = document.getElementById("yearInput");
var monthInput = document.getElementById("monthInput");
var dayInput = document.getElementById("dayInput");
var sexInput = document.getElementById("sexInput");
var countryInput = document.getElementById("countryInput");

const sex = document.getElementById('jsSex');
const country = document.getElementById('jsCountry');
const dtBirth = document.getElementById('jsDtBirth');
const dtCalc = document.getElementById('jsDtCalc');
const age = document.getElementById('jsAge');
const lifeExp = document.getElementById('jsLifeExp');
const surv5 = document.getElementById('jsSurv5');
const surv10 = document.getElementById('jsSurv10');
const surv15 = document.getElementById('jsSurv15');
const surv20 = document.getElementById('jsSurv20');
const surv25 = document.getElementById('jsSurv25');
const surv30 = document.getElementById('jsSurv30');

const today = new Date();
const yearToday = today.getFullYear();
const monthToday = today.getMonth() + 1; // January is 0 ...
const dayToday = today.getDate();

const yearMin = yearToday - 99;

for (var year = yearToday; year >= yearMin; year--) {
    var newOption = document.createElement("option");
    newOption.appendChild(document.createTextNode((year).toString()));
    yearInput.appendChild(newOption);
    }

yearInput.value = (yearToday - 50).toString();
monthInput.value = (6).toString();
dayInput.value = (15).toString();

function getPeriod(json) {
    return getMonth(json.month) + ' ' + json.year;
}


const getResponse = response => response.json();
const processJSON = json => {
    var is_number, precision, style, age_suffix, lifeExp_suffix;
    if (parseFloat(json.age) > 1) {
        age_suffix = " years"
    } else {
        age_suffix = " year"
    }
    if (parseFloat(json.lifeExp) > 1) {
        lifeExp_suffix = " years"
    } else {
        lifeExp_suffix = " year"
    }

    if (json.found == false) {
        yearInput.style.color = "red";
        monthInput.style.color = "red";
        dayInput.style.color = "red";
        dtBirth.style.color = "red";
        yearInput.style.fontWeight = "bold";
        monthInput.style.fontWeight = "bold";
        dayInput.style.fontWeight = "bold";
        dtBirth.style.fontWeight = "bold";
    }

    sex.innerHTML = format_sex(json.sex);
    country.innerHTML = format_country(json.country);
    dtBirth.innerHTML = cleanInnerHTML(json, 'dtBirth', is_number=false);
    dtCalc.innerHTML = cleanInnerHTML(json, 'dtCalc', is_number=false);
    age.innerHTML = cleanInnerHTML(json, 'age', is_number=true, precision=2, style="float") + age_suffix;
    lifeExp.innerHTML = cleanInnerHTML(json, 'lifeExp', is_number=true, precision=2, style="float") + lifeExp_suffix;
    surv5.innerHTML = cleanInnerHTML(json, 'surv5', is_number=true, precision=0, style="percent");
    surv10.innerHTML = cleanInnerHTML(json, 'surv10', is_number=true, precision=0, style="percent");
    surv15.innerHTML = cleanInnerHTML(json, 'surv15', is_number=true, precision=0, style="percent");
    surv20.innerHTML = cleanInnerHTML(json, 'surv20', is_number=true, precision=0, style="percent");
    surv25.innerHTML = cleanInnerHTML(json, 'surv25', is_number=true, precision=0, style="percent");
    surv30.innerHTML = cleanInnerHTML(json, 'surv30', is_number=true, precision=0, style="percent");
}

function showStat() {
    let year = yearInput.value;
    let month = monthInput.value;
    let day = dayInput.value;
    let sex = sexInput.value.toLowerCase();
    let country = countryInput.value.toLowerCase();

    if ((year > yearToday) || (year == yearToday && month > monthToday) || (year == yearToday && month == monthToday && day > dayToday)) {
        year = yearToday;
        month = monthToday;
        day = dayToday;
        yearInput.style.color = "red";
        monthInput.style.color = "red";
        dayInput.style.color = "red";
        dtBirth.style.color = "red";
        yearInput.style.fontWeight = "bold";
        monthInput.style.fontWeight = "bold";
        dayInput.style.fontWeight = "bold";
        dtBirth.style.fontWeight = "bold";
    } else {
        yearInput.style.color = "black";
        monthInput.style.color = "black";
        dayInput.style.color = "black";
        dtBirth.style.color = "black";
        yearInput.style.fontWeight = "normal";
        monthInput.style.fontWeight = "normal";
        dayInput.style.fontWeight = "normal";
        dtBirth.style.fontWeight = "normal";
    }
    let url = new URL(url_api_root + 'life');
    url.searchParams.set('year', year);
    url.searchParams.set('month', month);
    url.searchParams.set('day', day);
    url.searchParams.set('sex', sex);
    url.searchParams.set('country', country);
    fetch(url)
        .then(getResponse)
        .then(processJSON);
}