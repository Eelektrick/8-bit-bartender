$(document).ready(function(){

    myLoad();

    var initialCocktail = $("#fav-1").text();
    searchCocktail(initialCocktail);

    var allCollapsibles = $('.collapsible');
    allCollapsibles.collapsible();

    var instance = M.Collapsible.getInstance(allCollapsibles);
    instance.open(0);

    // Add current date & time to top of the page
    var headerTime = moment().format('LLLL');
    console.log(headerTime);

    //operate clock
    timedUpdate();

    //update clock every second
    function timedUpdate () {
        updateClock();
        setTimeout(timedUpdate, 1000);
    }

    //clock set up function
    function updateClock(){
        var now = moment(),
            second = now.seconds() * 6,
            minute = now.minutes() * 6 + second / 60,
            hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;

        $('#hour').css("transform", "rotate(" + hour + "deg)");
        $('#minute').css("transform", "rotate(" + minute + "deg)");
        $('#second').css("transform", "rotate(" + second + "deg)");
    }

    // Search for cocktail if you click search button
    $("#find-cocktail").on("click", function(event) {
        event.preventDefault();
        var cocktail = $("#cocktail-input").val();
        searchCocktail(cocktail);
    });

    // Update city if you click a previous city
    $(".favBtn").on("click", function(event) {
        event.preventDefault();
        console.log("this is this: " + this)
        var cocktail = $(this).text();

        console.log("this is this's text: " + cocktail)

        searchCocktail(cocktail);
    });

    // Update city if you hit enter
    $(document).on('keypress',function(e) {
        if(e.which == 13) {
        var cocktail = $("#cocktail-input").val();
        };
    });

    //search cocktail and get ingredients and total nutritions
    function searchCocktail(cocktail) {    
        
        //test cocktail before adding click function
        //var cocktail = "bloody mary";

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

            var totalCalories = '';
            var totalSodium = '';
            var totalFat = '';
            var totalCarbs = '';
            var totalSugar = '';

            //append nutrition text to know what the totals are for what
            $("#nutritionCollapse").empty();
            $("#nutritionCollapse").append("<div><span>Calories: </span><span id='calories'></span></div>");
            $("#nutritionCollapse").append("<div><span>Sodium: </span><span id='sodium'></span><span>mg</span></div>");
            $("#nutritionCollapse").append("<div><span>Fat: </span><span id='fat'></span><span>g</span></div>");
            $("#nutritionCollapse").append("<div><span>Carbs: </span><span id='carbs'></span><span>g</span></div>");
            $("#nutritionCollapse").append("<div><span>Sugar: </span><span id='sugar'></span><span>g</span></div>");
            
            console.log(response);
            var ingredients = ["strIngredient1", "strIngredient2", "strIngredient3", "strIngredient4", "strIngredient5", "strIngredient6", "strIngredient7", "strIngredient8", "strIngredient9", "strIngredient10"];

            $("#ingredientCollapse").empty();

            for (i = 0; i < ingredients.length; i++) {
                if(response.drinks[0][ingredients[i]] !== null) {
                    //console.log(response.drinks[0][ingredients[i]]);
                    var ingredient = response.drinks[0][ingredients[i]];
                    $("#ingredientCollapse").append("<div>" + ingredient + "</div>");

                    // Use ingredient as the input variable and loop it through the nutrition api
                    // Add the results to the nutrition section

                    var settings = "https://api.nutritionix.com/v1_1/search/" + ingredient + "?results=0:20&fields=item_name,brand_name,item_id,nf_calories,nf_sodium,nf_total_fat,nf_total_carbohydrate,nf_sugars&appId=19cc9746&appKey=f06183043499d8d4f23b6355482baa72";

                    $.ajax(settings).done(function (nutr_response) {

                        console.log(nutr_response);

                        //adding up total calories of ingrediants
                        calories = parseFloat(nutr_response.hits[0].fields.nf_calories);
                        if (nutr_response.hits[0].fields.nf_calories === null) {
                            totalCalories = +totalCalories + +0;
                        } else {
                            totalCalories = +totalCalories + +calories;
                        }
                        //console.log("Total calories: " + totalCalories);

                        //adding up total sodium of ingrediants
                        sodium = parseFloat(nutr_response.hits[0].fields.nf_sodium);
                        if (nutr_response.hits[0].fields.nf_sodium === null) {
                            totalSodium = +totalSodium + +0;
                        } else {
                            totalSodium = +totalSodium + +sodium;
                        }
                        //console.log("Total sodium: " + totalSodium);

                        //adding up total fat of ingrediants
                        fat = parseFloat(nutr_response.hits[0].fields.nf_total_fat);
                        if (nutr_response.hits[0].fields.nf_total_fat === null) {
                            totalFat = +totalFat + +0;
                        } else {
                            totalFat = +totalFat + +fat;
                        }
                        //console.log("Total fat: " + totalFat);

                        //adding up total carbs of ingrediants
                        carbs = parseFloat(nutr_response.hits[0].fields.nf_total_carbohydrate);
                        if (nutr_response.hits[0].fields.nf_total_carbohydrate === null) {
                            totalCarbs = +totalCarbs + +0;
                        } else {
                            totalCarbs = +totalCarbs + +carbs;
                        }
                        //console.log("Total carbs: " + totalCarbs);

                        //adding up total sugar of ingrediants
                        sugar = parseFloat(nutr_response.hits[0].fields.nf_sugars);
                        if (nutr_response.hits[0].fields.nf_sugars === null) {
                            totalSugar = +totalSugar + +0;
                        } else {
                            totalSugar = +totalSugar + +sugar;
                        }
                        //console.log("Total sugar: " + totalSugar);
                        
                        $("#calories").text(totalCalories.toFixed(0));
                        $("#sodium").text(totalSodium.toFixed(0));
                        $("#fat").text(totalFat.toFixed(0));
                        $("#carbs").text(totalCarbs.toFixed(0));
                        $("#sugar").text(totalSugar.toFixed(0));
                        
                    });

                }
            };
        
        });
    };


    // save favorites
    $("#saveBtn").on("click", function() {
        searchbar = $("#cocktail-input").val();
        mySave(searchbar);

        console.log("searchbar 1: " + searchbar);
    });

    //Save Function
    function mySave(searchbar) {

        console.log("searchbar 2: " + searchbar);

        //moves save down after new one

        localStorage.removeItem("2");
        var move1 = localStorage.getItem("1");
        localStorage.setItem("2", move1);
        var move0 = localStorage.getItem("0");
        localStorage.setItem("1", move0);
        localStorage.setItem("0", searchbar)
        myLoad();
    }

    function myLoad() {
        if (localStorage.getItem("0") === null) {
            $("#fav-1").text("");
            $("#fav-1").attr("style", "height:44px;");
        } else {
            $("#fav-1").text(localStorage.getItem("0"));
        }

        if (localStorage.getItem("1") === null) {
            $("#fav-2").text("");
            $("#fav-2").attr("style", "height:44px;");
        } else {
            $("#fav-2").text(localStorage.getItem("1"));
        } 

        if (localStorage.getItem("2") === null) {
            $("#fav-3").text("");
            $("#fav-3").attr("style", "height:44px;");
        } else {
            $("#fav-3").text(localStorage.getItem("2"));
        } 
    };
});