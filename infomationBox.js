var x = 0,
    y = 0,
    first = false,
    second = false,
    rx = 20,
    ry = 155,
    index = 0,
    actRound = 0,
    roundPlusOne = 1;



var infoBoxesContainer = canvas.append("svg")
    .attr("width", 1500)
    .attr("height", 1500);


function addInfoboxes() {

    getTeamData.then(function (result) {

        var numOfTeams = Object.keys(result).length;

        //console.log(result);

        //for every team
        $.each(result, function (k, v) {
            //console.log(k);


            //Change x and y position
            if (first === true && second === true) {
                y -= 650
                x += 300
                first = true;
                second = false;

            } else if (first === true && second === false) {
                y += 650
                first = true;
                second = true;
            } else if (first === false && second === false) {
                first = true;
                second = false;
            }

            //Create info box
            var infoBox = infoBoxesContainer.append("g")
                .attr("transform", "translate(" + y + "," + x + ")");

            infoBox.append("rect")
                .attr("width", 500)
                .attr("height", 250)
                .style("fill", "Yellow");


            var teamN = "Images/Logos/" + k.replace(/\s+/g, '') + ".jpg";

            //Because "of" in waikato team is not "Of"
            if ((k.replace(/\s+/g, '') === "WaikatoBayofPlentyMagic")) {
                teamN = "Images/Logos/WaikatoBayOfPlentyMagic.jpg";
            }

            //console.log(teamN);

            //Add team logo
            infoBox.append("svg:image")
                .attr("xlink:href", teamN)
                .attr("width", 500)
                .attr("height", 150);

            //Resetting the values for new info box
            index = 0;
            rx = 20;
            ry = 155;
            roundPlusOne = 1;
            actRound = 0;



            //for every round given a team
            for (var j = 0; j < v.length; j++) {
                // console.log(v[j]);


                actRound = v[j]["Round"];

                var score = v[j]["Score"].toString();
                var T1 = score.slice(score.length - 5, score.length - 3);
                var T2 = score.slice(score.length - 2, score.length);

                var HT = v[j]["Home Team"];
                var AT = v[j]["Away Team"];

                var HomeTeamToScore = [HT, T1];
                var AwayTeamToScore = [AT, T2];

                if (score.indexOf("draw") > -1) {
                    HomeTeamToScore.push("draw");
                    AwayTeamToScore.push("draw");
                } else {
                    HomeTeamToScore.push("no draw");
                    AwayTeamToScore.push("no draw");
                }



                if (actRound != roundPlusOne && actRound != 17) {
                    infoBox.append("rect")
                        .attr("x", rx)
                        .attr("y", ry)
                        .attr("width", 45)
                        .attr("height", 45)
                        .style("fill", "Pink");

                    infoBox.append("text")
                        .attr("x", rx + 8)
                        .attr("y", ry + 25)
                        .text("BYE");

                    rx += 47;
                    index++;

                    //for the actual round
                    infoBox.append("rect")
                        .attr("x", rx)
                        .attr("y", ry)
                        .attr("width", 45)
                        .attr("height", 45)
                        .style("fill", function () {
                            if (T1 > T2) {
                                return "Green";
                            } else if (T1 === T2) {
                                return "Blue";
                            } else {
                                return "Red";
                            }
                        });

                    infoBox.append("text")
                        .attr("x", rx + 17)
                        .attr("y", ry + 25)
                        .text(actRound);

                    roundPlusOne += 2;
                } else {

                    infoBox.append("rect")
                        .attr("x", rx)
                        .attr("y", ry)
                        .attr("width", 45)
                        .attr("height", 45)
                        .style("fill", function () {
                            if ((HomeTeamToScore[0] === k && HomeTeamToScore[1] > AwayTeamToScore[1]) || (AwayTeamToScore[0] === k && AwayTeamToScore[1] > HomeTeamToScore[1])) {
                                return "Green";
                            } else if (HomeTeamToScore[2] === "draw" || AwayTeamToScore[2] === "draw") {
                                return "Blue";
                            } else {
                                return "Red";
                            }
                        })
                        .append("title")
                        .text(function () {
                            return "Round " + actRound + ": " + v[j]["Home Team"] + " Vs. " + v[j]["Away Team"] + "\nVenue: " + v[j]["Venue"] + "\nScore: " + score;
                        });

                    infoBox.append("text")
                        .attr("x", rx + 17)
                        .attr("y", ry + 25)
                        .text(v[j]["Round"]);

                    roundPlusOne++;

                }


                index++;


                if (index < 10) {
                    rx += 47;
                } else {
                    index = 0;
                    rx = 20;
                    ry = 202;
                }
            }

        });


    });

}