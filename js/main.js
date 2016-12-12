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

var images = [
'assets/pic1.jpg',
'assets/pic2.jpg',
'assets/pic3.jpg',
'assets/pic4.jpg',
'assets/pic5.jpg',
'assets/pic6.jpg'
//'assets/pic7.jpg'
];
var points = [3, 4, 5, 6, 7, 8];

// elements
var $msg = $('#msg');
var $balance = $('#balance');

// ---- Event listeners ---- 

$('input[name=bet]').on('change', function() {
	bet = getSelectedBet();
	checkBalance();
	console.log(bet);
});

$('#resetButton').on('click', initialize);

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
	setRandomImgs();
	render();
	// board = [
	// 	[null, null, null],
	// 	[null, null, null],
	// 	[null, null, null]
	// ];
	// board = [
	// [($('#0').html('<img src = "images[1]">')), ($('#0').html('<img src = "images[2]">')), ($('#0').html('<img src = "images[0]">'))],
	// [($('#0').html('<img src = "images[1]">')), ($('#0').html('<img src = "images[1]">')), ($('#0').html('<img src = "images[1]">'))],
	// [($('#0').html('<img src = "images[1]">')), ($('#0').html('<img src = "images[2]">')), ($('#0').html('<img src = "images[0]">'))]
	// ];
	document.getElementById('spin').disabled = false;
	balance = 1000; //starting balance
	$msg.html('Welcome to MORE SLOTS!');
}

initialize();

//$('#' + i).html('<img src="' + images[picNum] + '">')

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
	checkWinner();
	if (checkWinner === true) showWinningCombo();
	showCredits();
	updateBalance();
	render();
	gameOver();
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
// 		a. 3 in line (in any of three rows) = bet * 10 = (credits)
// 		b. ? super card 3 in line - all “More” = bet * 15 = (credits)
// 		c. 2 in line (in any of three rows, next to each other) = bet * 5 = (credits)
/*function checkWinner() {
	check3InLine();
	check2InLine();
};

function check3InLine() {
	if ((board[0] == board[1] && board[1] == board[2] && board[1] != null)
		|| (board[3] == board[4] && board[4] == board[5] && board[4] != null)
		|| (board[6] == board[7] && board[7] == board[8] && board[7] != null)) {
		$msg.html('Congratulations, you won 3-in-line!');
	} else {
		return false;
	}
}

function check2InLine() {
	if ((check3InLine != true)
	 	&&((board[0] == board[1] && board[0] != null) 
		|| (board[1] == board[2] && board[1] != null)
		|| (board[3] == board[4] && board[3] != null)
		|| (board[4] == board[5] && board[4] != null)
		|| (board[6] == board[7] && board[6] != null)
		|| (board[7] == board[8] && board[7] != null))) {
		$msg.html('Congratulations, you won 2-in-line!');
	} else {
		return false;
	}
}*/
// the wining credit depends on the winning level (3 for 3-in-line or 2 for 2-in-line), bet, and the ranking of the image.
//winning calculation = (imageRanking * WiningLevel * (bet/5)
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
}

var winPoints = 0;
board.forEach(function(row) {
	winPoints += computeWinPointsForRow(row);
});

console.log(winPoints);
		
// showcase matching pictures (hidden div elements)
function showWinningCombo() {

}

// Update balance
// 	1. if player loses balance minus bet;
// 	2. if player wins balance plus credits
function updateBalance() {
	if (checkWinner === false) {
		console.log(balance - getSelectedBet);
	} else if (check3InLine === true) {
		console.log(balance + (bet * 10));
	} else if (check2InLine === true) {
		console.log(balance + (bet * 5));
	} else {
		return;
	}
}

function showCredits() {
	if (check3InLine == true) {
		bet = bet * 10;
		alert('Congratulations, you won ' + bet + 'credits');
	} else if (check2InLine == true) {
		bet = bet * 5;
		alert('Congratulations, you won' + bet + 'credits');
	} else {
		return;
	}
}

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
}


// gameOver
// 	1. check if player have enough money to play
// 	2. if current balance 0, display “Game Over”
function gameOver() {
	if (balance <= 0) {
		alert('Game Over!');
		document.getElementById('spin').disabled = true;
	} else {
	}return false;
}

function getSelectedBet() {
	return parseInt($('input[name=bet]:checked').val());
}


})
