/* ----- Pseudocode ----- */


/* --- Slot machine ---
1. 3 reel game with 6(?) symbols/pictures on each reel
2. 2 displays (balance + bet) + Start button
3. “Play Again” button 
    - reset the balance to 1000


--- Overall Game Play ---

- Variables
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
	- start random flashing routine
	- when random flashing is done
		- deduct bet from balance
		- player starts the machine (check the proper name)
		- computer randomly pics 3 pictures per reel
		- (c) check if player won
		- render
- (d) check if game is Over



---- Variables/State ----:
- balance
	-starting balance: 1000
- bet
	-starting balance/default: 10

--- The game ---
3. allow user update their bet every time before starting the slot machine
4. player starts the machine
    1. display spinning the machine


--- Functions ---
(a) initialize
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
	2. if player wins balance plus credits

(b) check if the bet was updated
	1. if the balance is updated, store a new value;
	2. if the balance was not updated, keep the latest bet
(d) gameOver
    1. check if player have enough money to play
    2. if current balance 0, display “Game Over”

1. Spin the display
	2. roll/flash the pictures
	3. computer randomly picks one for each reel 

*/



var board = [
	[null, null, null],
	[null, null, null],
  [null, null, null]
];

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

