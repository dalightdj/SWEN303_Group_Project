//reload the csv data based on the filter options 
function reloadData() {

    //Get the value of the each checked button 
    var checkedYearValue = $('input[name="year"]:checked').val();
    var checkedCountryValue = $('input[name="country"]:checked').val();
    var checkedSeasonValue = $('input[name="season"]:checked').val();

    //Just a map to get the names of the data files
    var yearToFilename = {
        2008: "Tables/2008-Table1.csv",
        2009: "Tables/2009-Table1.csv",
        2010: "Tables/2010-Table1.csv",
        2011: "Tables/2011-Table1.csv",
        2012: "Tables/2012-Table1.csv",
        2013: "Tables/2013-Table1.csv"
    };

    //A list showing which team belong to which country
    var teamToCountry = {

        nz: ["Central Pulse", "Northern Mystics", "Waikato Bay of Plenty Magic", "Southern Steel", "Canterbury Tactix"],
        aus: ["New South Wales Swifts", "Adelaide Thunderbirds", "Melbourne Vixens", "West Coast Fever", "Queensland Firebirds"],
        both: ["Central Pulse", "Northern Mystics", "Waikato Bay of Plenty Magic", "Southern Steel", "Canterbury Tactix", "New South Wales Swifts", "Adelaide Thunderbirds", "Melbourne Vixens", "West Coast Fever", "Queensland Firebirds"]

    };


    var teamData = {};

    //Get the filename given the year
    var fileName = yearToFilename[checkedYearValue];

    d3.csv(fileName, function (data) {


        //Gather all data for each team depending on which country is seleceted
        teamToCountry[checkedCountryValue].forEach(function (element) {
            var d = [];

            data.forEach(function (row) {

                if (row["Home Team"] === element || row["Away Team"] === element) {

                    d.push(row);

                }

            });

            teamData[element] = d;

        });

        console.log(teamData);

    });


}