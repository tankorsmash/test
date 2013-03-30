//inspired by http://benogle.com/2009/04/20/jquery-pong.html
function Game() {

    // function movePlayer(plr, offset) {

    //     current_y = getElemCoord(plr, 'y', 'a');
    //     new_y = current_y + offset;
    //     if (new_y > 0 && new_y < limit_y - parseInt(plr.css('height')) ){
    //         console.log("new y"+ new_y);
    //         setPlayerY(plr, new_y);
    //     }
    //     else {alert("no dice")}

    // };

    function setPlayerY(plr, y) {

        plr.css('top', y);
    };

    function moveElem(elem, offset_x, offset_y) {

        //four single points used for collisions
        current_left_x = getElemCoord(elem, 'x', 'a');
        current_right_x = getElemCoord(elem, 'x', 'b');
        current_top_y = getElemCoord(elem, 'y', 'a');
        current_bot_y = getElemCoord(elem, 'y', 'b');

        //potentially the next set of points that the elem will 
        // be using
        new_left_x = offset_x + current_left_x;
        new_right_x = offset_x + current_right_x;
        new_top_y = offset_y + current_top_y;
        new_bot_y = offset_y + current_bot_y;


        //check the element against the play area boundaries
        if (validateCoord(new_left_x, 'x') != true || validateCoord(new_right_x, 'x') != true) {
            //someone scored
            if (new_left_x < 0) {
                scorePoint(player2, 1);
            }
            else {
                scorePoint(player1, 1);
            }
        }
        else if (validateCoord(new_top_y, 'y') != true || validateCoord(new_bot_y, 'y') != true) {
            //ball hit a wall so reverse vertical direction
            reverse_y = true;

            setBallCoords(ball, new_left_x, new_top_y);

        }

        //since the balls still in a valid area, check to see if its bounced
        //against paddles
        else if (elem === ball){
            //player1 paddle right side

            // make sure the new_left_x, the balls.css(left) value is both
            // within the x and y axes. It adjusts the size of the bounding box
            // to allow for only portions of the ball to get hit by the paddle
            //           check leftmost point is further than the paddles rightmost point
            if(( (new_left_x  < getElemCoord(player1,'x','b')) &&
                        //topmost point of the ball is less than the paddle's bottom point
                        new_top_y < getElemCoord(player1, 'y', 'b') &&
                        //topmost point of the ball is greater than the paddle's
                        //top, plus a little leeway for overlap in case of
                        //incomplete collision
                        new_top_y > (getElemCoord(player1, 'y', 'a') - parseInt(ball.css('height')))) ||
                    //do all the equivalent checks for the bottom of the paddle
                    //instead of the top of the paddle
                    (new_left_x < getElemCoord(player1, 'x', 'b') &&
                     new_bot_y > getElemCoord(player1, 'y', 'a') && 
                     (new_bot_y < getElemCoord(player1, 'y', 'a') + parseInt(ball.css('height'))))){
                // alert('bounce off player1');
                reverse_x = true;
                setBallCoords(ball, new_left_x, new_top_y);
            }
            //TODO: Eliminate repetition

            //checks the same as above, but for player2
            else if(( new_right_x  > getElemCoord(player2,'x','a') &&
                        new_top_y < getElemCoord(player2, 'y', 'b') &&
                        new_top_y > (getElemCoord(player2, 'y', 'a') - parseInt(ball.css('height')))
                    ) ||
                    (new_right_x > getElemCoord(player2, 'x', 'a') &&
                     new_bot_y > getElemCoord(player2, 'y', 'a') && 
                     (new_bot_y < getElemCoord(player2, 'y', 'b') + parseInt(ball.css('height')))
                    )){
                reverse_x = true;
                setBallCoords(ball, new_left_x, new_top_y);
            }

            else{
                setBallCoords(ball, new_left_x, new_top_y);
            }
        }

        else {
            setBallCoords(ball, new_left_x, new_top_y);
        }
    }



    //scores a point for the given player and increments the necessary fields
    function scorePoint(plr, points) {

        // reset the ball to the middle of the table
        setBallCoords(ball, limit_x /2, limit_y /2);

        // console.log(plr);
        // gets the class of the plr object, expecting player1 or player2
        player = plr.get()[0].className;
        player_score[player] += 1;

        //update the html of the page with the new score
        $('input#id_'+player+'_score').val(player_score[player]);

        //flip the ball's direction around so the scorer doesn't have the
        //advantage
        reverse_x = true;


        //check for scores against the game limit, default 5
        for (player in player_score){
            if (player_score[player] >= score_limit){
                gameOver();
                break;
            }
        }
    };


    function gameOver(){

        //random selection of flavour text
        alert(player + ", " + randomItemFromList(flavour_win));

        // $(document).focus();
        pauseGame(null, false);
        
    };


    //returns a random item from the list
    function randomItemFromList(a_list){

        rand_index = Math.floor((Math.random()*a_list.length));
        chosen_string = a_list[rand_index];

        return chosen_string;
    };

    function validateCoord(coord, x_or_y) {

        if (x_or_y === 'x') {
            // alert('x testing');
            // console.log(coord);
            // console.log(limit_x);
            if (coord < 0 || coord > limit_x) {
                // alert('x false');
                return false;
            }
            // else {
            //     return true;}
        }
        else if (x_or_y === 'y') {
            // console.log(coord);
            // console.log(limit_y);
            if (coord < 0 || coord > limit_y) {
                // console.log('y false');
                return false;
            }
            // else {
            //     return true;}
        }

        return true;
    }


    function setBallCoords(ball, x, y) {

        ball.css('top', y);
        ball.css('left', x);

    };

    //returns a single point out of the four following points:
    // leftmost, topmost, bottommost, rightmost, which looks a little like:
    //      ya
    //   xa    xb
    //      yb     
    // where 'y' is the x_or_a arg and 'a' is the a_or_b arg
    function getElemCoord(elem, x_or_y, a_or_b) {

        if (x_or_y === "y") {
            coord = parseInt(elem.css('top'));
            //get top of the object
            if (a_or_b === 'a') {
                coord;
            }
            //get bottom side coord
            else {
                coord += parseInt(elem.css('height'));
                // console.log('height' + coord);
            }
        }
        else {
            coord = parseInt(elem.css('left'));
            //get left side coord
            if (a_or_b === 'a') {
                coord;
            }
            //get most right side coord
            else {
                coord += parseInt(elem.css('width'));
            }
        }
        return coord;
    }

    function Update() {

        moveElem(ball, x_offset * game_speed, y_offset * game_speed);
        if (reverse_y === true) {
            y_offset *= -1;
            reverse_y = false;
        }
        if (reverse_x === true) {
            x_offset *= -1;
            reverse_x = false;
        }

        //update scores
        score_p1.text(player_score.player1);
        score_p2.text(player_score.player2);

        updateBallCss(ball);
        //create a Timeout and add it to the list so we can pause and unpause at
        //anytime
        timeouts.push(setTimeout(function () { Update() }, 16));
    };

    function updateBallCss(ball){
        //a little flourish on the ball, round the corners of the ball depending
        //on the direction its heading

        //reset radius
        ball.css('border-radius', '0px');

        //determine which side of the ball will be rounded based on the
        //direction of the ball
        var left_or_right = "";
        if (x_offset < 0){
            left_or_right = "left";
        }
        else {
            left_or_right = "right";
        }
        //apply the css based on the left_or_right  var
        var top_css = 'border-top-'+left_or_right+ '-radius';
        var bottom_css = 'border-bottom-'+left_or_right+ '-radius';
        var ball_radius = '10px'
            ball.css(top_css, ball_radius);
        ball.css(bottom_css, ball_radius);

    };

    function KeyHandler(e){

        //if the game isn't paused, move the players' paddles
        if (game_paused === false){
            //deal with player1's keys
            if (e.keyCode in player1_keys ){
                var current_y = getElemCoord(player1, 'y', 'a');
                var new_y =  current_y +key_translation[player1_keys[e.keyCode]] ;
                if (isValidPaddleY(player1, new_y)){
                // if (new_y > 0 && new_y < limit_y - parseInt(player1.css('height')) ){
                    console.log("new y"+ new_y);
                    setPlayerY(player1, new_y);
                }
            }
            //and also deal with player2's keys
            // although since I'm using $.keypress and not $.keydown, which means I
            // don't have a global variable in place to determine whether or not the 
            // player is moving or not, only one player can move at once. A pretty
            // big issue.
            if (e.keyCode in player2_keys){
                var current_y = getElemCoord(player2, 'y', 'a');
                var new_y =  current_y +key_translation[player2_keys[e.keyCode]] ;
                if (isValidPaddleY(player2, new_y)){
                setPlayerY(player2, new_y);
                };
            }
        }

        //regardless if the game is pause, the Spacebar restarts the game
        //without submitting the match data
        if (e.keyCode === 114){ //spacebar
            restartGame();
        };
    };

    function isValidPaddleY(plr, new_y){
        // var current_y = getElemCoord(player1, 'y', 'a');
        if (new_y > 0 && new_y < limit_y - parseInt(plr.css('height')) ){
            return true;
        };
    };

    //resets the ball location, the score, and the timeout list
    function restartGame(){
        player_score = {'player1' : 0, 'player2' : 0};
        $('input#id_'+player+'_score').val(player_score[player]);

        setBallCoords(ball, limit_x / 2, limit_y / 2);
    };


    function pauseGame(e, verbose){

        // alert('pause game loudly');

        //save the old offsets
        if (game_paused != true){
            old_x_offset = x_offset;
            old_y_offset = y_offset;
        };

        x_offset = 0;
        y_offset = 0;

        game_paused = true;

        //if the verbose param isn't set, use true
        verbose =  typeof(verbose) !== 'undefined' ? verbose : true;

        if (verbose === true){
            alert_string = randomItemFromList(flavour_pause);
            // alert('The game is paused, click the unpause');
            console.log(alert_string);
        };
        //foreach timeout in the list, clearTimeout so there's no more pending
        //updates. essentially pauses the game
        for (var i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        //reset to empty
        timeouts =[]
    };

    function unpauseGame(e){

        game_paused = false;

        //reset the ball's velocity
        x_offset = old_x_offset;
        y_offset = old_y_offset;

        // alert('unpause');
        //don't want to create more than one Update timeout, so I check if
        //there's at least one in the list already, if so, no need to unpause
        if (timeouts.length === 0){
            Update();
        }

        console.log('unpause');
    };


    function Start() {

        // console.log($(this));

        //represents the player and ball objects 
        //TODO: insert via jquery.after() instead of hardcode
        player1 = $($('.player1')[0]);
        player2 = $($('.player2')[0]);
        ball = $($('.ball')[0]);

        //score limits and score string elements
        score_limit = 1;
        score_p1 = $($('.score_p1')[0]);
        score_p2 = $($('.score_p2')[0]);

        //game speed, avoid setting higher than 2
        game_speed = 2;
        game_paused = false;
        x_offset = -3;
        y_offset = 2;

        //size of the play_area 
        limit_x = parseInt($($('.play_area')[0]).css('width'));
        limit_y = parseInt($($('.play_area')[0]).css('height'));

        //whether the ball's trajectory  needs to be reversed, ie wall/paddle collision
        reverse_x = false;
        reverse_y = false;


        //controls
        player1_keys = { 119 : 'up', //w
            115 : 'down'}; //s

        player2_keys = { 56 : 'up' , //KP_8
            53 : 'down'}; //KP_5

        key_translation = {'up' : -20,
            'down' : 20};

        //scoring record
        player_score = {'player1' : 0, 'player2' : 0};

        //keep track of the timeouts so that we can pause and unpause later
        timeouts = [];
        //              update the game every 50ms. 16.6 is 60fps
        timeouts.push(setTimeout(function () { Update() }, 32));

        //flavour text
        flavour_win = ['you\'ve won!', 'you did it!', 'you\'re the best!',
                    'a Winner is you! It\'s a secret to everybody!'];
        flavour_pause = ['The game is paused', 'Think we can get back to this?',
                      'Is it because you\'re losing?', 'I\'m ready to win, let\'s go!'];


        // console.log('done start');

        $("#pong_game").ready(function(){

            //associates the function KeyHandler with keypresses
            $("#pong_game").keypress(KeyHandler);

            //sets up the pause/unpause based on whether or not the game has
            //focus
            $("#pong_game").focusout(pauseGame);
            $("#pong_game").click(unpauseGame);


        });

        console.log('game start');
    }

    Start();
    console.log('game start post');
};


$(document).ready(function () {

    var game_started = false;
    $("#pong_game").on("click", function (e) {

        if (game_started != true) {
            Game();
            game_started = true;
        }
        else{
            // alert('game already running');
            console.log('game already running');
        };


    })
});
