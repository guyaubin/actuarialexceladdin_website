"use strict"; // enforce the declaration of variables

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