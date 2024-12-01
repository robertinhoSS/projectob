//Rutas do proxecto
const assets = "../assets/"

//Declaración de elementos do HTML
const slotMachine = document.querySelector('#slot-machine')
const spinButton = document.querySelector('#spin-button')
const winMessage = document.querySelector('#win-message')
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
  {name: 'bar', points: 250}
];

//Mensaxes de fin
const win = "WIN  WIN  WIN  WIN  WIN  WIN  WIN  WIN  WIN  WIN  WIN  WIN"
const lose = "LOSE  LOSE  LOSE  LOSE  LOSE  LOSE  LOSE  LOSE  LOSE  LOSE  "

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
      distribution[outerI][innerI].insertAdjacentHTML('beforeend', `<img class="symbol ${rngSymbol}" src="${assets+rngSymbol}.webp">`)
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

//Función do botón
function spinReels() {
  clearState()
  initialState()
  setTimeout(checkForWin, 500);
}

//Acciona a tragaperras ao pulsar o botón
spinButton.addEventListener('click', spinReels);

//Calcula os puntos cada vez que se consigue unha liña
function calculateScore(){
//TODO: Manipulate DOM to handle some score system
}

function checkForWin() {
  //Abreviacións
  const topLeftChild = topLeft.children[0]
  const topMiddleChild = topMiddle.children[0]
  const topRightChild = topRight.children[0]
  const midLeftChild = midLeft.children[0]
  const midMiddleChild = midMiddle.children[0]
  const midRightChild = midRight.children[0]
  const botLeftChild = botLeft.children[0]
  const botMiddleChild = botMiddle.children[0]
  const botRightChild = botRight.children[0]

  //Resolución
  if(topLeftChild.isEqualNode(topMiddleChild) && topMiddleChild.isEqualNode(topRightChild)){
    setTimeout(2000)
    winMessage.textContent = `${win}`
    winMessage.style.color = 'green'
  }else if(midLeftChild.isEqualNode(midMiddleChild) && midLeftChild.isEqualNode(midRightChild)){
    setTimeout(2000)
    winMessage.textContent = `${win}`
    winMessage.style.color = 'green'
  }else if(botLeftChild.isEqualNode(botMiddleChild) && botLeftChild.isEqualNode(botRightChild)){
    setTimeout(2000)
    winMessage.textContent = `${win}`
    winMessage.style.color = 'green'
  }else if(topLeftChild.isEqualNode(midMiddleChild) && topLeftChild .isEqualNode(botRightChild)){
    setTimeout(2000)
    winMessage.textContent = `${win}`
    winMessage.style.color = 'green'
  }else if(topRightChild.isEqualNode(midMiddleChild) && topRightChild.isEqualNode(botLeftChild)){
    setTimeout(2000)
    winMessage.textContent = `${win}`
    winMessage.style.color = 'green'
  }else{
    setTimeout(2000)
    winMessage.textContent = `${lose}`
    winMessage.style.color = 'red'
  }
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
  
  