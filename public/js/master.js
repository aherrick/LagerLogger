$(function () {

    // traditional ajax FTW
    jQuery.ajaxSettings.traditional = true;

    $(window.applicationCache).bind('updateready', function () {

        if (confirm('New updates are available, would you like to to reload?')) {
            location.reload();
        }
    });

    $('#serverSync').click(function (e) {

        e.preventDefault();

    });
});

$(document).bind("mobileinit", function () {

    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
});



// respond to clicks on the login and logout links
$('#fbLogin').click(function (e) {

    e.preventDefault();
    FB.login(function (response) {

    }, { scope: 'offline_access' });
});

$('#fbLogout').click(function (e) {

    e.preventDefault();
    FB.logout();
});
