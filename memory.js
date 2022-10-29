var cards = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png",  "12.png", "13.png", "14.png", "15.png", "16.png", "17.png", "18.png", "19.png", "20.png", "karta.png"];



var visible_nr;

var oneVisible = false;
var turnCounter = 0;
var lock = false;
var pairsLeft = 0;


var pictures, pairs, timer, secs, time, score, level;


window.onload = drawMenu;
	
function drawMenu()
{
		let levels = ["Easy", "Medium", "Hard"];

		$('.board').html('<div class="board-header">Choose difficulty level:</div>');
		
		//------------CREATE 3 BUTTONS-------------
		for (let i = 0; i < levels.length; i++)
		{
			$('.board').append('<div class=\"button-level' + i +'" onclick="prepare('+i+')">' + levels[i] + '</div>');
		}

};
	
	
	
function prepare(setLevel)
{
	let $board = $(".board");
	$board.html('<div class="field"></div>');

	let $field = $(".field");
	
	pictures = [];
	
	switch (setLevel) 
	{
			// easy - 3x4 - 12 cards
			case 0:
			level = "easy";
			pairs = 6;
			$board.css("width", "600px");
			break;
			
			// normal - 4x5 - 20 cards
			case 1:
			level = "medium";
			pairs = 10;
			$board.css("width", "800px");
			break;
			
			// hard - 5x6 - 30 cards
			case 2:
			level = "hard";
			pairs = 15;
			$board.css("width", "850px");
			break;
	}
		
	$field.addClass(level);

	for (let i = 1; i <= pairs; i++) pictures.push(i + ".png");

	// Return random ordered and doubled array
	const shuffleArray = array =>
	_(array)
		.concat(array)
		.shuffle()
		.value();
	pictures = shuffleArray(pictures);

	for(let i = 0; i < pictures.length; i++) $field.append('<div class="card" id="c'+ i +'" onclick="revealCard('+ i +')"></div>');


	// Draw on board timer and turn counter
	$board.append(
			'<div class="score">' +
			'<div class="time">Time: 00:00:00</div>' +
			'<div class="turns">Turn: 0</div>' +
			"</div>"
	);
	
	
	//$(".score").addClass(level);
	
	pairsLeft = pairs;
	//alert(pairsLeft);
}



timer = new Timer();

function revealCard(nr)
{
	//alert(lock);

	
	if (!timer.isRunning()) 
	{
      // Start timer
      timer.start({ precision: "seconds" });
      timer.addEventListener("secondsUpdated", function() {   

        // Display clock on board
        time = timer.getTimeValues().toString();
        $(".time").html("Time: " + time);
      });
    }

	var opacityValue = $('#c'+nr).css('opacity');
	//alert(opacityValue);
	
	if (opacityValue != 0 && lock == false  && nr != visible_nr)
	{
		lock = true;
	
		var obraz = "url(img/" + pictures[nr] + ")";
		
		$('#c'+nr).css('background-image', obraz);
		$('#c'+nr).addClass('cardA');
		$('#c'+nr).removeClass('card');
		
		if(oneVisible == false)
		{
			//first card
			
			oneVisible = true;
			visible_nr = nr;
			lock = false;
		}
		else
		{
			//second card
			//matched
			if(pictures[visible_nr] == pictures[nr])
			{
				setTimeout(function() { hide2Cards(nr, visible_nr) }, 750);
			}
			//not matched
			else
			{	
				setTimeout(function() { restore2Cards(nr, visible_nr) }, 750);
			}
			
			turnCounter++;
			$('.turns').html('Turn counter: ' + turnCounter);
			oneVisible = false;
		}
		
	}
	
}


function hide2Cards(nr1, nr2)
{
	$('#c' + nr1).css('opacity', '0');
	$('#c' + nr2).css('opacity', '0');
	
	pairsLeft--;
	
	if (pairsLeft == 0)
	{
		//alert("koniec");
		//timer.stop();
		$('.board').html('<h2>You win!<br>Number of turns: ' + turnCounter + ' <br>Time: ' +time + '</h2><div class="reset" onclick="location.reload()">JESZCZE RAZ</div>');
		$('#score '+ level).html(' ');
	}
	visible_nr = null;
	lock = false;
}

function restore2Cards(nr1, nr2)
{
	$('#c' + nr1).css('background-image', 'url(img/karta.png)');
	$('#c' + nr1).addClass('card');
	$('#c' + nr1).removeClass('cardA');
	
	$('#c' + nr2).css('background-image', 'url(img/karta.png)');
	$('#c' + nr2).addClass('card');
	$('#c' + nr2).removeClass('cardA');
	
	visible_nr = null;
	lock = false;
}
