"use strict";

// Function to call API
const url_api_root = 'https://aea-api.herokuapp.com/';

var yearInput = getElement("yearInput");
var monthInput = getElement("monthInput");

const w_tb91Input = getElement('w_tb91Input');
const w_buInput = getElement('w_buInput');
const w_blInput = getElement('w_blInput');
const w_caInput = getElement('w_caInput');
const w_usInput = getElement('w_usInput');
const w_worldInput = getElement('w_worldInput');
const local_usInput = getElement('local_usInput');
const local_worldInput = getElement('local_worldInput');

const ytd_total = getElement('jsytd_total');
const p1_total = getElement('jsp1_total');
const p3_total = getElement('jsp3_total');
const p6_total = getElement('jsp6_total');
const p9_total = getElement('jsp9_total');
const p12_total = getElement('jsp12_total');
const p24_total = getElement('jsp24_total');
const p36_total = getElement('jsp36_total');
const p48_total = getElement('jsp48_total');
const p60_total = getElement('jsp60_total');
const date = getElement('jsDate');
const errorMessage = getElement('js-error-message');
const totalWeights = getElement('js-total-weights');
const totalLine = getElement('js-total-line');
const results = getElement('js-results');
const div_messages = getElement('js-div-messages');
const table_messages = getElement('js-table-messages');

const today = new Date();
const yearToday = today.getFullYear();
const monthToday = today.getMonth() + 1; // January is 0 ...
const dayToday = today.getDate();

const yearMin = 1995;
var yearMax = yearToday;
var monthMax = monthToday;
if (monthToday == 1) {
    yearMax--;
    monthMax = 12;
} else {
    yearMax = yearToday;
    monthMax = monthToday - 1;
}

for (var year = yearMax; year >= yearMin; year--) {
    var newOption = document.createElement("option");
    newOption.appendChild(document.createTextNode((year).toString()));
    yearInput.appendChild(newOption);
    }

// yearInput.value = yearMax.toString();
// monthInput.value = monthMax.toString();
yearInput.value = "0";
monthInput.value = "0";


const getResponse = response => response.json();
const processJSON = json => {
    console.log(json);
    add_lines_to_table(div_messages, table_messages, json.messages);
    var precision;

    if (json.found == false) {
        yearInput.style.color = "red";
        monthInput.style.color = "red";
        yearInput.style.fontWeight = "bold";
        monthInput.style.fontWeight = "bold";
    } else {
        yearInput.style.color = "black";
        monthInput.style.color = "black";
        yearInput.style.fontWeight = "normal";
        monthInput.style.fontWeight = "normal";
        yearInput.value = json.year;
        monthInput.value = json.month;
    }

    mark_input(totalLine, json.valid_weights, "green", "bold");

    ytd_total.innerHTML = percentInnerHTML(json.ytd.total, precision=1);
    p1_total.innerHTML = percentInnerHTML(json.p1.total, precision=1);
    p3_total.innerHTML = percentInnerHTML(json.p3.total, precision=1);
    p6_total.innerHTML = percentInnerHTML(json.p6.total, precision=1);
    p9_total.innerHTML = percentInnerHTML(json.p9.total, precision=1);
    p12_total.innerHTML = percentInnerHTML(json.p12.total, precision=1);
    p24_total.innerHTML = percentInnerHTML(json.p24.total, precision=1);
    p36_total.innerHTML = percentInnerHTML(json.p36.total, precision=1);
    p48_total.innerHTML = percentInnerHTML(json.p48.total, precision=1);
    p60_total.innerHTML = percentInnerHTML(json.p60.total, precision=1);
    totalWeights.innerHTML = numberInnerHTML(json.total_weights, precision=1);
    date.innerHTML = json.date;
}

function showStat() {
    let year = yearInput.value;
    let month = monthInput.value;
    let w_tb91 = validate_input(w_tb91Input);
    let w_bu = validate_input(w_buInput);
    let w_bl = validate_input(w_blInput);
    let w_ca = validate_input(w_caInput);
    let w_us = validate_input(w_usInput);
    let w_world = validate_input(w_worldInput);
    let local_us = validate_input(local_usInput);
    let local_world = validate_input(local_worldInput);

    mark_input(w_tb91Input, (w_tb91 >= 0) && (w_tb91 <= 100));
    mark_input(w_buInput, (w_bu >= 0) && (w_bu <= 100));
    mark_input(w_blInput, (w_bl >= 0) && (w_bl <= 100));
    mark_input(w_caInput, (w_ca >= 0) && (w_ca <= 100));
    mark_input(w_usInput, (w_us >= 0) && (w_us <= 100));
    mark_input(w_worldInput, (w_world >= 0) && (w_world <= 100));
    mark_input(local_usInput, (local_us >= 0) && (local_us <= 100));
    mark_input(local_worldInput, (local_world >= 0) && (local_world <= 100));

    var valid_date = (year < yearToday) || (year == yearToday && month < monthToday);
    mark_input(yearInput, valid_date);
    mark_input(yearInput, valid_date);
    if (!valid_date) {
        year = yearToday;
        month = monthToday;
    }

    let url = new URL(url_api_root + 'benchmark');
    url.searchParams.set('year', year);
    url.searchParams.set('month', month);
    url.searchParams.set('w_tb91', w_tb91);
    url.searchParams.set('w_bu', w_bu);
    url.searchParams.set('w_bl', w_bl);
    url.searchParams.set('w_ca', w_ca);
    url.searchParams.set('w_us', w_us);
    url.searchParams.set('w_world', w_world);
    url.searchParams.set('local_us', local_us);
    url.searchParams.set('local_world', local_world);
    console.log('url', url)
    fetch(url)
        .then(getResponse)
        .then(processJSON);
}