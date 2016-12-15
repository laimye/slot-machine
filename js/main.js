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


//---- Application-Wide Variables ----

var balance;
var bet;
var cell;
var winPoints;
var board = [
	[null, null, null],
	[null, null, null],
	[null, null, null]
];

var winningCells;

// ---- Constants ----

var images = [
	'assets/pic1.jpg',
	'assets/pic2.jpg',
	'assets/pic3.jpg',
	'assets/pic4.jpg',
	'assets/pic5.jpg',
	'assets/pic6.jpg',
	'assets/pic7.jpg'
];

var points = [3, 3, 3, 4, 4, 4, 5];


// ---- DOM Element Variables ----
var $msg = $('#msg');
var $balance = $('#balance');


// ---- Event Listeners ---- 

$('input[name=bet]').on('change', function() {
	bet = getSelectedBet();
	checkBalance();
	console.log(bet);
});

$('#reset-button').on('click', initialize);

$('#spin').on('click', handleClick);


/*--- Functions ---*/

// initialize the apps state
function initialize() {
	bet = getSelectedBet();
	setRandomImgs();
	document.getElementById('spin').disabled = false;
	balance = 1000; //starting balance
	render();
	$('#board img').removeClass('loser-cell');
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
	$('#board img').removeClass('loser-cell');
	var sound = new Audio('http://www.freesound.org/data/previews/69/69690_866625-lq.mp3');
	sound.play();
	checkBalance();
	subBet();
	flashing(finishHandleClick); // finishHandleClick - callback function
	setRandomImgs();
}

function finishHandleClick() {
	winPoints = 0;
	winningCells = [
		[null, null, null],
		[null, null, null],
		[null, null, null]
	];
	board.forEach(function(row, idx) {
		winPoints += computeWinPointsForRow(row, idx);
	});
	balance += winPoints;
	gameOver();
	render();
}

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
function flashing(cb) {
    var maxCount = 8;
    var curCount = 0;
    var timerResolution = 310;
    var timerId;
    timerId = setInterval(function() {
    	setRandomImgs();
    	renderBoard();
    	curCount++;
    	if (curCount === maxCount) {
    		clearInterval(timerId);
    		cb();
    	}
    }, timerResolution);
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

  
// checkWinner
// the wining credits depend on the winning level (3 for 3-in-line or 2 for 2-in-line), bet, and the ranking of the image.
// winning calculation = (imageRanking * WiningLevel * (bet/5))

function computeWinPointsForRow(row, rowIdx) {
	if (row[0] === row[1] && row[1] === row[2]) {
		winningCells[rowIdx][0] = winningCells[rowIdx][1] = winningCells[rowIdx][2] = true;
		return 3 * points[row[0]] * bet / 5;
	} else if (row[0] === row[1]) {
		winningCells[rowIdx][0] = winningCells[rowIdx][1] = true;
		return 2 * points[row[0]] * bet / 5;
	} else if (row[1] === row[2]) {
		winningCells[rowIdx][1] = winningCells[rowIdx][2] = true;
		return 2 * points[row[1]] * bet / 5;
	} else {
		return 0;
	}
}

		
// showcase matching pictures. The non-winning cells become transparent
function renderWinningCells() {
	for (var row = 0; row < winningCells.length; row++) {
		for (var col = 0; col < winningCells[row].length; col++) {
			var id = row * 3 + col;
			$('#' + id + ' img').removeClass('loser-cell');
			$('#' + id + ' img').addClass(winningCells[row][col] ? '' : 'loser-cell');
		}
	}
}

// render (update display): render board, score
function render() {
	$balance.html(balance);
	renderBoard();
	if (winningCells) {
		renderWinningCells();
		if ((winPoints - bet) > 0)	{
			$msg.html('Congratulations, you won ' + (winPoints - bet) + ' credits!');
			var sound = new Audio('http://www.freesound.org/data/previews/209/209578_2558531-lq.mp3');
			sound.play();
		} else {
			//convert a negative number to a positive and display a different message
			var num = winPoints - bet;
			var posNum = (num < 0) ? num * -1 : num;
    		$msg.html('Oh well, you lost ' + posNum + ' credits...');
		}
	}
}


// show the images in the board (set the backround of the td)
function renderBoard() {
	// $('#board img').each(function() { console.log(this.offsetHeight) });
	for (var i = 0; i < 9; i++) {
	   	// get the pic number out of board
	   	var row = Math.floor(i / 3);
	   	var col = i - (row * 3);
	   	var picNum = board[row][col];
	   	// select the td by it's id
		$('#' + i + ' img').attr('src', images[picNum]);
	}
}

// gameOver
// if current balance <= 4, display “Game Over”
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
