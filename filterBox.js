var dropDownBox1 = d3.select("body")
    .append("select")
    .attr("id", "ddb1")
    .attr("onChange", "setCompFields()");

var dropDownBox2 = d3.select("body")
    .append("select")
    .attr("id", "ddb2")
    .attr("onChange", "setCompFields()");


d3.select("body")
    .append("input")
    .attr("type", "button")
    .attr("id", "compareButton")
    .attr("onclick", "comparisonsBoxFunc()")
    .attr("value", "Compare");


dropDownBox1.append("option")
    .attr("value", "Adelaide Thunderbirds")
    .text("AdelaideThunderbirds");

dropDownBox1.append("option")
    .attr("value", "Canterbury Tactix")
    .text("Canterbury Tactix");

dropDownBox1.append("option")
    .attr("value", "Central Pulse")
    .text("Central Pulse");

dropDownBox1.append("option")
    .attr("value", "Melbourne Vixens")
    .text("Melbourne Vixens");

dropDownBox1.append("option")
    .attr("value", "Northern Mystics")
    .text("Northern Mystics");

dropDownBox1.append("option")
    .attr("value", "New South Wales Swifts")
    .text("NSW Swifts");

dropDownBox1.append("option")
    .attr("value", "Queensland Firebirds")
    .text("Queensland Firebirds");

dropDownBox1.append("option")
    .attr("value", "Southern Steel")
    .text("Southern Steel");

dropDownBox1.append("option")
    .attr("value", "Waikato Bay of PlentyMagic")
    .text("Waikato Bay Of Plenty Magic");

dropDownBox1.append("option")
    .attr("value", "West Coast Fever")
    .text("West Coast Fever");

dropDownBox2.append("option")
    .attr("value", "Adelaide Thunderbirds")
    .text("AdelaideThunderbirds");

dropDownBox2.append("option")
    .attr("value", "Canterbury Tactix")
    .text("Canterbury Tactix");

dropDownBox2.append("option")
    .attr("value", "Central Pulse")
    .text("Central Pulse");

dropDownBox2.append("option")
    .attr("value", "Melbourne Vixens")
    .text("Melbourne Vixens");

dropDownBox2.append("option")
    .attr("value", "Northern Mystics")
    .text("Northern Mystics");

dropDownBox2.append("option")
    .attr("value", "NSW Swifts")
    .text("NSW Swifts");

dropDownBox2.append("option")
    .attr("value", "Queensland Firebirds")
    .text("Queensland Firebirds");

dropDownBox2.append("option")
    .attr("value", "Southern Steel")
    .text("Southern Steel");

dropDownBox2.append("option")
    .attr("value", "Waikato Bay of Plenty Magic")
    .text("Waikato Bay Of Plenty Magic");

dropDownBox2.append("option")
    .attr("value", "West Coast Fever")
    .text("West Coast Fever");

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
