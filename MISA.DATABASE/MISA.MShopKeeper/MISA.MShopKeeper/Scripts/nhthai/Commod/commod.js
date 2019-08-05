if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}


function lamtronso(x) {
    var n = Math.round(x);
    return n;
}

function changeToDate(value) {
    var day = value.substring(8, 10);
    var month = value.substring(5, 7);
    var year = value.substring(0, 4);
    return year + "-" + month + "-" + day;
}

///Formart Date 
String.prototype.formatDate1 = function () {
    var parts = this.split("-");
    return parts[2] + '/' + parts[1] + '/' + parts[0];
}

///Formart Date 
String.prototype.formatDate2 = function () {
    var parts = this.split("/");
    return (parts[2].substring(0, 4)) + '/' + parts[1] + '/' + parts[0] + ' ' + (parts[2].substring(4,9));
}

//Validate căn lề theo type

Number.prototype.formatMoney = function () {
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

Date.prototype.formatddMMyyyy = function () {
    var day = this.getDate() + "";
    if (day.length == 1) {
        day = "0" + day;
    }
    var month = (this.getMonth() + 1) + "";
    if (month.length == 1) {
        month = "0" + month;
    }
    var year = this.getFullYear();
    return day + '/' + month + '/' + year;
}
Date.prototype.formatMMddyyyy = function () {
    var day = this.getDate();
    var month = this.getMonth() + 1;
    var year = this.getFullYear();
    return month + '-' + day + '-' + year;
}

Date.prototype.formatyyyyMMdd = function () {
    var day = this.getDate();
    var month = this.getMonth() + 1;
    var year = this.getFullYear();
    return year + '-' + month + '-' + day;
}



//Hàm validate ngày tháng 
//Create by NHTHAI 25/05/2019
function isValidDate(dateString) {
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;
    // Parse the date parts to integers
    var parts = dateString.split("/");
    var month = parseInt(parts[1], 10);
    var day = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);
    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;
    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29;
    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};


//Lọc giữ liệu theo ngày/tháng/quý.....

function changeDateTimeByCase(val, dtpElementStart, dtpElementEnd) {
    var datetime = new Date();

    var startDate;
    var endDate;
    switch (val) {
        //set thời gian cho hôm nay
        case '1':
            startDate = datetime;
            endDate = datetime;
            break;
        //hôm qua
        case '2':
            startDate = new Date(datetime.setDate(datetime.getDate() - 1));
            endDate = startDate;
            $(dtpElementStart).val(startDate.formatddMMyyyy());
            $(dtpElementEnd).val(endDate.formatddMMyyyy());
            break;
        //tuần này
        case '3':
            startDate = new Date(datetime.setDate(datetime.getDate() - datetime.getDay()));
            endDate = new Date();
            break;
        //tuần trước
        case '4':
            startDate = new Date(datetime.setDate(datetime.getDate() - 7 - datetime.getDay()));
            endDate = new Date(new Date().setDate(startDate.getDate() + 6));
            break;
        //tháng này
        case '5':
            startDate = new Date(datetime.setDate(1));
            endDate = new Date();
            break;
        //tháng trước
        case '6':
            startDate = new Date(datetime.setMonth(datetime.getMonth() - 1));
            startDate.setDate(1);
            endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
            break;
        //quý này
        case '7':
            startDate = new Date(datetime.setMonth(datetime.getMonth() - parseInt(datetime.getMonth() % 3)));
            startDate.setDate(1);
            endDate = new Date();
            break;
        //quý trước
        case '8':
            startMonth = (parseInt(datetime.getMonth() / 3) - 1) * 3;
            startDate = new Date(datetime.setMonth(datetime.getMonth() - 3 - parseInt(datetime.getMonth() % 3)));
            startDate.setDate(1);
            endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 3, 0);
            break;
        //6 tháng trước
        case '9':
            startDate = new Date(datetime.setMonth(datetime.getMonth() - 6));
            startDate.setDate(1);
            datetime = new Date();
            endDate = new Date(datetime.setMonth(datetime.getMonth()));
            endDate.setDate(0);
            break;
        //năm nay
        case '10':
            startDate = new Date(datetime.getFullYear(), 0, 1);
            endDate = new Date();
            break;
        //năm trước
        case '11':
            startDate = new Date(datetime.getFullYear() - 1, 0, 1);
            endDate = new Date(datetime.getFullYear() - 1, 12, 0);
            break;
        //khác
        case '12':
            break;
    }
    $(dtpElementStart).val(startDate.formatddMMyyyy());
    $(dtpElementEnd).val(endDate.formatddMMyyyy());
}

/**  * Hàm chuyển tiền sang số  * @param {any} money  */
function ParseMonneyToNumber(money) { var parts = money.split("."); var total = ''; for (var i = 0; i < parts.length; i++) { total += parts[i]; } total = parseInt(total); return total; }

//function DateNow() {
//    var d = new Date();
//    var month = d.getMonth() + 1;
//    var day = d.getDate();
//    var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear()
//    return output;
//}


//Validate giờ
function validateHhMm(inputField) {
    var isValid = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/.test(inputField);

    //if (isValid) {
    //    inputField.style.backgroundColor = '#bfa';
    //} else {
    //    inputField.style.backgroundColor = '#fba';
    //}

    return isValid;
}



//Validate input max 100
function changeHandler(val) {
    if (Number(val.value) > 100) {
        val.value = 100
    }

}


//Validate input only number 100

function validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}


