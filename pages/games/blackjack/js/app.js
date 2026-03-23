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
    var debugDealerCards = false; // Debug: give dealer two aces

    if (debugDealerCards) {
        playerHand.push('A');
        playerHand.push('Hearts');
        playerHand.push(11);
        playerHand.push('A');
        playerHand.push('Diamonds');
        playerHand.push(11);
    } else {
        dealRandomCard(deck, playerHand);
        dealRandomCard(deck, playerHand);
    }

    if (debugDealerCards) {
        dealerHand.push('A');
        dealerHand.push('Clubs');
        dealerHand.push(11);
        dealerHand.push('A');
        dealerHand.push('Spades');
        dealerHand.push(11);
    } else {
        dealRandomCard(deck, dealerHand);
        dealRandomCard(deck, dealerHand);
    }

    updateCardDisplay(playerHand, "player");
    updateCardDisplay(dealerHand, "dealer");

    hideDealersSecondCard();
}

function hideDealersSecondCard() {
    var dealersCardDisplay = document.getElementById("dealer-card-display");
    var cards = dealersCardDisplay.getElementsByClassName("card");
    var dealerScoreElement = document.getElementById("dealer-score");
    cards[1].style.color = "transparent"; 
    dealerScoreElement.style.display = "none";
}

function showDealersCards() {
    var dealersCardDisplay = document.getElementById("dealer-card-display");
    var cards = dealersCardDisplay.getElementsByClassName("card");
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.color = "black";
    }
    var dealerScoreElement = document.getElementById("dealer-score");
    dealerScoreElement.style.display = "block";
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

function checkIfAbove21(playerHand, dealerHand, deck) {
    var playerScoreElement = document.getElementById("player-score");
    var dealerScoreElement = document.getElementById("dealer-score");
    var playerScore = 0;
    var dealerScore = 0;
    
    var playerAces = 0;
    for (let index = 0; index < playerHand.length; index += 3) {
        playerScore += playerHand[index + 2];
        if (playerHand[index] == 'A') {
            playerAces++;
        }
    }
    
    while (playerScore > 21 && playerAces > 0) {
        playerScore -= 10;
        playerAces--;
    }
    
    var dealerAces = 0;
    for (let index = 0; index < dealerHand.length; index += 3) {
        dealerScore += dealerHand[index + 2];
        if (dealerHand[index] == 'A') {
            dealerAces++;
        }
    }
    
    while (dealerScore > 21 && dealerAces > 0) {
        dealerScore -= 10;
        dealerAces--;
    }

    playerScoreElement.textContent = playerScore;
    dealerScoreElement.textContent = dealerScore;
    if (playerScore === 21 && dealerScore === 21) {
        showDealersCards()
        endGame(deck, playerHand, dealerHand, 'tie');
    }
    else if (playerScore > 21 || dealerScore === 21) {
        showDealersCards()
        endGame(deck, playerHand, dealerHand, 'dealer');
    } else if (dealerScore > 21 || playerScore === 21) {
        showDealersCards()
        endGame(deck, playerHand, dealerHand, 'player');
    }
    else {
        return true;
    }
}

function playerTurn(deck, playerHand, dealerHand) {
    var hitButton = document.getElementById("hit-button");
    var standButton = document.getElementById("stand-button");
    
    hitButton.addEventListener("click", function() {
        dealRandomCard(deck, playerHand);
        updateCardDisplay(playerHand, "player");

        if (checkIfAbove21(playerHand, dealerHand, deck)) {
            dealerTurn(deck, playerHand, dealerHand, 0);
        }
    });
    
    standButton.addEventListener("click", function() {
        dealerTurn(deck, playerHand, dealerHand, 1);
    });

    checkIfAbove21(playerHand, dealerHand, deck);

}

function dealerTurn(deck, playerHand, dealerHand, playerStand) {

    var totalDealerHand = 0;

    setTimeout(function() {
        showDealersCards();
    
    
        var dealerAces = 0;
        for (let index = 0; index < dealerHand.length; index += 3) {
            totalDealerHand += dealerHand[index + 2];
            if (dealerHand[index] == 'A') {
                dealerAces++;
            }
        }
        
        while (totalDealerHand > 21 && dealerAces > 0) {
            totalDealerHand -= 10;
            dealerAces--;
        }
        
        if (totalDealerHand < 17) {
            setTimeout(function() {
                dealRandomCard(deck, dealerHand);
                updateCardDisplay(dealerHand, "dealer");

                checkIfAbove21(playerHand, dealerHand, deck);
            }, 800);
        }
    }, 400);
    checkIfAbove21(playerHand, dealerHand, deck);

    if (playerStand === 1) {
        endGame(deck, playerHand, dealerHand, 'stand');
    }
}

function winnerPopup(winner) {

    setTimeout(function() {
        var popup = document.getElementById("winner-popup");
        popup.style.display = "block";
        
        var winnerText = document.getElementById("winner-text");

        if (winner === "tie") {
            winnerText.textContent = "It's a tie!";
        } else {
            winnerText.textContent = winner + " wins!";
        }


    }, 500);
}

function hasWon(player_or_dealer) {

    if (player_or_dealer === "player") {
        winnerPopup("player");
    }
    else if (player_or_dealer === "dealer") {
        winnerPopup("dealer");
    }
    else if (player_or_dealer === "tie") {
        winnerPopup("tie");
    }
}

function endGame(deck, playerHand, dealerHand, winner) {
    console.log("Game ended");

    if (winner == 'stand') {
        var playerScoreElement = document.getElementById("player-score");
        var dealerScoreElement = document.getElementById("dealer-score");
        var playerScore = 0;
        var dealerScore = 0;
        
        var playerAces = 0;
        for (let index = 0; index < playerHand.length; index += 3) {
            playerScore += playerHand[index + 2];
            if (playerHand[index] == 'A') {
                playerAces++;
            }
        }
        
        while (playerScore > 21 && playerAces > 0) {
            playerScore -= 10;
            playerAces--;
        }
        
        var dealerAces = 0;
        for (let index = 0; index < dealerHand.length; index += 3) {
            dealerScore += dealerHand[index + 2];
            if (dealerHand[index] == 'A') {
                dealerAces++;
            }
        }
        
        while (dealerScore > 21 && dealerAces > 0) {
            dealerScore -= 10;
            dealerAces--;
        }

        playerScoreElement.textContent = playerScore;
        dealerScoreElement.textContent = dealerScore;

        if (playerScore > dealerScore) {
            hasWon("player");
        }
        else if (playerScore < dealerScore) {
            hasWon("dealer");
        }
        else {
            hasWon("tie");
        }


    }
    else if (winner == 'player') {
        hasWon("player");
    }
    else if (winner == 'dealer') {
        hasWon("dealer");
    }
    else if (winner == 'tie') {
        hasWon("tie");
    }
    
}

function initGame() {
    gameLoop();

    var restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", function() {
        var popup = document.getElementById("winner-popup");
        popup.style.display = "none";
        console.clear("Reset game");
        gameLoop();
    });
}

function gameLoop() {
    var deck = [[], [], []]; // [0] = cards, [1] = suits, [2] = values
    var playerHand = [];
    var dealerHand = [];

    createDeck(deck, playerHand, dealerHand);

    dealInitialCards(deck, playerHand, dealerHand);

    playerTurn(deck, playerHand, dealerHand);

}


initGame();


