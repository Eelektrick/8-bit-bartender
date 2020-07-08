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
    //$("#find-nutrition").on("click", function(event){
       //event.preventDefault();

    //    ingredient = "tomato juice";

    //    var settings = "https://api.nutritionix.com/v1_1/search/" + ingredient + "?results=0:20&fields=item_name,brand_name,item_id,nf_calories,nf_sodium,nf_total_fat&appId=f15b331a&appKey=5dd831bff3255ac412edcba64b74b1c0";
       
    //    $.ajax(settings).done(function (nutr_response) {
    //        console.log(nutr_response);
    //    });
    //}); 



//$("#find-cocktail").on("click", function(event) {
//    event.preventDefault();
//    var cocktail = $("#cocktail-input").val();

    var cocktail = "bloody mary";

    var queryURL = "https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=" + cocktail;
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        var calories = '';
        var sodium = '';
        var fat = '';
        var carbs = '';
        var sugar = '';
        
        console.log(response);
        var ingredients = ["strIngredient1", "strIngredient2", "strIngredient3", "strIngredient4", "strIngredient5", "strIngredient6", "strIngredient7", "strIngredient8", "strIngredient9", "strIngredient10"];

        for (i = 0; i < ingredients.length; i++) {
            if(response.drinks[0][ingredients[i]] !== null) {
                //console.log(response.drinks[0][ingredients[i]]);
                var ingredient = response.drinks[0][ingredients[i]];
                $("#ingredientCollapse").append("<div>" + ingredient + "</div>");

                // Use ingredient as the input variable and loop it through the nutrition api
                // Add the results to the nutrition section

                var settings = "https://api.nutritionix.com/v1_1/search/" + ingredient + "?results=0:20&fields=item_name,brand_name,item_id,nf_calories,nf_sodium,nf_total_fat,nf_total_carbohydrate,nf_sugars&appId=f15b331a&appKey=5dd831bff3255ac412edcba64b74b1c0";

                var totalCalories = '';
                var totalSodium = '';
                var totalFat = '';
                var totalCarbs = '';
                var totalSugar = '';

                $.ajax(settings).done(function (nutr_response) {

                    //adding up total calories of ingrediants
                    calories = parseFloat(nutr_response.hits[0].fields.nf_calories);
                    totalCalories = +totalCalories + +calories;
                    console.log("Total calories: " + totalCalories);

                    //adding up total sodium of ingrediants
                    sodium = parseFloat(nutr_response.hits[0].fields.nf_sodium);
                    totalSodium = +totalSodium + +sodium;
                    console.log("Total sodium: " + totalSodium);

                    //adding up total fat of ingrediants
                    fat = parseFloat(nutr_response.hits[0].fields.nf_total_fat);
                    totalFat = +totalFat + +fat;
                    console.log("Total fat: " + totalFat);

                    //adding up total carbs of ingrediants
                    carbs = parseFloat(nutr_response.hits[0].fields.nf_total_carbohydrate);
                    totalCarbs = +totalCarbs + +carbs;
                    console.log("Total carbs: " + totalCarbs);

                    //adding up total sugar of ingrediants
                    sugar = parseFloat(nutr_response.hits[0].fields.nf_sugars);
                    totalSugar = +totalSugar + +sugar;
                    console.log("Total sugar: " + totalSugar);
                });
            }
        };
      
    });
//});



});