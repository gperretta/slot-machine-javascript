/* 
To handle user input:
1. Make sure you have Node and NPM installed
2. Run npm install prompt-sync in the terminal
*/
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {  // number of max. occurences for each symbol
  A : 2,  // higher value
  B : 4,
  C : 6,
  D : 8  // lower value
}

const SYMBOL_VALUES = {
  A : 5,
  B : 4,
  C : 3,
  D : 2
}

const deposit = () => {
  while(true) {
    const depositAmount = prompt("Enter a deposit amount: ");  // String by default
    const inputDepositAmount = parseFloat(depositAmount);  // to Float

    if(isNaN(inputDepositAmount) || inputDepositAmount <= 0) {  // isNaN = is not a number
      console.log("Invalid deposit amount. Try again.");
    } else {
      return inputDepositAmount;
    }
  }
};

const getNumberOfLines = () => {
  while(true) {
    const numberOfLines = prompt("Enter the number of lines to bet on (1-3): "); 
    const inputNumberOfLines = parseFloat(numberOfLines);  

    if(isNaN(inputNumberOfLines) || inputNumberOfLines <= 0 || inputNumberOfLines > 3) {
      console.log("Invalid number of lines. Try again with a number among 1-3.");
    } else {
      return inputNumberOfLines;
    }
  }
}

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter your bet: ");  
    const inputBet = parseFloat(bet);  

    if(isNaN(inputBet) || inputBet <= 0 || inputBet > balance/lines) {
      console.log("Invalid bet. Try again.");
    } else {
      return inputBet;
    }
  }
}

const spin = () => {
  const symbols = [];  // reference type -> defines a constant reference to an array -> we can still change the elements of it.
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i=0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i=0; i < COLS; i++) {
    reels.push([]);  // nested array
    const reelSymbols = [...symbols];
    for (let j=0; i < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.lenght);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);  // remove 1 element in that position (avoiding repetitions)
    }
  }
  
  return reels;
};

spin();
let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);