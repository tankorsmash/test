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

        setBallCoords(ball, new_x, new_y);
    };

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
        moveBall(ball, 5, 5);

        setTimeout(function() { Update()}, 50);
    };

    function Start(){

        player1 = $($('.player1')[0]);
        player2 = $($('.player2')[0]);

        ball= $($('.ball')[0]);

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
