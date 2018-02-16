// Author: Cassandra Henderson
// Purpose: Javascript to run specific functions within the Crystal Collector game

    // jQuery to set the document/ DOM
    $(document).ready(function() {


    var startNum = 0;
    var randomNum = getRandomNum();

    // Status Variables
    var win = 0;
    var loss = 0;
    var crystals;

  // Generate random values for each crystal
  function randomNumCrystals() {
    // Crystals array
    return {
      Crystal_red: {
        points: Math.floor(Math.random() * 6) + 2,
        imageUrl: "assets/images/Crystal_red.jpg"
      },
      Crystal_yellow: {
        points: Math.floor(Math.random() * 6) + 2,
        imageUrl: "assets/images/Crystal_yellow.jpg"
      },
      Crystal_blue: {
        points: Math.floor(Math.random() * 6) + 2,
        imageUrl: "assets/images/Crystal_blue.jpg"
      },
      Crystal_green: {
        points: Math.floor(Math.random() * 6) + 2,
        imageUrl: "assets/images/Crystal_green.jpg"
      }
    };
  }  

  // Create a random number to compare against
  function getRandomNum() {
    return Math.floor(Math.random() * 102) + 19;
  }  

  // Function: Reset
    function resetGame() {

      startNum = 0;
      crystals = randomNumCrystals();

      randomNum = getRandomNum();
      $("#random-section").text(randomNum);
    }



  // Function UpdateDom
  function updateDom(winStatus) {
    $("#win-section").empty();


    if (winStatus === true) {

      $("#win-section").append($("<p>").text("Congrats. You won!!"));
      resetGame();
      renderStartNumber();
    }

    else if (winStatus === false) {

      $("#win-section").append($("<p>").text("Sorry. You lost"));
      resetGame();
      renderStartNumber();

    }

    // Show winLoss counts on DOM
    var wSpan = $("<span>").text(win);
    var lSpan = $("<span>").text(loss);

    var pWins = $("<p>").text("Wins: ");
    var pLosses = $("<p>").text("Losses: ");

    pWins.append(wSpan);
    pLosses.append(lSpan);

    $("#win-section").append(pWins);
    $("#win-section").append(pLosses);
  }


  // Function to render our crystals to the DOM.
  function renderCrystals() {
    for (var key in crystals) {
      var crystalDiv = $("<div class='crystals-button' data-name='" + key + "'>");
      var crystalImg = $("<img alt='image' class='crystal-img'>").attr("src", crystals[key].imageUrl);
      crystalDiv.append(crystalImg);
      $("#crystal-block").append(crystalDiv);
    }
  }

  // Notes from Solution File: Function to update our "current guess" number. We are passing in the crystal that was clicked as an argument.
  function updateStartNumber(crystal) {
    // Update our "current guess" number based on which crystal was clicked.
    startNum += crystals[crystal.attr("data-name")].points;
  }

  // Function that will render your "current guess" number to the page.
  function renderStartNumber() {
    var scoreNumDiv = $("<div id='score-number'>").text(startNum);
    $("#score-block").html();
    $("#score-block").html(scoreNumDiv);
  }

  // Call our functions to start the game!
  resetGame();
  updateDom();    
  renderCrystals();

  renderStartNumber();



  // Here we create an on.click event for the crystals.
  $(".crystals-button").on("click", function(event) {
    // Update our "current guess" number and re-render it.
    updateStartNumber($(this));
    renderStartNumber();

    // Check to see if we have won or lost.
    // If our current guess number equals the target number..
    if (startNum === randomNum) {
      // Increment wins, restart the game, and update the page.
      win++;
      resetGame();
      updateDom(true);
    }

    // If our guess number exceeded our target number...
    else if (startNum > randomNum) {
      // Increment losses, restart the game, and update the page.
      loss++;
      resetGame();
      updateDom(false);
    }
  });

});
