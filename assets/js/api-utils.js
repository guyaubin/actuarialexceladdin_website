"use strict"; // enforce the declaration of variables

function validate_input(input, default_value = 0) {
    if (input.value.length == 0) {
        input.value = default_value;
    }
    var num = Number(input.value);
    if (isNaN(num)) {
        return default_value;
    } else {
        return num;
    }
}

function mark_input(input, valid, color ="black", fontWeight ="normal") {
    if (valid) {
        input.style.color = color;
        input.style.fontWeight = fontWeight;
    } else {
        input.style.color = "red";
        input.style.fontWeight = "bold";
    }
}


function getElement(id, default_value = 0) {
    var element = document.getElementById(id);
    if (element == "") {
        return default_value;
    } else {
        return element;
    }
}

function getMonth(m) {
    var month;
    switch (m) {
    case 1:
        month = "January";
        break;
    case 2:
        month = "February";
        break;
    case 3:
        month = "March";
        break;
    case 4:
        month = "April";
        break;
    case 5:
        month = "May";
        break;
    case 6:
        month = "June";
        break;
    case 7:
        month = "July";
        break;
    case 8:
        month = "August";
        break;
    case 9:
        month = "September";
        break;
    case 10:
        month = "October";
        break;
    case 11:
        month = "November";
        break;
    case 12:
        month = "December";
        break;
    }

    return month;
}


function getProvince(p) {
    var province;
    switch (p) {
    case "CA":
        province = "Canada";
        break;
    case "AL":
        province = "Alberta";
        break;
    case "CB":
        province = "British Columbia";
        break;
    case "MA":
        province = "Manitoba";
        break;
    case "NB":
        province = "New Brunswick";
        break;
    case "TN":
        province = "Newfoundland and Labrador";
        break;
    case "NE":
        province = "Nova Scotia";
        break;
    case "ON":
        province = "Ontario";
        break;
    case "IPE":
        province = "Prince Edward Island";
        break;
    case "QC":
        province = "Québec";
        break;
    case "SA":
        province = "Saskatchewan";
        break;
    }

    return province;
}


function percentInnerHTML(value, precision = 2, empty ="---") {
    if (value === null) {
        return empty;
    }
    var num = Number(value);
    if (isNaN(num)) {
        return empty;
    }
    else {
        num = num.toLocaleString('en-US', {
            minimumFractionDigits: precision,
            maximumFractionDigits: precision,
            style: "percent"
        });
        return num;
    }
}


function numberInnerHTML(value, precision = 2, empty ="---") {
    if (value === null) {
        return empty;
    }
    var num = Number(value);
    if (isNaN(num)) {
        return empty;
    }
    else {
        num = num.toLocaleString('en-US', {
            minimumFractionDigits: precision,
            maximumFractionDigits: precision
        });
        return num;
    }
}

function cleanInnerHTML(json, key, is_number = false, precision = 2, style = "percent") {
    if (json.hasOwnProperty(key)) {
        var num;
        if (is_number && style === "percent") {
            num = Number(json[key]).toLocaleString('en-US', {
                minimumFractionDigits: precision,
                maximumFractionDigits: precision,
                style: "percent"
            });
            return num;
        } else if (is_number && style === "currency") {
            num = Number(json[key]).toLocaleString('en-US', {
                minimumFractionDigits: precision,
                maximumFractionDigits: precision
            });
            return "$" + num;
        } else if (is_number) {
            num = Number(json[key]).toLocaleString('en-US', {
                minimumFractionDigits: precision,
                maximumFractionDigits: precision
            });
            return num;
        } else {
            return json[key];
        }
    }
    return "---";
}

function format_sex(sex) {
    if (sex === 'female') {
        return 'Female'
    } else {
        return 'Male'
    }
}

function format_country(country) {
    if (country === 'us') {
        return 'United States'
    } else {
        return 'Canada'
    }
}

function add_lines_to_table(div, table, lines){
    var ctr = 0;
    table.innerHTML = "";
    if (lines.length === 0) {
        div.style.display = "none";
    } else {
        lines.forEach(line => {
            var row = table.insertRow(ctr);
            var cell = row.insertCell(0);
            cell.innerHTML = line;
            cell.classList.add("text-danger")
            ctr++;
        });
        div.style.display = "block";
    }
}