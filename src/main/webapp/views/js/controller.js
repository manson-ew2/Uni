/**
 * @author sdaskaliesku
 */
$(document).ready(function () {

    var BATTERY_CHARGE_80 = 'progress-bar-success';
    var BATTERY_CHARGE_50_80 = 'progress-bar-warning';
    var BATTERY_CHARGE_50 = 'progress-bar-danger';
    var BATTERY_CHARGE_CLASSES = [BATTERY_CHARGE_50, BATTERY_CHARGE_50_80, BATTERY_CHARGE_80];

    $('#post').click(function () {
        var obj = sendPost("test", 20);
        changeBatteryProgressBar(obj.value);
    });


    function changeBatteryProgressBar(value) {
        var numValue = Number(value);
        var clazz = BATTERY_CHARGE_80;
        if (numValue <= 0) {
            numValue = 1;
        } else if (numValue > 100) {
            numValue = 100;
        }
        $('#progress-bar-percent').text(numValue + '%');
        if (numValue >= 80) {
            clazz = BATTERY_CHARGE_80;
        } else if (numValue >= 50 && numValue < 80) {
            clazz = BATTERY_CHARGE_50_80;
        } else {
            clazz = BATTERY_CHARGE_50;
        }
        var progressBar = $('.progress-bar');
        jQuery.each(BATTERY_CHARGE_CLASSES, function( i, value){
            progressBar.removeClass(value);
        });
        progressBar.css('width', numValue + '%').attr('aria-valuenow', numValue).addClass(clazz);
    }

    function sendPost(action, value) {
        var response;
        $.post( "/Main", { action: action, value: value })
            .done(function( data ) {
                return data;
            })
            .error(function(err) {
                alert('Got unknown error!');
            });
    }
});