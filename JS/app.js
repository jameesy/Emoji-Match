/*
 * Create a list that holds all of your cards
 */





(function () {
  var list = [
    "em em-flushed",
    "em em-flushed",
    "em em-hankey",
    "em em-hankey",
    "em em-eggplant",
    "em em-eggplant",
    "em em-nerd_face",
    "em em-nerd_face",
    "em em-peach",
    "em em-peach",
    "em em-rolling_on_the_floor_laughing",
    "em em-rolling_on_the_floor_laughing",
    "em em-ok_hand",
    "em em-ok_hand",
    "em em-heart_eyes",
    "em em-heart_eyes"
  ];


  // Shuffle the list of cards function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // Loop through each card and create its HTML <li> after the initial shuffle.
  function addList(list) {
    for (var i = 0; i < list.length; i++) {
      $("#cards").append("<li class='card'><i class='fa " + list[i] + "'></i></li>");
    }
  }

  function resetGame(theTimer) {
    $(".fa-repeat").click(function () {
      $("ul#cards").children().remove("li"); // RESET CRAD
      $(".stars").children().remove("li");
      $(".stars").append("<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>"); // RESET stars
      $(".moves").text("0"); // RESET Moves
      clearInterval(theTimer);
      $("#timer").text("0.000"); // RESET timer
      startGame();
    });
  }

  function scoreRatings(moves, matched, theTimer, finishedTime) {
    var allStars = $(".stars");

    if (matched === 8) {
      $("#timer").text(finishedTime);
      clearInterval(theTimer);

      setTimeout(function () {
        alert("Congratulations!", "You've won the game!");
        alert("You've made " + moves + " moves and took a total of " + finishedTime + " sec to finish this game.\nYour rating is " + $(".fa-star").length + " out of a 3-star rating!");
        if (confirm("Do you want to play again?") === true) {
          $(".fa-repeat").click(); // Click reset
        } else {
          alert("Thanks for playing Emoji Match!");
        }


      }, 500);

    } else {
      if ((moves > 12) && (moves <= 15)) {
        allStars.children().remove("li");
        allStars.append("<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star-o'></i></li>"); // Two stars
      } else if (moves > 17) {
        allStars.children().remove("li");
        allStars.append("<li><i class='fa fa-star'></i></li><li><i class='fa fa-star-o'></i></li><li><i class='fa fa-star-o'></i></li>"); // A star
      }
    }
  }




  function startGame() {
    list = shuffle(list);
    addList(list);

    // Initial parameters
    var previousCardSelector = "";
    var previousCardIcon = "";
    var moveCounter = 0;
    var cardSelected = false;
    var timer = 0;
    var theTimer;
    var matched = 0;
    var finishedTime = 0;

    $(".card").on("click", function () {
      timer++; // This will activate the timer/stopwatch
      var currentCard = $(this).attr("class");
      var currentCardIcon = $(this).children().attr("class");

      // Card matching logics and set up the event listener for a card. If a card is clicked
      if (currentCard === "card") {
        if ((currentCardIcon === previousCardIcon) && (cardSelected === true)) {
          //if both cards matched, lock the cards in the open position 
          $(this).addClass("match");
          previousCardSelector.removeClass("open show").addClass("match");
          cardSelected = false;
          matched++;
          moveCounter++;

        } else if ((cardSelected === true)) {
          // if the cards do not match, lock the cards in the open position and disable opening others card. Then, remove the cards from the list, hide the card's symbol and reactive ability to click others card.
          $(this).addClass("open show");
          $(".card").addClass("disabled");
          setTimeout(function () {
            $(".open.show").removeClass("open show");
            $(".card").removeClass("disabled");
          }, 800);
          cardSelected = false;
          moveCounter++;

        } else {
          // Default click and show the card
          $(this).addClass("open show");
          previousCardIcon = currentCardIcon;
          previousCardSelector = $(this);
          cardSelected = true;
        }

        // Updating move count to web pages
        $(".moves").text(moveCounter);

        // Ratings from 3 stars to 1 stars
        scoreRatings(moveCounter, matched, theTimer, finishedTime);

        // TIMER function
        if (timer === 1) {
          var startTime = Date.now();
          theTimer = setInterval(function () {
            var elapsedTime = Date.now() - startTime;
            finishedTime = (elapsedTime / 1000).toFixed(3);
            $("#timer").text(finishedTime);
          }, 44);

        }

        // RESET FUNCTION 
        resetGame(theTimer);
      }

    });
  }

  startGame();

}());