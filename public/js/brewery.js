$('#addBrewery').on('keydown', '#brewerySearch', function (e) {

    // if they pressed enter add it
    if (e.keyCode === 13) {

        if (confirm('Are you sure you want to add this Brewery manually?')) {

            var parms = {
                brewery: $(this).val()
            };

            $.ajax({
                type: 'POST',
                url: 'http://lagerlogger.apphb.com/API/AddBrewery',
                data: parms,
                dataType: 'json',
                success: function (data) {

                    AddBrewery(parms.brewery);
                    $.mobile.changePage($('#breweries'));

                }
            });
        }
    }

}).on('pageshow', function (e) {

    $('#brewerySearch').autocomplete({

        target: $('#brewerySuggest'),
        source: 'http://lagerlogger.apphb.com/API/BreweryFilter',
        minLength: 2,
        link: '/',
        callback: function (e) {

            var $a = $(e.currentTarget);
            var brewery = $a.text();

            AddBrewery(brewery);
        }
    });

}).on('pagehide', function (event) {

    // clear out input
    $("#brewerySearch").val('').autocomplete('clear');
});

$('#breweryList').on('click', 'a', function () {

    var brewery = $(this).contents(':not(span)').text();

    RefreshBeerList(brewery);
});

$('#breweries').on('pageshow', function () {

    ListBreweries();
});

function ListBreweries() {

    var store = amplify.store();
    // hide search bar if no breweries, duh!

    $('#breweries .ui-input-search').toggle(!Object.keys(store).length == 0);

    var breweryLIs = '';
    $.each(store, function (i, elm) {

        breweryLIs += '<li><a href="#beers">' + i + '<span class="ui-li-count">' + elm.Beers.length; +'</span></a></li>';
    });

    $('#breweryList').html(breweryLIs).listview('refresh');
}

function AddBrewery(brewery) {

    amplify.store(brewery, { Beers: [] });

    RefreshBeerList(brewery);

    $.mobile.changePage($("#beers"));
}

function RefreshBeerList(brewery) {

    $('#beerList').empty();

    // update hidden
    $('#selectedBrewery').val(brewery);

    // set the title to be the brewery
    $('#beers').find('h1').text(brewery);

    // clear out the beer list from previous
    $('#beerList').val('');
}