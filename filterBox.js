//Add year filter buttons
var years = d3.select("body").append("p");

years.append("text")
    .attr("stroke", "black")
    .attr("font-family", "sans-serif")
    .text("Year:  ");

years.append("input")
    .attr("type", "button")
    .attr("id", "2008Button")
    .attr("value", "2008")
    .style("font-size", "10px");

years.append("input")
    .attr("type", "button")
    .attr("id", "2009Button")
    .attr("value", "2009")
    .style("font-size", "10px");

years.append("input")
    .attr("type", "button")
    .attr("id", "2010Button")
    .attr("value", "2010")
    .style("font-size", "10px");

years.append("input")
    .attr("type", "button")
    .attr("id", "2011Button")
    .attr("value", "2011")
    .style("font-size", "10px");

years.append("input")
    .attr("type", "button")
    .attr("id", "2012Button")
    .attr("value", "2012")
    .style("font-size", "10px");

years.append("input")
    .attr("type", "button")
    .attr("id", "2013Button")
    .attr("value", "2013")
    .style("font-size", "10px");

//Add Country filter buttons
var countries = d3.select("body").append("p");

countries.append("text")
    .attr("stroke", "black")
    .attr("font-family", "sans-serif")
    .text("Country:  ");

countries.append("input")
    .attr("type", "button")
    .attr("id", "bothCountryButton")
    .attr("value", "Both")
    .style("font-size", "10px");

countries.append("input")
    .attr("type", "button")
    .attr("id", "nzButton")
    .attr("value", "Nz")
    .style("font-size", "10px");

countries.append("input")
    .attr("type", "button")
    .attr("id", "ausButton")
    .attr("value", "Aus")
    .style("font-size", "10px");

//Add Season filter buttons
var seasons = d3.select("body").append("p");

seasons.append("text")
    .attr("stroke", "black")
    .attr("font-family", "sans-serif")
    .text("Season:  ");

seasons.append("input")
    .attr("type", "button")
    .attr("id", "bothSeasonButton")
    .attr("value", "Both")
    .style("font-size", "10px");

seasons.append("input")
    .attr("type", "button")
    .attr("id", "bothButton")
    .attr("value", "Both")
    .style("font-size", "10px");

seasons.append("input")
    .attr("type", "button")
    .attr("id", "regularButton")
    .attr("value", "Regaular")
    .style("font-size", "10px");

seasons.append("input")
    .attr("type", "button")
    .attr("id", "finalsButton")
    .attr("value", "Finals")
    .style("font-size", "10px");

//Add compare button
d3.select("body")
    .append("p")
    .append("input")
    .attr("type", "button")
    .attr("id", "compareButton")
    .attr("value", "Compare")
    .style("font-size", "10px");