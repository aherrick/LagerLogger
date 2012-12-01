/*if (window.openDatabase) {

    DB = openDatabase("LagerLogger", "1.0", "LagerLogger", 1024);
    if (DB) {

        // create our DB
        DB.transaction(function (tx) {

            //console.log('Creating BREWERY table');
            tx.executeSql('CREATE TABLE IF NOT EXISTS Brewery (BreweryId INTEGER NOT NULL, Name TEXT)');

            //console.log('Creating BEER table');
            tx.executeSql('CREATE TABLE IF NOT EXISTS Beer (BreweryId INTEGER NOT NULL, BeerId INTERGER NOT NULL, Name TEXT, Count INTEGER NOT NULL)');
        });

    } else {
        console.log('error occurred trying to open DB');
    }
} else {
    console.log('Web Databases not supported');
}*/