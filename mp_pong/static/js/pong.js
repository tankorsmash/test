//inspired by http://benogle.com/2009/04/20/jquery-pong.html
function Game() {

    function movePlayer(plr, offset) {

        current_y = getElemCoord(plr, 'y', 'a');
        new_y = current_y + offset;
        setPlayerY(plr, new_y);

    };

    function setPlayerY(plr, y) {

        plr.css('top', y);
    };

    function moveElem(elem, offset_x, offset_y) {

        current_left_x = getElemCoord(elem, 'x', 'a');
        current_right_x = getElemCoord(elem, 'x', 'b');
        current_top_y = getElemCoord(elem, 'y', 'a');
        current_bot_y = getElemCoord(elem, 'y', 'b');

        new_left_x = offset_x + current_left_x;
        new_right_x = offset_x + current_right_x;
        new_top_y = offset_y + current_top_y;
        new_bot_y = offset_y + current_bot_y;




        //check the element against the play area boundaries
        if (validateCoord(new_left_x, 'x') != true || validateCoord(new_right_x, 'x') != true) {
            //someone scored
            alert('scored');
            if (coord < 0) {
                scorePoint(player1, 1);
            }

            else {
                scorePoint(player2, 1);
            }
        }
        else if (validateCoord(new_top_y, 'y') != true || validateCoord(new_bot_y, 'y') != true) {
            //ball hit wall, reverse vertical direction
            console.log('hit wall');

            reverse_y = true;
            // new_top_y = current_top_y + offset_y;
            setBallCoords(ball, new_left_x, new_top_y);

        }

        //since the balls still in a valid area, check to see if its bounced
        //against paddles
        else if (elem === ball){
            //player1 paddle right side

            //if between player1's height
            if(( (new_left_x  < getElemCoord(player1,'x','b')) &&
                        new_top_y < getElemCoord(player1, 'y', 'b') &&
                        new_top_y > (getElemCoord(player1, 'y', 'b') - parseInt(ball.css('height')))) ||
                    (new_left_x < getElemCoord(player1, 'x', 'b') &&
                     new_bot_y > getElemCoord(player1, 'y', 'a') && 
                     (new_bot_y < getElemCoord(player1, 'y', 'a') + parseInt(ball.css('height'))))){
                alert('bounce off player1');
                reverse_x = true;
                setBallCoords(ball, new_left_x, new_top_y);
            }

            else{
                // alert('else');
                setBallCoords(ball, new_left_x, new_top_y);
            }

        }

        else {
            setBallCoords(ball, new_left_x, new_top_y);
        }
    }



    function scorePoint(plr, points) {
        alert('score!');
        setBallCoords(ball, 200, 200);
    }

    function validateCoord(coord, x_or_y) {

        if (x_or_y === 'x') {
            // alert('x testing');
            console.log(coord);
            console.log(limit_x);
            if (coord < 0 || coord > limit_x) {
                alert('x false');
                return false;
            }
            // else {
            //     return true;}
        }
        else if (x_or_y === 'y') {
            console.log(coord);
            console.log(limit_y);
            if (coord < 0 || coord > limit_y) {
                console.log('y false');
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
                console.log('height' + coord);
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

        // movePlayer(player1, 5);


        moveElem(ball, x_offset, y_offset);
        if (reverse_y === true) {
            y_offset *= -1;
            reverse_y = false;
        }
        if (reverse_x === true) {
            x_offset *= -1;
            reverse_x = false;
        }

        setTimeout(function () { Update() }, 3);
    };

    function Start() {

        player1 = $($('.player1')[0]);
        player2 = $($('.player2')[0]);

        ball = $($('.ball')[0]);
        x_offset = -1;
        y_offset = 5;

        limit_x = parseInt($($('.play_area')[0]).css('width'));
        limit_y = parseInt($($('.play_area')[0]).css('height'));

        reverse_x = false;
        reverse_y = false;

        movePlayer(player1, 5);

        setTimeout(function () { Update() }, 50);

        console.log('done start');
        console.log($(this));

    }

    Start()
};


$(document).ready(function () {

    var game_started = false;
    $("#pong_game").on("click", function (e) {

        if (game_started != true) {
            Game();
            game_started = true;
        }

    })
});
