$(function () {




/* ----- Pseudocode ----- */

/*--- Slot machine ---
1. 3 reel game with 6(?) symbols/pictures on each reel
2. 2 displays (balance + bet) + Start button
3. “Play Again” button 
    - reset the balance to 1000*/


//---- Variables/State ----

	var balance;
	var bet;
	var cell;
	var board;

	// elements
	var $msg = $('#msg');
	var $balance = $('#balance');

// ---- Event listeners ---- 

$('input[name=bet]').on('change', function() {
	bet = getSelectedBet();
	console.log(bet);
});

$('#resetButton').on('click', initialize());

$('#spin').on('click', handleClick());

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
		board = [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		];
		balance = 1000; //starting balance
		$msg.html('Welcome to MORE SLOTS!');
	}

/*- render (update display)
	- render board
	- render score
- (b) handle player updates the bet
- handle player clicking Start
	- start random flashing routine (+sound effect) - flashing()
	- when random flashing is done
		- deduct bet from balance - updateBalance()
		- player spins the reels
		- computer randomly pics 3 pictures per reel
		- (c) check if player won
 		- display how much the player won or lost
		- render*/

function handleClick () {
	flashing()
	subBet();
	setRandomImgs();
	checkWinner();
	if (checkWinner === true) {
		showWinningCombo();
	} else {
		return;
	};
	showCredits();
	updateBalance();
	render();
}

function flashing() {

}

function subBet() {
	balance -= bet;
}

function setRandomImgs() {
	for(var i = 0; i < 9; i++) {
  	// generate random digit between 0 & 6 (number of imgs)
    var rnd = Math.floor(Math.random() * 4);
    var row = Math.floor(i / 3);
    var col = i - (row * 3);
    board[row][col] = 'img' + rnd;
  }
}
setRandomImgs();
console.log(board); 

function checkWinner() {
	check3InLine();
	check2InLine();
};

function check3InLine() {
	if ((board[0] == board[1] && board[1] == board[2] && board[1] != null)
		|| (board[3] == board[4] && board[4] == board[5] && board[4] != null)
		|| (board[6] == board[7] && board[7] == board[8] && board[7] != null)) {
		return true;
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
		alert("Congratulations, 2-in-line");
	} else {
		return false;
	}
}
		

function showWinningCombo() {

}

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

function render() {
	$balance.html(balance);

}

/*- (d) check if game is Over*/



/*(a) initialize
	1. display welcome message
	2. reset balance to default of 1000

 (c) check for winning combinations
	1.checkWinner
		a. 3 in line (in any of three rows) = bet * 10 = (credits)
		b. ? super card 3 in line - all “More” = bet * 15 = (credits)
		c. 2 in line (in any of three rows, next to each other) = bet * 5 = (credits)
   	2. showcase matching pictures (hidden div elements)
	3. (e) update the balance //(and store the currentbalance?)
(e) Update balance
	1. if player loses balance minus bet;
	2. if player wins balance plus credits*/



/*(b) check if the bet was updated
	1. if the balance is updated, store a new value;
	2. if the balance was not updated, keep the latest bet
(d) gameOver
    1. check if player have enough money to play
    2. if current balance 0, display “Game Over”

1. Spin the display
	2. roll/flash the pictures
	3. computer randomly picks one for each reel 

*/
	function getSelectedBet() {
		return parseInt($('input[name=bet]:checked').val());
	}


})
