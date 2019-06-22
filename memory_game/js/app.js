let listOfCardItems = [
    'fa fa-diamond', 'fa fa-diamond',
    'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
    'fa fa-anchor','fa fa-anchor',
    'fa fa-bolt', 'fa fa-bolt',
    'fa fa-cube', 'fa fa-cube',
    'fa fa-leaf', 'fa fa-leaf',
    'fa fa-bicycle', 'fa fa-bicycle',
    'fa fa-bomb','fa fa-bomb'];


let card;
let deck;
let newCard;
let cardImage;
let seconds = 0, minutes = 0, hours = 0, t;
let time = document.querySelector('.timer');

// reload functionality sourced from https://stackoverflow.com/questions/49589574/location-reload-in-addeventlistener
let reloadButton = document.querySelector('.restart');
reloadButton.addEventListener('click', function () { location.reload() });

function startGame() {
    deck = document.querySelector('.deck');
    shuffle(listOfCardItems);

    listOfCardItems.forEach(card => {
        createCards(card);
    });
    function createCards(card) {
        newCard = document.createElement('li');
        newCard.setAttribute('class', 'card');
        cardImage = document.createElement('i');
        cardImage.setAttribute('class', `${card}`);
        deck.append(newCard);
        newCard.append(cardImage);
    };
};

//timer function sourced from https://jsfiddle.net/Daniel_Hug/pvk6p/

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        };
    };

    time.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") 
                        + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") 
                        + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
};


function timer() {
    t = setTimeout(add, 1000);
};


function endGame() {
    if (numOfMatches == 8) {
        clearTimeout(t);
        endTime = time.textContent;
        document.querySelector('.modal-body').innerHTML = 
            `<p>Congrats, you have finished the game in ${numOfMoves} moves.</p>
            <p>It also took you ${endTime} where HH:MM:SS. That means ${rating}.</p>`;
        displayModal();
        hideModal();
    };
};

// modal content sourced from https://www.w3schools.com/howto/howto_css_modals.asp
const modal = document.getElementById("myModal");

function displayModal() {
    modal.style.display = "block";
};

// button to play again on pop-up modal
let playAgainButton = document.querySelector('.modal-footer');
playAgainButton.addEventListener('click', function () { location.reload() });


// function that lets user close modal when by clicking on <span> (x)
function hideModal() {
    let xbutton = document.querySelector('.close');
    xbutton.addEventListener('click', function () { modal.style.display = "none" });
};


startGame();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporarycard, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporarycard = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporarycard;
    };

    return array;
};


const allMyCards = document.querySelectorAll('.card');
let card_1 = null; 
let card_2 = null;
let openCards = false;
let disableMoves = false; 
let movesObject = document.querySelector('.moves');
let numOfMoves = 0;

// function that counts the number of moves
function moves() {
    numOfMoves++;
    movesObject.innerHTML = numOfMoves;
    starRating();
    if (numOfMoves == 1) {
        timer();
    };

};

let stars = document.querySelector('.score-panel .stars');
let rating;

// function to calculate the relevant star rating and update the HTML
function starRating() {
    if (numOfMoves < 10) {
        rating = 'you have a high star rating'
        stars.innerHTML = 
            `<li><i class="fa fa-star"></i></li>
        	<li><i class="fa fa-star"></i></li>
        	<li><i class="fa fa-star"></i></li>`;
    } else if (numOfMoves < 13) {
        rating = 'you have a medium star rating';
        stars.innerHTML = 
        `<li><i class="fa fa-star"></i></li>
        <li style="display: none;"><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`;
    } else {
        rating = 'you have a low star rating';
        stars.innerHTML = 
        `<li><i class="fa fa-star"></i></li>
        <li style="display: none;"><i class="fa fa-star"></i></li>
        <li style="display: none;"><i class="fa fa-star"></i></li>`;
    };
};

// function that manages the card opening and closing
function showCard() {
    // to prevent user clicking additional cards and firing off logic from if card_1 and card_2 movement is still in progress
    if (disableMoves) {
        return;
    };

    // to prevent user double clicking the same card and breaking our matchCardsLogic logic
    if (this === card_1) {
        return;
    };

    // reveal cards
    this.classList.add('open','show');
    // to make sure the card to be clicked is the first one
    if (!openCards) {
        openCards = true;
        card_1 = this;
    } else {
        card_2 = this;
        // now that we have two cards, compare them
        matchCardsLogic();
        openCards = false;
    };
};

let numOfMatches = 0;

function matchCardsLogic() {
moves();
// compare html attributes of boths cards to check for matches
if (card_1.innerHTML === card_2.innerHTML) {
    matchFound();
    numOfMatches++;
    if (numOfMatches == 8) {
        endGame();
    };
} else {
    noMatchFound();
};
};

// function closes cards when match is not found
function noMatchFound() {
    disableMoves = true;
    setTimeout(() => {
        card_1.classList.remove('open', 'show');
        card_2.classList.remove('open', 'show');
        resetCards();
    }, 1200);
};

// function keeps cards open when a match is found
function matchFound() {
    card_1.classList.remove('open', 'show');
    card_1.classList.add('match');
    card_1.removeEventListener('click', showCard);
    card_2.classList.remove('open', 'show');
    card_2.classList.add('match');
    card_2.removeEventListener('click', showCard);
};

// restore cards to unassigned state
function resetCards() {
    card_1 = null;
    card_2 = null;
    openCards = false;
    disableMoves = false;
};

// let all cards open when user clicks them
allMyCards.forEach(card => card.addEventListener('click', showCard));