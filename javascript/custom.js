$(document).ready(function(){

    // Add current date & time to top of the page
    var headerTime = moment().format('LLLL');
    //$("#currentDay").text(headerTime);
    console.log(headerTime);

    timedUpdate();

    function timedUpdate () {
        updateClock();
        //updateSnippets();
        setTimeout(timedUpdate, 1000);
    }

    function updateClock(){
        var now = moment(),
            second = now.seconds() * 6,
            minute = now.minutes() * 6 + second / 60,
            hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;

        $('#hour').css("transform", "rotate(" + hour + "deg)");
        $('#minute').css("transform", "rotate(" + minute + "deg)");
        $('#second').css("transform", "rotate(" + second + "deg)");
    }

    /*
    function updateSnippets () {
        var i;

        moment.locale(currentLang);

        for (i = 0; i < snippets.length; i++) {
            snippets[i].update();
        }
    }
    */

// Code saved for frontend to make circle
/*
<div class="hero-circle">
    <div class="hero-face">
        <div id="hour" class="hero-hour" style="transform: rotate(313.3deg);"></div>
        <div id="minute" class="hero-minute" style="transform: rotate(159.6deg);"></div>
        <div id="second" class="hero-second" style="transform: rotate(216deg);"></div>
    </div>
</div>
*/


// CocktailDB

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=bloody_mary",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
		"x-rapidapi-key": "4aae919d49msh403d2dc296b2570p119298jsncca5c46f499a"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});






$("#find-cocktail").on("click", function(event) {
    event.preventDefault();
    var cocktail = $("#cocktail-input").val();
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktail;
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#cocktail-info").text(JSON.stringify(response));
    });
});







});