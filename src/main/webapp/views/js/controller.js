/**
 * @author sdaskaliesku
 */
$(document).ready(function () {

    var BATTERY_CHARGE_80 = 'progress-bar-success';
    var BATTERY_CHARGE_50_80 = 'progress-bar-warning';
    var BATTERY_CHARGE_50 = 'progress-bar-danger';
    var BATTERY_CHARGE_CLASSES = [BATTERY_CHARGE_50, BATTERY_CHARGE_50_80, BATTERY_CHARGE_80];

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
        $('#logs').append(messageHtml);
        $("#logs").scrollTop($("#logs")[0].scrollHeight);
    }


    function changeBatteryProgressBar(value, num) {
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
            //.done(function (data) {
            //    writeToConsole('RPI', 'Done: ' + data);
            //    return data;
            //})
            .success(function (data) {
                writeToConsole('RPI', 'Success: ' + data);
                return data;
            })
            .error(function (err) {
                writeToConsole('RPI', 'Err: ' + err);
                console.log(err);
            });
    }

    function getSpeed() {
        return $("input.speed").val();
    }

    function getHeight() {
        return $("input.height").val();
    }

    function getAngle() {
        return $("input.angle").val();
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
        var data = {};
        data.value = 10;
        changeBatteryProgressBar(data.value, 1);
        data.value = 70;
        changeBatteryProgressBar(data.value, 2);
    });

    $("#go").click(function () {
        var csvParams = getSpeed() + ',' + getAngle() + ',' + getHeight();
        sendPost("move", csvParams);
    });

    $("#stop").click(function () {
        sendPost("stop", 0);
    });

    $("#send").click(function () {
        var txt = $('#console-input').val();
        writeToConsole('RPI', txt);
        writeToConsole('PC', txt);
        $('#console-input').val("");
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

    $(document).keypress(function (e) {
        // wasd, arrows, C/Space = center
        if (e.which === 119) {
            $(".glyphicon-arrow-up").click();
        }
        if (e.which === 115) {
            $(".glyphicon-arrow-down").click();
        }
        if (e.which === 97) {
            $(".glyphicon-arrow-left").click();
        }
        if (e.which === 100) {
            $(".glyphicon-arrow-right").click();
        }
        if (e.which === 99 || e.which === 32) {
            $(".glyphicon-screenshot").click();
        }
    });

    $(document).keydown(function (e) {
        // wasd, arrows, C/Space = center
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
    });
});