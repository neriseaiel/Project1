$(document).ready(function () {
   
//     // Initialize Firebase
//     var config = {
//        apiKey: "AIzaSyASQ8jBTorfDSw2R15DJuRl8qXgnxXOAh0",
//        authDomain: "moodfuse-afb60.firebaseapp.com",
//        databaseURL: "https://moodfuse-afb60.firebaseio.com",
//        projectId: "moodfuse-afb60",
//        storageBucket: "moodfuse-afb60.appspot.com",
//        messagingSenderId: "163903846814"
//      };
//      firebase.initializeApp(config);

//  var database = firebase.database();

   $(".buttongreen").on("click", function() {

       $(".results").empty();
       var mood = $(this).attr("data-drink");


   var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php?q=" +
       encodeURIComponent(mood) + "&api_key=1";

       console.log(queryURL);
       $.ajax({
           url: queryURL,
           method: "GET"
         })

         .then(function(response) {
           console.log(response);
           var results = response.drinks;
           console.log(results);
             var randomResult = [Math.floor((Math.random() * results.length))]
             console.log(results[randomResult]);
               // Creating a div with the class "item"
               var drinkDiv = $("<div class='item'>");
 
               var category = results[randomResult].strCategory;
               var ing1 = results[randomResult].strIngredient1;
               var ing2 = results[randomResult].strIngredient2;
               var ing3 = results[randomResult].strIngredient3;
               var drinkName = results[randomResult].strDrink;
 
               
               var cat = $("<p>").text("Category: " + category);
               var ingredient1 = $("<p>").text("Ingredient 1: " + ing1);
               var ingredient2 = $("<p>").text("Ingredient 2: " + ing2);
               var ingredient3 = $("<p>").text("Ingredient 3: " + ing3);
               var title = $("<p>").text("Title: " + drinkName);
 
               // Creating an image tag
               var drinkImage = $("<img>");
 
               // Giving the image tag an src attribute of a proprty pulled off the
               // result item
               console.log(results[randomResult].strDrinkThumb);
               drinkImage.attr("src", results[randomResult].strDrinkThumb);


                   drinkDiv.append(title);
                   drinkDiv.append(ingredient1);
                   drinkDiv.append(ingredient2);
                   drinkDiv.append(ingredient3);
                   drinkDiv.append(cat);
                   drinkDiv.append(drinkImage);

               $("#results").html(drinkDiv);
             
           
         });

       })



   
   $(".review-submit").on("click", function(event){
       event.preventDefault();
       // Grabs user input
       var userEmail = $("#InputEmail").val().trim();
       var userReview = $("#ReviewTextarea").val().trim();

       // Pushing to database
database.ref().push({
   userEmail: userEmail,
   userReview: userReview
});

console.log(userEmail);
console.log(userReview);

// Clears all of the text-boxes
$("#InputEmail").val("");
$("#ReviewTextarea").val("");

   });
// Create Firebase event for adding user email and review to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
   console.log(childSnapshot.val());
 
   // Store everything into a variable.
   var newuserEmail = childSnapshot.val().userEmail;
   var newuserReview = childSnapshot.val().userReview;
   
 
   // User Info
   console.log(newuserEmail);
   console.log(newuserReview);
   
 
 
   // Create the new row
   var newRow = $("<tr>").append(
     $("<td>").text(newuserEmail),
     $("<td>").text(newuserReview),
     
   );
 
   // Append the new row to the table
   $("#review-table > tbody").append(newRow);
 });

   });