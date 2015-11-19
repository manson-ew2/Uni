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
    var VIDEO_FRAME = $('#videoFrame');

    var VIDEO_LINK = '';
    var VIDEO_RECOGNITION_LINK = '';

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
            //alert('We should not send empty strings to RPI!');
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
                        changeBatteryStates(resp[0], resp[1]);
                    } else if (data.value.includes(' ')) {
                        resp = data.value.split(" ");
                        changeBatteryStates(resp[0], resp[1]);
                    } else {
                        changeBatteryStates(data.value, data.value);
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

    function changeBatteryStates(val1, val2) {
        if (val1) {
            changeBatteryProgressBar(val1, 1);
        }
        if (val2) {
            changeBatteryProgressBar(val2, 2);
        }
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
        return 360 - Number($("input.angle").val()) + 90;
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

    $(".glyphicon-circle-arrow-left").click(function () {
        sendPost("turnLeft", 0);
    });
    $(".glyphicon-circle-arrow-right").click(function () {
        sendPost("turnRight", 0);
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

    $("#turnLeft").click(function () {
        sendPost("turnLeft", 0);
    });

    $("#turnRight").click(function () {
        sendPost("turnRight", 0);
    });

    $("#send").click(function () {
        var text = CONSOLE_INPUT.val();
        if (!text || text.length < 1) {
            alert('We should not send empty strings to RPI!');
            return;
        }
        writeToConsole('PC', txt);
        CONSOLE_INPUT.val("");
        sendPost("manual", txt);
    });

    $("#clear").click(function () {
        $('#console-input').val("");
        $("#logs").empty();
    });

    $("#videoOff").click(function () {
        VIDEO_FRAME.attr('src', '');
    });

    $("#video").click(function () {
        VIDEO_FRAME.attr('src', VIDEO_LINK);
    });

    $("#videoRec").click(function () {
        VIDEO_FRAME.attr('src', VIDEO_RECOGNITION_LINK);
    });

    $(document).keydown(function (e) {
        // prevent arrow key scrolling
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