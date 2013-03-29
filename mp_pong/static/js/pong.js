//inspired by http://benogle.com/2009/04/20/jquery-pong.html
function Game(){ 

    function movePlayer(plr, offset){

        current_y = getPlayerY(plr);
        new_y = current_y + offset;
        setPlayerY(plr, new_y);

    };

    function getPlayerY(plr){

        y_px = parseInt(plr.css('top'));
        return y_px;
    };

    function setPlayerY(plr, y){

        plr.css('top', y);
    };


    function moveBall(ball, offset_x, offset_y){

        current_x , current_y = getBallLoc(ball);
        new_x = offset_x + current_x;
        new_y = offset_y + current_y;

        setBall(ball, new_x, new_y);
    };

    function getBallLoc(ball){

        x = parseInt(ball.css('left'));
        y = parseInt(ball.css('top'));

        return x,y;
    };


    function setBall(ball, x, y){

        ball.css('top',y);
        ball.css('left',x);

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
