//inspired by http://benogle.com/2009/04/20/jquery-pong.html
function Game(){ 

    function movePlayer(plr, offset){

        current_y = getElemCoord(plr, 'y');
        new_y = current_y + offset;
        setPlayerY(plr, new_y);

    };

    function setPlayerY(plr, y){

        plr.css('top', y);
    };

    function moveBall(ball, offset_x, offset_y){

        current_x = getElemCoord(ball, 'x');
        current_y = getElemCoord(ball, 'y');
        new_x = offset_x + current_x;
        new_y = offset_y + current_y;

        if (validateCoord(new_x, 'x') != true) {
            //someone scored
            alert('scored');
            if (coord < 0){
                scorePoint(player1, 1);}
            else {
                scorePoint(player2, 1);
            }
        }
        else if (validateCoord(new_y, 'y') != true){
            //ball hit wall, reverse x direction
            console.log('hit wall');
            offset_y *= -2;
            reverse_y = true;
            new_y = current_y + offset_y;

            setBallCoords(ball, new_x, new_y);
            return false;
        }

        else {
            setBallCoords(ball, new_x, new_y);
        }
    };

    function scorePoint(plr, amount){
        alert('score!');
    }

    function validateCoord(coord, x_or_y){

        if (x_or_y == 'x'){
            // alert('x testing');
            console.log(coord);
            console.log(limit_x);
            if (coord < 0 || coord > limit_x){
                alert('x false');
                return false;}
                // else {
                //     return true;}
        }
        else if (x_or_y == 'y'){
            console.log(coord);
            console.log(limit_y);
            if (coord < 0 || coord > limit_y){
                console.log('y false');
                return false;}
                // else {
                //     return true;}
        }

        return true;
    }


    function setBallCoords(ball, x, y){

        ball.css('top',y);
        ball.css('left',x);

    };

    function getElemCoord(elem, x_or_y){

        if (x_or_y == "y"){
            coord = parseInt(elem.css('top'));
        }
        else {
            coord = parseInt(elem.css('left'));
        }
        return coord;
    };

    function Update(){

        movePlayer(player1, 5);


        moveBall(ball, x_offset, y_offset);
        if (reverse_y == true){
            y_offset *= -1;
            reverse_y = false;
        }
        if (reverse_x == true){
            x_offset *=-1;
            reverse_x = false;
        }

        setTimeout(function() { Update()}, 16);
    };

    function Start(){

        player1 = $($('.player1')[0]);
        player2 = $($('.player2')[0]);

        ball= $($('.ball')[0]);
        x_offset = 1;
        y_offset = 5;

        limit_x = parseInt($($('.play_area')[0]).css('width'));
        limit_y = parseInt($($('.play_area')[0]).css('height'));

        reverse_x = false;
        reverse_y = false;

        movePlayer(player1, 5);

        setTimeout(function() { Update()}, 50);

        console.log('done start');
        console.log($(this));

    };

    Start()
};


$(document).ready(function(){

    var game_started = false;
    $("#pong_game").on("click", function(e){

        if (game_started != true){
            Game();
            game_started = true;}

    })
});
