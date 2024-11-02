//Rutas do proxecto
const assets = "../assets/"

//Declaración de elementos do HTML
const slotMachine = document.querySelector('#slot-machine')
const spinButton = document.querySelector('#spin-button')
const winMessage = document.querySelector('.win-message')
  //Carretes da tragaperras
  const leftReel = document.querySelector('#reel1')
  const middleReel = document.querySelector('#reel2')
  const rightReel = document.querySelector('#reel3')
    //Elementos de cada carrete
    const topLeft = leftReel.querySelector('.top', '.first')
    const midLeft = leftReel.querySelector('.center', '.first')
    const botLeft = leftReel.querySelector('.bottom', '.first')
    const topMiddle = middleReel.querySelector('.top', '.second')
    const midMiddle = middleReel.querySelector('.center', '.second')
    const botMiddle = middleReel.querySelector('.bottom', '.second')
    const topRight = rightReel.querySelector('.top', '.third')
    const midRight = rightReel.querySelector('.center', '.third')
    const botRight = rightReel.querySelector('.bottom', '.third')
//Distribución da tragaperras 
const distribution = [
  [topLeft, topMiddle, topRight],
  [midLeft, midMiddle, midRight],
  [botLeft, botMiddle, botRight],
]

//Simbolos dispoñibles
const symbols = [
  {name: 'cherry', points: 150}, 
  {name: 'lemon', points: 75},
  {name: 'orange', points: 10},
  {name: 'watermelon', points: 100},
  {name: 'grapes', points: 50},
  {name: 'seven', points: 1000},
  {name: 'bell', points: 500},
  {name: 'bar', points: 250}];


//Selección dun simbolo aleatorio 
function randomSymbol(){
  return Math.floor(Math.random() * symbols.length)
} 

//Ocorre cando se actualiza a páxina ou se abre por primeira vez 
function initialState(){
  //Selección aleatoria de simbolos ao inicio
  for(let outerI = 0; outerI < distribution.length; outerI++ ){
    for(let innerI = 0; innerI < distribution[outerI].length; innerI++){
      let rngSymbol = symbols[randomSymbol()].name
      distribution[outerI][innerI].insertAdjacentHTML('beforeend', `<img class="symbol ${rngSymbol}" src="${assets+rngSymbol}.png">`)
    }
  }
}
initialState()

function clearState(){
  for(let outerI = 0; outerI < distribution.length; outerI++ ){
    for(let innerI = 0; innerI < distribution[outerI].length; innerI++){
      let child = distribution[outerI][innerI].lastElementChild
      distribution[outerI][innerI].removeChild(child)
    }
  }
}

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

//Función do botón
function spinReels() {
  clearState()
  initialState()
  setTimeout(checkForWin, 500);
}

const winningCombinations = [
  topLeft.children[0].isEqualNode(topMiddle.children[0]) && topMiddle.children[0].isEqualNode(topRight.children[0]),
  midLeft.children[0].isEqualNode(midMiddle.children[0]) && midMiddle.children[0].isEqualNode(midRight.children[0]),
  botLeft.children[0].isEqualNode(botMiddle.children[0]) && botMiddle.children[0].isEqualNode(botRight.children[0]),
  topLeft.children[0].isEqualNode(midMiddle.children[0]) && midMiddle.children[0].isEqualNode(botRight.children[0]),
  botLeft.children[0].isEqualNode(midMiddle.children[0]) && midMiddle.children[0].isEqualNode(topRight.children[0])
]


//
spinButton.addEventListener('click', spinReels);


function checkForWin() {
  switch(winningCombinations){
    case(0):
      console.log("Case 0")
      winMessage.textContent = `You won! x3`;
      winMessage.style.display = 'block';
    case(1):
      console.log("Case 0")
      winMessage.textContent = `You won! x3`;
      winMessage.style.display = 'block';
    case(2):
      console.log("Case 0")
      winMessage.textContent = `You won! x3`;
      winMessage.style.display = 'block';
    case(3):
      console.log("Case 0")
      winMessage.textContent = `You won! x3`;
      winMessage.style.display = 'block';
    case(4):
      console.log("Case 0")
      winMessage.textContent = `You won! x3`;
      winMessage.style.display = 'block';
    default:
      console.log("Case Loss")
      winMessage.textContent = 'Better luck next time!';
      winMessage.style.display = 'block';
  }

/*
  if((topLeft.children[0].isEqualNode(topMiddle.children[0]) && topMiddle.children[0].isEqualNode(topRight.children[0])) 
    || (midLeft.children[0].isEqualNode(midMiddle.children[0]) && midMiddle.children[0].isEqualNode(midRight.children[0])) 
    || (botLeft.children[0].isEqualNode(botMiddle.children[0]) && botMiddle.children[0].isEqualNode(botRight.children[0]))){
    winMessage.textContent = `You won! x3`;
    winMessage.style.display = 'block';
  }else {
    winMessage.textContent = 'Better luck next time!';
    winMessage.style.display = 'block';
  }
*/
}



/*
function reelsDebug() {
  console.table([
    [topLeft.children[0], topMiddle.children[0], topRight.children[0]],
    [midLeft.children[0], midMiddle.children[0], midRight.children[0]],
    [botLeft.children[0], botMiddle.children[0], botRight.children[0]]
  ])

  console.log(topLeft.children[0] == topMiddle.children[0], topMiddle.children[0] == topRight.children[0])
  console.log(midLeft.children[0] == midMiddle.children[0], midMiddle.children[0] == midRight.children[0])
  console.log(botLeft.children[0] == botMiddle.children[0], botMiddle.children[0] == botRight.children[0])
}
reelsDebug()
*/
  