/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

/*
Original makeBoard

function makeBoard(){

}
*/


let makeBoard = (HEIGHT, WIDTH) => {
  for(let y = 0; y < WIDTH; y++){
    let row = []
      for(let x = 0; x < HEIGHT; x++){
        row.push(0)
      }
    board.push(row);
  }
  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById('board')
  // TODO: add comment for this code
  let top = document.createElement("tr"); //creates top layer of cells
  top.setAttribute("id", "column-top"); //sets id to column-top
  top.addEventListener("click", handleClick);//adds event listener with click to top layer

  for (let x = 0; x < WIDTH; x++) { //creates cells in the top row 
    let headCell = document.createElement("td"); //creates 
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) { //this entire thing creates rows and adds them to the 
    const row = document.createElement("tr"); //creates a row element for the table
    for (let x = 0; x < WIDTH; x++) { //
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`); //sets cell attribute equal to the cells x-y coordinate on the table
      row.append(cell); //appends the cell to the row created
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

let findSpotForCol = (x) => {
  // TODO: write the real version of this, rather than always returning 0
  let value = document.getElementById(x).getAttribute('id');
  // console.log(value);
  let y = board[value]
  let flipped = y.reverse();
  // console.log(flipped);
  let findSlot =(el)=> el <1;
  let ind = flipped.findIndex(findSlot);
  flipped[ind] = currPlayer;
  let fixed = flipped.reverse();
  let z = fixed.findIndex(el => el >0)
  // console.log(z)
  return z;
}

/** placeInTable: update DOM to place piece into HTML table of board */

let placeInTable = (y, x) => {
  // TODO: make a div and insert into correct table cell
  console.log(y)
  console.log(x)
  let slot = document.getElementById(`${x}-${y}`);
  let piece = document.createElement('div')
  piece.setAttribute('class','piece')
  piece.setAttribute('id', `player${currPlayer}`)
  console.log(`slot is ${slot} and piece is ${piece}`)
  slot.appendChild(piece);
}

/** endGame: announce game end */

let endGame = (msg) => {
  alert(msg); //pops up with the alert message when things happen
}

/** handleClick: handle click of column top to play piece */

let handleClick = (evt) => {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(x, y);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  if(currPlayer === 1){
    currPlayer++
    document.querySelector('#player').innerHTML = 'Player 2. Go!'
  } else{
    currPlayer--
    document.querySelector('#player').innerHTML = 'Player 1. Go!'
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) { //Starting at the top of the game table
    for (let x = 0; x < WIDTH; x++) { //starting at the far left of the table, so total in the top right
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //checks from current location straight to the right, horizontally for an unbroken chain
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // check verticle win potential
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; //check diagonal up and to the right
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; //check diagonal up and to the left

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { //if any of this is true, return true
        return true;
      }
    }
  }
}


makeBoard(HEIGHT, WIDTH);
makeHtmlBoard();
