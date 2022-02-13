

function getMonth(m) {
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
    }
    return month;
}

function cleanInnerHTML(json, key, is_number = false, precision = 2, style = "percent") {
    if (json.hasOwnProperty(key)) {
        if (is_number && style === "percent") {
            let num = Number(json[key]).toLocaleString('en-US', {
                minimumFractionDigits: precision,
                maximumFractionDigits: precision,
                style: "percent"
            });
            return num;
        } else if (is_number && style === "currency") {
            let num = Number(json[key]).toLocaleString('en-US', {
                minimumFractionDigits: precision,
                maximumFractionDigits: precision
            });
            return "$" + num;
        } else if (is_number) {
            let num = Number(json[key]).toLocaleString('en-US', {
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