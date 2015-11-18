/**
 * @author sdaskaliesku
 */
$(document).ready(function () {

    var BATTERY_CHARGE_80 = 'progress-bar-success';
    var BATTERY_CHARGE_50_80 = 'progress-bar-warning';
    var BATTERY_CHARGE_50 = 'progress-bar-danger';
    var BATTERY_CHARGE_CLASSES = [BATTERY_CHARGE_50, BATTERY_CHARGE_50_80, BATTERY_CHARGE_80];
    var LOGS = $('#logs');
    var CONSOLE_INPUT = $('#console-input');

    function getTimeString(timeValue) {
        var result = timeValue;
        if (Number(timeValue) < 9) {
            result = "0" + timeValue;
        }
        return result;
    }

    function getCurrentTimeString() {
        var currentDate = new Date();
        return getTimeString(currentDate.getHours()) + ":"
            + getTimeString(currentDate.getMinutes()) + ":"
            + getTimeString(currentDate.getSeconds());
    }

    function writeToConsole(type, text) {
        if (!text || text.length < 1) {
            alert('We should not send empty strings to RPI!');
            return;
        }
        var labelClass = 'label-danger';
        if (type.toLowerCase() === 'pc') {
            labelClass = 'label-success';
        }
        var labelHtml = '<span class="label ' + labelClass + '">' + getCurrentTimeString() + '</span>';
        var messageHtml = '<p>' + labelHtml + '&nbsp;' + text + '</p>';
        LOGS.append(messageHtml);
        LOGS.scrollTop(LOGS[0].scrollHeight);
    }


    function changeBatteryProgressBar(value, num) {
        value = validateBattery(value);
        var numValue = Number(value);
        var clazz = BATTERY_CHARGE_80;
        if (numValue <= 0) {
            numValue = 1;
        } else if (numValue > 100) {
            numValue = 100;
        }
        var barId = '#progress-bar-percent' + num;
        var barClass = '#battery-charge' + num;
        $(barId).text(numValue + '%');
        if (numValue >= 80) {
            clazz = BATTERY_CHARGE_80;
        } else if (numValue >= 50 && numValue < 80) {
            clazz = BATTERY_CHARGE_50_80;
        } else {
            clazz = BATTERY_CHARGE_50;
        }
        var progressBar = $(barClass);
        jQuery.each(BATTERY_CHARGE_CLASSES, function (i, value) {
            progressBar.removeClass(value);
        });
        progressBar.css('width', numValue + '%').attr('aria-valuenow', numValue).addClass(clazz);
    }

    function sendPost(action, value) {
        var request = "Action: " + action + " value: " + value;
        writeToConsole('PC', request);
        $.post("/Main", {action: action, value: value})
            .success(function (data) {
                writeToConsole('RPI', 'Success: ' + JSON.stringify(data));
                if (action === 'batteryInfo') {
                    var resp;
                    if (data.value.includes(',')) {
                        resp = data.value.split(",");
                        changeBatteryProgressBar(resp[0], 1);
                        changeBatteryProgressBar(resp[1], 2);
                    } else if (data.value.includes(' ')) {
                        resp = data.value.split(" ");
                        changeBatteryProgressBar(resp[0], 1);
                        changeBatteryProgressBar(resp[1], 2);
                    } else {
                        changeBatteryProgressBar(data.value, 1);
                        changeBatteryProgressBar(data.value, 2);
                    }
                }
                return data;
            })
            .error(function (err) {
                writeToConsole('RPI', 'Err: ' + JSON.stringify(err));
                console.log(err);
                return err;
            });
    }

    function validateBattery(input) {
        if (input.includes("nan")) {
            return 0;
        }
        return input;
    }

    function getSpeed() {
        return $("input.speed").val();
    }

    function getHeight() {
        return $("input.height").val();
    }

    function getAngle() {
        var angle = Number($("input.angle").val()) + 90;
        if (angle > 360) {
            angle = angle - 360;
        }
        return  angle;
    }

    $(".glyphicon-arrow-up").click(function () {
        sendPost("cameraUp", 0);
    });

    $(".glyphicon-arrow-down").click(function () {
        sendPost("cameraDown", 0);
    });

    $(".glyphicon-arrow-left").click(function () {
        sendPost("cameraLeft", 0);
    });
    $(".glyphicon-arrow-right").click(function () {
        sendPost("cameraRight", 0);
    });
    $(".glyphicon-screenshot").click(function () {
        sendPost("cameraCenter", 0);
    });

    $("#update").click(function () {
        sendPost("batteryInfo", 0);
    });

    $("#go").click(function () {
        var csvParams = getSpeed() + ',' + getAngle() + ',' + getHeight();
        sendPost("move", csvParams);
    });

    $("#stop").click(function () {
        sendPost("stop", 0);
    });

    $("#send").click(function () {
        var txt = CONSOLE_INPUT.val();
        writeToConsole('PC', txt);
        CONSOLE_INPUT.val("");
        sendPost("manual", txt);
    });

    $("#clear").click(function () {
        $('#console-input').val("");
        $("#logs").empty();
    });

    $("#videoOff").click(function () {
        sendPost('videoOff', 0);
    });

    $("#video").click(function () {
        sendPost('video', 0);
    });

    $("#videoRec").click(function () {
        sendPost('videoRec', 0);
    });

    $(document).keydown(function (e) {
        // arrows
        if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
        if (e.which === 38) {
            $(".glyphicon-arrow-up").click();
        }
        if (e.which === 40) {
            $(".glyphicon-arrow-down").click();
        }
        if (e.which === 37) {
            $(".glyphicon-arrow-left").click();
        }
        if (e.which === 39) {
            $(".glyphicon-arrow-right").click();
        }
        // ctrl
        if (e.which === 17) {
            $(".glyphicon-screenshot").click();
        }
    });
});