$('#addBeer').on('keydown', '#beerSearch', function (e) {

    console.log(e.keyCode);
    // if they pressed enter add it
    if (e.keyCode === 13) {

        if (confirm('Are you sure you want to add this Beer manually?')) {

            var beer = $(this).val();
            $('#beerName').text(beer);
            $.mobile.changePage($('#submitBeerForm'), { role: 'dialog', transition: 'pop' });
        }
    }
}).on('pageshow', function (e) {

    $('#beerSearch').autocomplete({
        target: $('#beerSuggest'),
        source: 'http://lagerlogger.apphb.com/API/BeerFilter?brewery=' + $('#selectedBrewery').val(),
        link: '/',
        callback: function (e) {

            var $a = $(e.currentTarget);
            var beer = $a.text();

            AddBeer(beer);
        }
    });
}).on('pagehide', function (event) {

    // clear out input
    $("#beerSearch").val('').autocomplete('clear');
});

$('#submitBeer').on('click', function () {

    var parms = {
        brewery: $('#selectedBrewery').val(),
        beer: $('#beerName').text(),
        abv: parseFloat($('#abv').val())
    };

    $.ajax({
        type: 'POST',
        url: 'http://lagerlogger.apphb.com/API/AddBeer',
        data: parms,
        dataType: 'json',
        success: function (data) {

            // clear out
            $('#abv').val('');
            AddBeer(parms.beer);
            $.mobile.changePage($('#beers'));

        }
    });

});

globalSelectedBrewery = '';
$('#beers').on('pageshow', function (e) {

    var selectedBrewery = $('#selectedBrewery').val();
    var beers = amplify.store(selectedBrewery).Beers.length;

    if (beers != 0) {

        // if we have beers, list them
        ListBeers(selectedBrewery);
    }

    // this hack sux
    else if (beers == 0 && globalSelectedBrewery !== selectedBrewery) {

        // if we don't and its a new brewery, show the dialogk
        globalSelectedBrewery = selectedBrewery;
        $('#addBeerBtn').click();
    }
});

$('#beerList').on('click', 'a', function () {

    if (confirm('Are you sure you enjoyed another of these?')) {

        var beer = $(this).contents(':not(span)').text();
        var selectedBrewery = $('#selectedBrewery').val();

        var beers = amplify.store(selectedBrewery).Beers;
        beers.push(beer);

        amplify.store(selectedBrewery, { Beers: beers });
        ListBeers(selectedBrewery);
    }
});

function AddBeer(beer) {

    var selectedBrewery = $('#selectedBrewery').val();
    var beers = amplify.store(selectedBrewery).Beers;
    beers.push(beer);

    amplify.store(selectedBrewery, { Beers: beers });
    ListBeers(selectedBrewery);

    $('.ui-dialog').dialog('close');
}

function ListBeers(brewery) {

    brewery = amplify.store(brewery);

    var beerLIs = '';
    $.each(array_count_values(brewery.Beers), function (k, v) {
        beerLIs += '<li><a href="#">' + k + '<span class="ui-li-count">' + v + '</span></a></li>';

    });

    $('#beerList').html(beerLIs).listview('refresh');

    ListBreweries();

    $('#beers .ui-input-search').toggle(!brewery.Beers.length == 0);
}