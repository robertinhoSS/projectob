//Rutas do proxecto
const assets = "../assets/"

//Declaración de elementos do HTML
const currentScore = document.querySelector('#score')
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
]

//Mensaxes de fin
const win = "WIN  WIN  WIN  WIN  WIN  WIN  WIN  WIN  WIN  WIN  WIN  WIN"
const lose = "LOSE  LOSE  LOSE  LOSE  LOSE  LOSE  LOSE  LOSE  LOSE  LOSE  "

//Estado de la puntuación
let scoreState = JSON.parse(localStorage.getItem('projectob_userScore'))

//Selección dun simbolo aleatorio 
function randomSymbol(){
  return Math.floor(Math.random() * symbols.length)
} 

//Ocorre cando se actualiza a páxina ou se abre por primeira vez 
function initialState(){
  scoreState = JSON.parse(localStorage.getItem('projectob_userScore'))
  //Selección aleatoria de simbolos ao inicio
  for(let outerI = 0; outerI < distribution.length; outerI++ ){
    for(let innerI = 0; innerI < distribution[outerI].length; innerI++){
      let rngSymbol = symbols[randomSymbol()].name
      distribution[outerI][innerI].insertAdjacentHTML('beforeend', `<img class="symbol ${rngSymbol}" src="${assets+rngSymbol}.webp">`)
    }
  }
  currentScore.setAttribute('value', String(scoreState.score))
}

function clearRolls(){
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
  clearRolls()
  calculateScore('coin')
  initialState()
  setTimeout(checkForWin, 500)
  currentScore.setAttribute('value', String(scoreState.score))
}

//Acciona a tragaperras ao pulsar o botón
spinButton.addEventListener('click', spinReels);

//Calcula os puntos cada vez que se consigue unha liña
function calculateScore(node){
  let rating = symbols.find( symbol => symbol.name == node)
  if(rating){
    window.localStorage.setItem('projectob_userScore', JSON.stringify({
      ...scoreState, score: scoreState.score+rating.points
    }))
  }else{
    window.localStorage.setItem('projectob_userScore', JSON.stringify({
      ...scoreState, score: scoreState.score-10
    }))
  }
  scoreState = JSON.parse(localStorage.getItem('projectob_userScore'))
  currentScore.setAttribute('value', String(scoreState.score))
}

function feedbackMessage(result) {
  setTimeout(2000)
  winMessage.textContent = `${result}`
  if(result == win){
    winMessage.style.color = 'green'
  }else{
    winMessage.style.color = 'red'
  }
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
    calculateScore(topLeftChild.className.split(' ')[1])
    feedbackMessage(win)
  }else if(midLeftChild.isEqualNode(midMiddleChild) && midLeftChild.isEqualNode(midRightChild)){
    calculateScore(midMiddleChild.className.split(' ')[1])
    feedbackMessage(win)
  }else if(botLeftChild.isEqualNode(botMiddleChild) && botLeftChild.isEqualNode(botRightChild)){
    calculateScore(botLeftChild.className.split(' ')[1])    
    feedbackMessage(win)    
  }else if(topLeftChild.isEqualNode(midMiddleChild) && topLeftChild .isEqualNode(botRightChild)){
    calculateScore(midMiddleChild.className.split(' ')[1])
    feedbackMessage(win)
  }else if(topRightChild.isEqualNode(midMiddleChild) && topRightChild.isEqualNode(botLeftChild)){
    calculateScore(midMiddleChild.className.split(' ')[1])
    feedbackMessage(win)
  }else{
    feedbackMessage(lose)
  }
}

initialState()