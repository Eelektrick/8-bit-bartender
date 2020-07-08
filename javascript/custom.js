$(document).ready(function(){

    var allCollapsibles = $('.collapsible');
    allCollapsibles.collapsible();

    var instance = M.Collapsible.getInstance(allCollapsibles);
    instance.open(0);

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


    //click nutrition button will show nutrition from nutrition API
    $("#find-nutrition").on("click", function(event){
       event.preventDefault();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/visualizeIngredients",
            "method": "POST",
            "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "0db78244ecmsh4626ddd67f9751fp1f1254jsn223786f7ea47",
            "accept": "text/html",
            "content-type": "application/x-www-form-urlencoded"
            },
            //Do not know if we need this to work without testing but putting it here if needed
            // "data": {
            //     "measure": "metric",
            //     "view": "grid",
            //     "ingredientList": "3 oz flour",
            //     "servings": "2"
            // }
        }

        $.ajax(settings).then(function(response){

            console.log(nutritionResponse);

            $("#nutrition-info").text(JSON.stringify(response));
        });
    }); 



//$("#find-cocktail").on("click", function(event) {
//    event.preventDefault();
//    var cocktail = $("#cocktail-input").val();

    var cocktail = "bloody mary";

    var queryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=" + cocktail;
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      
      console.log(response);
      var ingredients = ["strIngredient1", "strIngredient2", "strIngredient3", "strIngredient4", "strIngredient5", "strIngredient6", "strIngredient7", "strIngredient8", "strIngredient9", "strIngredient10"];

      for (i = 1; i < ingredients.length; i++) {
        if(response.drinks[0][ingredients[i]] !== null) {
            //console.log(response.drinks[0][ingredients[i]]);
            var ingredient = response.drinks[0][ingredients[i]];
            $("#ingredientCollapse").append("<div>" + ingredient + "</div>");

            // Use ingredient as the input variable and loop it through the nutrition api
            // Add the results to the nutrition section
        }
      };
      
      
    });
//});



});