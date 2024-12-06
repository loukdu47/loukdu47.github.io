const cards = document.querySelectorAll('.memory-card');
const game = document.getElementById("memory-game")

let hasFlippedCard = false; /* si les cartes sont retourne*/
let lockBoard = false; /* pour ne pas retourner les carte quand on les cliques dessus*/
let firstCard, secondCard; /* premiere et deuxieme cartes*/
let score = document.getElementById("Score").innerText /*le score*/
score = 0;

let consecutiveMatch = 0; /* Le nombre de pairs consecutives*/
let pair =0; /* le nombre de pairs*/
let totalPairs = cards.length /2; /* le nombre de pairs qu'on peut faire dans le jeu*/
const playAudio = document.getElementById("TYFYL");

/**
 * fonction qui retourne la premiere et deuxieme carte avec this.
 * 
 */
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');
  

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

/**
 * fonction qui regarde les deux dataset des cartes pour voir si ils sont egaux
 */
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards()  : unflipCards();
}
/**
 * fonction qui s'active losrque il y a une pair. 
 */
function disableCards() {
  //enleve le Eventlistener
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  //ajouter 1 au match consecutif et au pair
  consecutiveMatch++;
  pair++;

addScore();
//toute les paires sont trouve
if (pair === totalPairs){
  endGame();
}
  resetBoard();
}
/**
 * fonction qui s'active lorsque ce n'est pas une pair, elle verouille et reset le tableau pendant 750ms
 */
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
      consecutiveMatch = 0;
    resetBoard();
  }, 750);
}
/**
 * il retourne le tableau a la conditoin qu'il etait
 */
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false]; //rendre la valeur faux et rendre le tableau cliquable
  [firstCard, secondCard] = [null, null];  //reset la valeur des deux cartes retournev (rend les cartes retourne non cliquables)
}
/**
 * shuffle() brasse les cartes quand on load la page
 */
(function shuffle() {
  
  cards.forEach(card => {
    
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
    console.log("hi");
  });
})();
/**
 * lorsque qu'on fait rejouer, il rebrasse les cartes
 */
function shuffleAgain() {
  
  cards.forEach(card => {
    
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
    console.log("hi");
  });
};
/**
 * cette fonction calcule le score qu'il faut donne et affiche le score dans le span
 */
function addScore() {
  const increment = (consecutiveMatch * 100); // Calcul du score en fonction des paires consécutives
  score += increment;

  // Met à jour l'affichage du score dans le DOM
  const scoreElement = document.getElementById('Score');
  scoreElement.innerText = score.toString().padStart(6, '0'); // Affiche le score avec 6 chiffres
}
/**
 * ecran d'affichage apres que toutes les pairs soit trouve. 
 */
function endGame() {
  game.classList.add('hidden')
  const endScreen = document.getElementById('end-screen'); //le id est l'ecran de fin
  const finalScore = document.getElementById('final-score'); // Afficher le score sur l'ecran de fin
  const message = document.getElementById("message"); //Un petit message motivateur :)
  if (score >= 1100){

    message.innerText = "pas mal chill !";
    
  }
  if (score >= 1500) {
    message.innerText = "Wow! Super chill!";
  }
  if (score >= 2099){
    message.innerText = " Félicitations! Vous avez atteint le score maximal! Trop Chill !";
  }
  
 
  if (score < 1100){
    message.innerText = "Hou là là pas vraiment chill... ";
  }
  
  finalScore.innerText = score.toString().padStart(6, '0');

  endScreen.classList.remove('hidden');
  console.log("fin de jeu");
}
/**
 * Fonction qui reset le jeu ainsi que les valeurs pour qu'il soient comme au depart 
 */
function restartGame() {
  
  const endScreen = document.getElementById('end-screen');
  console.log(endScreen)
  endScreen.classList.add('hidden');
  game.classList.remove('hidden');
  score = 0;
  pair = 0;
  consecutiveMatch = 0;

  const scoreElement = document.getElementById('Score');
  scoreElement.innerText = '000000';


  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);; //enleve la classe flip et ajoute le Eventlistener a toutes les cartes (ils ont tous ete enleve)


});

shuffleAgain();
  resetBoard();
}
cards.forEach(card => card.addEventListener('click', flipCard));
document.getElementById('bouton').addEventListener('click', restartGame);


const closeBtn = document.getElementById('close-btn');
const dialog = document.getElementById('main-dialog');
const affichePlus = document.getElementById("plsClose")


closeBtn.addEventListener('click', afficheJeu);
plsClose.addEventListener('click', fermePourToujours);
/**
 * la fonction affiche jeu enleve la classe hidden des conteneurs du jeu, il mets l'image dans le background et il fais jouer Thank you for your love.
 */
function afficheJeu() {
  
 
  game.classList.remove("hidden");
  document.getElementById("theGame").classList.remove("hidden")
  const imageBackground = document.querySelector("body");
  imageBackground.style.backgroundImage = "url('./img/thankYouForYourLove.webp')";
  
  playAudio.play();
  if(playAudio.play()){
    console.log("audio is playing")
  }
}
//localStorage.removeItem('affichePas');
/**
 * fais la meme chose que afficheJeu, mais donne une valeur au local storage 
 */
function fermePourToujours() {
  localStorage.setItem('affichePas', true);
  afficheJeu();
}
/* ici on decide si le fenetre de dialog est ouverte ou non*/
if(localStorage.getItem('affichePas') === 'true' ) {
dialog.close();
afficheJeu();
}
if(localStorage.getItem('affichePas') === null){
  
  dialog.showmodal();
  afficheJeu();
}
