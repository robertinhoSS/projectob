const slotMachine = document.querySelector('.slot-machine');
const spinButton = document.querySelector('.spin-button');
const winMessage = document.querySelector('.win-message');

const symbols = [
  'Cherry', 
  'Lemon', 
  'Orange', 
  'Plum', 
  'Watermelon', 
  'Grapes', 
  'Seven', 
  'Bell', 
  'Bar'
];

function slotElement(symbol){
  this.symbol = symbol

  this.generateImage = function () {
    const newImg = document.createElement('img')
    newImg.setAttribute('id', symbol)
    console.log(newImg)
    return newImg
  }
}

const randomSymbol = Math.floor(Math.random() * symbols.length)

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const newIndex = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[newIndex];
    array[newIndex] = temp;
  }
}


const slotPattern = [
  [...symbols],
  [...symbols],
  [...symbols],
];

let winningCombinations = [
  ['Cherry', 'Cherry', 'Cherry'],
  ['Lemon', 'Lemon', 'Lemon'],
  ['Orange', 'Orange', 'Orange'],
  ['Plum', 'Plum', 'Plum'],
  ['Watermelon', 'Watermelon', 'Watermelon'],
  ['Grapes', 'Grapes', 'Grapes'],
  ['Seven', 'Seven', 'Seven'],
  ['Bell', 'Bell', 'Bell'],
  ['Bar', 'Bar', 'Bar']
];

function addImgs(){
  const reel1 = document.querySelector('#reel1')
  const reel2 = document.querySelector('#reel2')
  const reel3 = document.querySelector('#reel3')

  reel1.appendChild(slotElement(symbols[randomSymbol]))
  reel2.appendChild(slotElement(symbols[randomSymbol]))
  reel3.appendChild(slotElement(symbols[randomSymbol]))
}

//addImgs()

spinButton.addEventListener('click', spinReels);

function spinReels() {
  reels.forEach((reel) => {
    reel.classList.add('spinning');
    setTimeout(() => {
      reel.classList.remove('spinning');
      let randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      reel.querySelector('.symbol').textContent = randomSymbol;
    }, 2000);
  });


setTimeout(checkForWin, 1000);
}

function checkForWin() {
  let reel1Symbol = reels[0].querySelector('.symbol').textContent;
  let reel2Symbol = reels[1].querySelector('.symbol').textContent;
  let reel3Symbol = reels[2].querySelector('.symbol');

  let reel3img = reel3Symbol.querySelector('.symbol1')

  let winningCombination = winningCombinations.find((combination) => {
    return combination[0] === reel1Symbol && combination[1] === reel2Symbol && combination[2] === reel3Symbol;
  });

  if (winningCombination) {
    winMessage.textContent = `You won! ${winningCombination[0]} x3`;
    winMessage.style.display = 'block';
  } else {
    winMessage.textContent = 'Better luck next time!';
    winMessage.style.display = 'block';
  }
}