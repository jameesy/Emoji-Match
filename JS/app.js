$(document).ready(function() {

  /*
   * Variables
   */

  // To determine the start and end of a move
  var moves_taken = 0;
  var first_move = 0;
  var second_move = 1;
  var total_moves_per_turn = 2;


  // To determine when the game is won
  var card_pairs_matched = 0;
  var total_card_pairs = 8;


  // Moves counter
  var moves_counter = 0;
  var performance_rating = "3 stars";


  // Timer
  var hours = 1;
  var minutes = 1;
  var seconds = 1;
  var timer_start = false;
  var game_timer;


  // Modal
  var modal_element = $('.modal');
  
  var performance_rating_element = $('.performance_rating');
  var time_taken_element = $('.time_taken');
  var moves_taken_element = $('.moves_taken');
  
  var performance_rating_string = "Performance rating: ";
  var time_taken_string = "Time taken: ";
  var moves_taken_string = "Moves taken: ";
  


    /*
     * List of cards (total of 16)
     */
  
    var card_deck = [
      "em em-eggplant",
      "em em-flushed",
      "em em-hankey",
      "em em-nerd_face",
      "em em-peach",
      "em em-rolling_on_the_floor_laughing",
      "em em-heart_eyes",
      "em em-ok_hand",
      "em em-nerd_face",
      "em em-peach",
      "em em-ok_hand",
      "em em-eggplant",
      "em em-rolling_on_the_floor_laughing",
      "em em-heart_eyes",
      "em em-flushed",
      "em em-hankey"];
  
      /*
      * CARDS
      * This code will run when a card is clicked (game functionaility).
      */
  
      $('.card').click(function() {
        /* Code to run if it is the first move in the turn */
        if(moves_taken === first_move) {
          $(this).addClass('open');
          /* First card object and its card type  */
          first_card = $(this);
          first_card_type = $(this).find('i').attr('class');
          /* This allows the program to determine second move from the first */
          moves_taken = moves_taken + 1;
        }

        /* Code to run if it is the second move in the turn */
        else if (moves_taken === second_move) {
          $(this).addClass('open');
          /* Second card object and its card type */
          second_card = $(this);
          second_card_type = $(this).find('i').attr('class');
          /* Colour codes the cards based on whether the cards match or not */
          if (first_card_type === second_card_type) {
            cardMatchSuccess(first_card, second_card);
            /* Code to run when the game is won */
            if (card_pairs_matched === total_card_pairs) {
              gameCompleted();
            };
          } else if (first_card_type !== second_card_type) {
            cardMatchFail(first_card, second_card);
          };
          /* This resets moves_taken so it is the first move again **/
          moves_taken = 0;
        };
      });
  
      /*
      * CARD MATCH SUCCESSFUL
      * Function to be called when cards successfully match.
      */

      function cardMatchSuccess(first_card, second_card) {
        first_card.addClass('match');
        first_card.addClass('animated tada');
        second_card.addClass('match');
        second_card.addClass('animated tada');
        card_pairs_matched = card_pairs_matched + 1;
        moves_counter = moves_counter + 1;
        moveCounter(moves_counter);
      }
  
      /*
      * CARD MATCH UNSUCCESSFUL
      * Function to be called when cards do not match.
      */

      function cardMatchFail(first_card, second_card) {
        first_card.addClass('animated shake');
        first_card.addClass('not-a-match');
        second_card.addClass('animated shake');
        second_card.addClass('not-a-match');
        moves_counter = moves_counter + 1;
        /** Flips incorrect cards back */
        flipCards(first_card, second_card);
        moveCounter(moves_counter);
      }
  
      /*
      * CARD FLIP
      * Function to be called when a card match is unsuccessful.
      */

      function flipCards(first_card, second_card) {
        setTimeout(function(){
              first_card.removeClass('not-a-match open');
              first_card.removeClass('animated shake');
              second_card.removeClass('not-a-match open');
              second_card.removeClass('animated shake');
        },1000);
      };
  
      /*
      * MOVE COUNTER
      * This function is called after every turn.
      */

      function moveCounter(moves_counter){
        /** Counts the number of moves the player has taken */
        if(moves_counter > 1) {
          $('.score-panel').find('.moves').text(moves_counter);
          $('.moves_text').text("Moves");
        } else if (moves_counter === 1) {
          $('.score-panel').find('.moves').text(moves_counter);
          $('.moves_text').text("Move");
        };
  
        /* STAR RATING
        * This function will be called depending on the total moves.
        */

        if (moves_counter === 20) {
          $('#first-star').removeClass('fa-star').addClass('fa-star-o');
          performance_rating = "2 stars";
        } else if (moves_counter === 30) {
          $('#second-star').removeClass('fa-star').addClass('fa-star-o');
          performance_rating = "1 star";
        } else if (moves_counter === 40) {
          $('#third-star').removeClass('fa-star').addClass('fa-star-o');
          performance_rating = "0 stars";
        }
      };
  
      /*
      * GAME WON
      * Function to be called when the game is won.
      */

      function gameCompleted() {
        // Ends the game timer once it is finished.
        clearInterval(game_timer);
        timer_start = false;
        // Opens the modal
        modal_element.css('display', 'block');
        // Modal content
        performance_rating_element.text(performance_rating_string + performance_rating);
        time_taken_element.text(time_taken_string + $('.hours').text() +
         $('.colon_one').text() +
         $('.minutes').text() +
         $('.colon_two').text() +
         $('.seconds').text());
        moves_taken_element.text(moves_taken_string + moves_counter);
  
        // Restarts the game
        $('.play_again_button').click(function() {
          restartGame();
          modal_element.css('display', 'none');
        });
  
      };
  
      /*
      * TIMER
      * This code will run as soon as the game begins and lasts until it ends. 
      */

      $('.card').click(function() {
        if (timer_start === false) {
          timer();

          timer_start = true;
        }
      });
  
      function timer() {
        game_timer = setInterval(function() {
            // Seconds timer
            if(seconds < 60) {
              $('.seconds').text(seconds + "s");
              seconds = seconds + 1;
            }
            // Minutes timer
            else if (seconds === 60) {
              $('.minutes').css('visibility', 'visible');
              $('.colon_two').css('visibility', 'visible');
              seconds = 0;
              $('.seconds').text(seconds + "s");
              $('.minutes').text(minutes + "m");
              minutes = minutes + 1;
              seconds = seconds + 1;
            };
          }, 1000);
      };
  
      /*
      * RESTART BUTTON
      * This code will restart the game.
      */

      $('.restart').click(function() {
        restartGame();
      });
  
      // Function responsible for restarting the game
      function restartGame() {


        /*
         * Game board
         */

        // Returns all cards and scores back to the default state.
        $('.card').removeClass('open match');
        moves_taken = 0;
        card_pairs_matched = 0;
        performance_rating = "3 stars";
  
        /* Timer */
        clearInterval(game_timer);
        seconds = 0;
        minutes = 0;
        hours = 0;
        $('.colon_one').css('visibility', 'hidden');
        $('.minutes').css('visibility', 'hidden');
        $('.colon_two').css('visibility', 'hidden');
        $('.hours').css('visibility', 'hidden');
        $('.seconds').text(seconds + "s");
        $('.minutes').text(minutes);
        $('.hours').text(hours);
        timer_start = false;
  
        /* Moves counter */
        moves_counter = 0;
        $('.score-panel').find('.moves').text(moves_counter);
  
        /* Star rating */
        $('#first-star').removeClass('fa-star-o').addClass('fa-star');
        $('#second-star').removeClass('fa-star-o').addClass('fa-star');
        $('#third-star').removeClass('fa-star-o').addClass('fa-star');
  
        /* Shuffles all the cards */
        shuffle(card_deck);
        var shuffled_deck = card_deck;
  
        // Assigns new class values to each card - not currently working
        $('#card_1').removeClass().addClass(shuffled_deck[0]);
        $('#card_2').removeClass().addClass(shuffled_deck[1]);
        $('#card_3').removeClass().addClass(shuffled_deck[2]);
        $('#card_4').removeClass().addClass(shuffled_deck[3]);
        $('#card_5').removeClass().addClass(shuffled_deck[4]);
        $('#card_6').removeClass().addClass(shuffled_deck[5]);
        $('#card_7').removeClass().addClass(shuffled_deck[6]);
        $('#card_8').removeClass().addClass(shuffled_deck[7]);
        $('#card_9').removeClass().addClass(shuffled_deck[8]);
        $('#card_10').removeClass().addClass(shuffled_deck[9]);
        $('#card_11').removeClass().addClass(shuffled_deck[10]);
        $('#card_12').removeClass().addClass(shuffled_deck[11]);
        $('#card_13').removeClass().addClass(shuffled_deck[12]);
        $('#card_14').removeClass().addClass(shuffled_deck[13]);
        $('#card_15').removeClass().addClass(shuffled_deck[14]);
        $('#card_16').removeClass().addClass(shuffled_deck[15]);
  
        };
  
  
    /*
     * Display the cards on the page
     *   - shuffle the list of cards using the provided "shuffle" method below
     *   - loop through each card and create its HTML
     *   - add each card's HTML to the page
     */
  
    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
  
  
        var currentIndex = array.length, temporaryValue, randomIndex;
  
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
  
        return array;
    }
  
  });
  