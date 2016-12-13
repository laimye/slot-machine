$(function () {

/* ----- Pseudocode ----- */

/*- Variables
- register event listeners
- (a) initialize the apps state (Variables)
	- fill board with pictures (class names)
		- pic0, pic1, pic2….pic6
	- starting balance: 1000
- starting bet: 10
- render (update display)
	- render board
	- render score
- (b) handle player updates the bet
- handle player clicking Start
	- start random flashing routine (+sound effect)
	- when random flashing is done
		- deduct bet from balance
		- player starts the machine (check the proper name)
		- computer randomly pics 3 pictures per reel
		- (c) check if player won
 		- display how much the player won or lost
		- render
- (d) check if game is Over*/


//---- Variables/State ----

var balance;
var bet;
var cell;
var board = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

var winPoints;

var images = [
'assets/pic1.jpg',
'assets/pic2.jpg',
'assets/pic3.jpg',
'assets/pic4.jpg',
'assets/pic5.jpg',
'assets/pic6.jpg',
'assets/pic7.jpg'
];

var points = [1, 1, 1, 2, 2, 2, 5];

// elements
var $msg = $('#msg');
var $balance = $('#balance');

// ---- Event listeners ---- 

$('input[name=bet]').on('change', function() {
	bet = getSelectedBet();
	checkBalance();
	console.log(bet);
});

$('#reset-button').on('click', initialize);

$('#spin').on('click', handleClick);

/*--- Functions ---*/

/*- (a) initialize the apps state (Variables)
	- fill board with pictures (class names)
		- pic0, pic1, pic2….pic6*/

function initialize() {
	var cells = document.getElementsByClassName('cell');
	for (var i = 0; i < cells.length; i++) {
		cells[i].textContent = null;
	}
	bet = getSelectedBet();
	setRandomImgs(); // consider putting there preset pictures
	render();
	document.getElementById('spin').disabled = false;
	balance = 1000; //starting balance
	$msg.html('Welcome to MORE SLOTS!');
}

initialize();

/*- handle player clicking Start
	- start random flashing routine (+sound effect) - flashing()
	- when random flashing is done
		- deduct bet from balance - updateBalance()
		- player spins the reels
		- computer randomly pics 3 pictures per reel
		- (c) check if player won
 		- display how much the player won or lost
		- render*/

function handleClick() {
	checkBalance();
	flashing()
	subBet();
	setRandomImgs();
	winPoints = 0;
	board.forEach(function(row) {
		winPoints += computeWinPointsForRow(row);
	});
	balance += winPoints;
	//if (computeWinPointsForRow === true) showWinningCombo();
	//showCredits();
	render();
	gameOver();
}

// (b) handle player updates the bet
// check if player has sufficient funds to continue playing
function checkBalance () {
	if (balance >= bet) {
		return;
	} else if (balance < bet) {
		alert('Please adjust your bet');
		return;
	}
}

//roll/flash the pictures
function flashing() {

}

//subtract bet from balance as soon as player spins the reels
function subBet() {
	balance -= bet;
}

//computer randomly generates pisture to display in reels
function setRandomImgs() {
    for(var i = 0; i < 9; i++) {
     // generate random digit between 0 & 6 (number of imgs)
   var rnd = Math.floor(Math.random() * images.length);
   var row = Math.floor(i / 3);
   var col = i - (row * 3);
   // board holds index of image array
   board[row][col] = rnd;
 }
}
console.log(board);

  
// checkWinner
// the wining credits depend on the winning level (3 for 3-in-line or 2 for 2-in-line), bet, and the ranking of the image.
//winning calculation = (imageRanking * WiningLevel * (bet/5))


function computeWinPointsForRow(row) {
	if (row[0] === row[1] && row[1] === row[2]) {
		return 3 * points[row[0]] * bet / 5;
	} else if (row[0] === row[1]) {
		return 2 * points[row[0]] * bet / 5;
	} else if (row[1] === row[2]) {
		return 2 * points[row[1]] * bet / 5;
	} else {
		return 0;
	}
	console.log(winPoints);
}

		
// showcase matching pictures (hidden div elements)
function showWinningCombo() {

}


// function showCredits() {
// 	if (check3InLine == true) {
// 		bet = bet * 10;
// 		alert('Congratulations, you won ' + bet + 'credits');
// 	} else if (check2InLine == true) {
// 		bet = bet * 5;
// 		alert('Congratulations, you won' + bet + 'credits');
// 	} else {
// 		return;
// 	}
// }

// render (update display): render board, score
function render() {
	$balance.html(balance);
// show the images in the board (set the backround of the td)
    for (var i = 0; i < 9; i++) {
       // get the pic number out of board
       var row = Math.floor(i / 3);
	   var col = i - (row * 3);
	   var picNum = board[row][col];
       // select the td by it's id        
       $('#' + i).html('<img src="' + images[picNum] + '">');
    }
    $msg.html('Congratulations, you won ' + (winPoints - bet) + ' credits');

}


// gameOver
// 	1. check if player have enough money to play
// 	2. if current balance 0, display “Game Over”
function gameOver() {
	if (balance <= 4) {
		alert('Game Over!');
		document.getElementById('spin').disabled = true;
	} else {
	}return false;
}

function getSelectedBet() {
	return parseInt($('input[name=bet]:checked').val());
}


})
