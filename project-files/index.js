/* 
To handle user input:
1. Make sure you have Node and NPM installed
2. Run npm install prompt-sync in the terminal
*/
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {  // number of max. occurences for each symbol
  A: 2,  // higher value
  B: 4,
  C: 6,
  D: 8  // lower value
}

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2
}

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");  // String by default
    const inputDepositAmount = parseFloat(depositAmount);  // to Float

    if (isNaN(inputDepositAmount)) {  // isNaN = is not a number
      console.log("Invalid format. Try again.");
    } else if (inputDepositAmount <= 0) {
      console.log("Invalid deposit amount. Try again.");
    } else {
      return inputDepositAmount;
    }
  }
};

const getNumberOfLines = () => {
  while (true) {
    const numberOfLines = prompt("Enter the number of lines to bet on (1-3): ");
    const inputNumberOfLines = parseFloat(numberOfLines);

    if (isNaN(inputNumberOfLines)) {
      console.log("Invalid format. Try again.");
    } else if (inputNumberOfLines <= 0 || inputNumberOfLines > 3) {
      console.log("Invalid number of lines. Try again with a number included in [1-3].");
    } else {
      return inputNumberOfLines;
    }
  }
}

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter your bet: ");
    const inputBet = parseFloat(bet);

    if (isNaN(inputBet)) {
      console.log("Invalid format. Try again.");
    } else if (inputBet <= 0) {
      console.log("Invalid bet. Try again.");
    } else if (inputBet > balance / lines) {
      console.log("You don't have enough money! Try again.");
    } else {
      return inputBet;
    }
  }
}

const spin = () => {
  const symbols = [];  // reference type -> defines a constant reference to an array -> we can still change the elements of it.
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {

    reels.push([]);   // nested array (we add a column for each loop iteration)
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {

      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);  // remove 1 element in that position (avoiding repetitions)
    }
  }

  return reels;
};

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }

  return rows;
}

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != rows.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
}

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }

  return winnings;
}

const game = () => {
  let balance = deposit();

  while (true) {

    const lines = getNumberOfLines();
    const bet = getBet(balance, lines);
    console.log("\nRECAP\n- Initial deposit: %f\n- Number of lines to bet on: %f\n- Your bet: %f", balance, lines, bet);
    balance -= bet * lines;
    console.log("\nCurrent deposit: %f", balance);
    console.log("\nNOW LET'S SPIN!\n");
    const reels = spin();
    const rows = transpose(reels);
    console.log("*********");
    printRows(rows);
    console.log("*********");
    const winnings = getWinnings(rows, bet, lines);
    console.log("\nYou won $" + winnings.toString());
    balance += winnings;
    console.log("\nCurrent deposit: %f", balance);

    if (balance <= 0) {
      console.log("\nYou run out of money!");
      break;
    }

    const playAgain = prompt("\nDo you want to play again? (y/n) ");

    if (playAgain != "y") break;
  }
}

game();