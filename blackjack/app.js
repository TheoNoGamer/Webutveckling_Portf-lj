


function createDeck(deck, playerHand, dealerHand) {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];

    for (let suit of suits) {
        for (let i = 0; i < ranks.length; i++) {
            deck[0].push(ranks[i]);
            deck[1].push(suit);
            deck[2].push(values[i]);
        }
    }

    console.log('deck', deck);
}

function dealInitialCards(deck, playerHand, dealerHand) {
    dealRandomCard(deck, playerHand);
    dealRandomCard(deck, dealerHand);
    dealRandomCard(deck, playerHand);
    dealRandomCard(deck, dealerHand);

    updateCardDisplay(playerHand, "player");
    updateCardDisplay(dealerHand, "dealer");

    hideDealersSecondCard();
}

function hideDealersSecondCard() {
    var dealersCardDisplay = document.getElementById("dealer-card-display");
    var cards = dealersCardDisplay.getElementsByClassName("card");
    cards[1].style.color = "red"; // to be transperant in final build
}


function showDealersCards() {
    var dealersCardDisplay = document.getElementById("dealer-card-display");
    var cards = dealersCardDisplay.getElementsByClassName("card");
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.color = "black";
    }
} 


function updateCardDisplay(hand, playerOrDealer) {
    var cardDisplay = document.getElementById(playerOrDealer + "-card-display");
    
    cardDisplay.innerHTML = '';

    for (var i = 0; i < hand.length; i += 3) {
        var card = document.createElement("div");
        card.className = "card";
        card.style.display = "block";
        card.innerHTML = `
            <div class="card-content">
                <div class="card-suit">${hand[i + 1]}</div>
                <div class="card-value">${hand[i]}</div>
            </div>
        `;
        cardDisplay.appendChild(card);
    }
}

function dealRandomCard(deck, hand) {
    var randomIndex = Math.floor(Math.random() * deck[0].length);

    hand.push(deck[0][randomIndex]);
    hand.push(deck[1][randomIndex]);
    hand.push(deck[2][randomIndex]);

    deck[0].splice(randomIndex, 1);
    deck[1].splice(randomIndex, 1);
    deck[2].splice(randomIndex, 1);
    
}



function checkIfWinner(playerHand, dealerHand, deck) {
    var playerScore = 0;
    var dealerScore = 0;
    
    for (let index = 0; index < playerHand.length; index += 3) {
        playerScore += playerHand[index + 2];
    }
    
    for (let index = 0; index < dealerHand.length; index += 3) {
        dealerScore += dealerHand[index + 2];
    }
    
    if (playerScore > 21 || dealerScore === 21) {
        console.log("Dealer wins!");
    } else if (dealerScore > 21 || playerScore === 21) {
        console.log("Player wins!");
    }
}

function playerTurn(deck, playerHand, dealerHand) {
    var hitButton = document.getElementById("hit-button");
    var standButton = document.getElementById("stand-button");
    
    hitButton.addEventListener("click", function() {
        dealRandomCard(deck, playerHand);
        updateCardDisplay(playerHand, "player");
    });
    
    standButton.addEventListener("click", function() {
        // TODO: Implement dealer's turn
    });

    checkIfWinner(playerHand, dealerHand, deck);

}

function dealerTurn(deck, playerHand, dealerHand) {
    // TODO: Implement dealer's turn
}

function playLoop(deck, playerHand, dealerHand) {
    // TODO: Implement player's turn
    // TODO: Implement dealer's turn
    // TODO: Determine winner
    // TODO: Display results
        
    playerTurn(deck, playerHand, dealerHand);
    


    
}



function initGame() {
    gameLoop();
}

function gameLoop() {
    // TODO: Implement game logic
    // 1. Create deck (done)
    // 2. Shuffle deck (implemented partially when dealing random card)
    // 3. Deal initial cards (done)
    // 4. Display initial hands (done)
    // 5. Hide dealer's second card (done)
    // 6. Player's turn
    // 7. Dealer's turn
    // 8. Determine winner
    // 9. Display results

    var deck = [[], [], []]; // [0] = cards, [1] = suits, [2] = values
    var playerHand = [];
    var dealerHand = [];

    createDeck(deck, playerHand, dealerHand);

    dealInitialCards(deck, playerHand, dealerHand);
    console.log('deck after initial deal', deck);

    playLoop(deck, playerHand, dealerHand);

}


initGame();

initGame();
