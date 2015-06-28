d3.select("#floatBox").append("p");


d3.select("#floatBox")
    .append("input")
    .attr("type", "button")
    .attr("id", "compareButton")
    .attr("onclick", "comparisonsBoxFunc()")
    .attr("value", "Compare Teams")
    .attr("font-family", "sans-serif");


function setCompFields() {
    var ddb1 = document.getElementById("ddb1");
    var ddb2 = document.getElementById("ddb2");

    compareTeam1 = ddb1.options[ddb1.selectedIndex].value;
    compareTeam2 = ddb2.options[ddb2.selectedIndex].value;

}

d3.select("body").append("p");




//reload the csv data based on the filter options 
var reloadData = new Promise(function (resolve, reject) {


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

    //A list showing which round corresponds to regular, finals and both
    var seasonToRound = {
        bothSeasons: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"],
        regular: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"],
        finals: ["15", "16", "17"]
    }


    var teamData = {};

    //Get the filename given the year
    var fileName = yearToFilename[checkedYearValue];

    d3.csv(fileName, function (data) {


        //Gather all data for each team depending on which country is seleceted
        teamToCountry[checkedCountryValue].forEach(function (element) {
            var d = [];

            data.forEach(function (row) {

                //Add rows based on round number 
                if (row["Home Team"] === element || row["Away Team"] === element) {

                    seasonToRound[checkedSeasonValue].forEach(function (round) {

                        if (row["Round"] === round) {
                            d.push(row);
                        }

                    });

                }

            });

            teamData[element] = d;

        });

        // console.log(teamData);

    });

    resolve(teamData);


    //location.reload();

});

//Get the data for each depending on the filters
var getTeamData = new Promise(function (resolve, reject) {

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


                    var score = row["Score"].toString();
                    score = score.replace(/\s+/g, '');
                    var T1 = score.slice(score.length - 5, score.length - 3);
                    var T2 = score.slice(score.length - 2, score.length);

                    row["Home Score"] = T1;
                    row["Away Score"] = T2;

                    d.push(row);

                }

            });



            teamData[element] = d;

        });

        // console.log(teamData);

        resolve(teamData);
    });


});
