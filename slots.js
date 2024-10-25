//Declaración de elementos do HTML
const slotMachine = document.querySelector('#slot-machine')
const spinButton = document.querySelector('#spin-button')
const winMessage = document.querySelector('.win-message')
  //Carretes da tragaperras
  const leftReel = document.querySelector('#reel1')
  const middleReel = document.querySelector('#reel2')
  const rightReel = document.querySelector('#reel3')
    //Elementos de cada carrete
    const topLeft = leftReel.querySelector('.top')
    const midLeft = leftReel.querySelector('.center')
    const botLeft = leftReel.querySelector('.bottom')
    const topMiddle = middleReel.querySelector('.top')
    const midMiddle = middleReel.querySelector('.center')
    const botMiddle = middleReel.querySelector('.bottom')
    const topRight = rightReel.querySelector('.top')
    const midRight = rightReel.querySelector('.center')
    const botRight = rightReel.querySelector('.bottom')


//Simbolos dispoñibles
const symbols = [
  'cherry', 
  'lemon', 
  'orange', 
  'plum', 
  'watermelon', 
  'grapes', 
  'seven', 
  'bell', 
  'bar'
];

//Selección dun simbolo aleatorio 
function randomSymbol(){
  return Math.floor(Math.random() * symbols.length)
} 

//Ocorre cando se actualiza a páxina ou se abre por primeira vez 
function initialState(){
  //Distribución da tragaperras 
  const initialDistribution = [
    [topLeft, midLeft, botLeft],
    [topMiddle, midMiddle, botMiddle],
    [topRight, midRight, botRight]
  ]

  //Selección aleatoria de simbolos ao inicio
  for(let outerI = 0; outerI < initialDistribution.length; outerI++ ){
    for(let innerI = 0; innerI < initialDistribution[outerI].length; innerI++){
      initialDistribution[outerI][innerI].insertAdjacentHTML('beforeend', `<img class="symbol" src="./img/${symbols[randomSymbol()]}.png">`)
    }
  }
}
initialState()

//Devolve unha lista cos simbolos nun orde aleatorio
function shuffleArray(array){
  for (let i = array.length - 1; i > 0; i--) {
    const newIndex = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[newIndex];
    array[newIndex] = temp;
  }
  return array
}

//Crea un carrete mediante a unión de 3 listas aleatorias de simbolos
const reelPattern = [shuffleArray(symbols).concat(shuffleArray(symbols)).concat(shuffleArray(symbols))] 


function spinReels() {
  setTimeout(checkForWin, 1000);
}

spinButton.addEventListener('click', spinReels);


function checkForWin() {
  console.table([
    [topLeft.children, midLeft.children, botLeft.children],
    [topMiddle.children, midMiddle.children, botMiddle.children],
    [topRight.children, midRight.children, botRight.children]
  ])

  if((topLeft == topMiddle && topLeft == topRight) 
    || (topMiddle == midMiddle && topMiddle == botMiddle) 
    || (topRight == midRight && topRight == botRight)){
    winMessage.textContent = `You won! ${winningCombination[0]} x3`;
    winMessage.style.display = 'block';
  }else {
    winMessage.textContent = 'Better luck next time!';
    winMessage.style.display = 'block';
  }
}