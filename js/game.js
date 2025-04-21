document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const gameGrid = document.getElementById('game-grid');
    const scoreDisplay = document.getElementById('match-count');
    const timerDisplay = document.getElementById('timer');
    const flipSound = document.getElementById('flipSound');
    const matchSound = document.getElementById('matchSound');
    
    // Game emojis with birthday theme
    const emojis = ['❤️', '🎂', '🎁', '🎈'];
    const cards = [...emojis, ...emojis];
    let flippedCards = [];
    let matchedPairs = 0;
    let isProcessing = false;
    let startTime;
    let timerInterval;

    // Shuffle cards
    cards.sort(() => Math.random() - 0.5);

    // Create cards with front and back
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        
        // Create front and back of card
        const front = document.createElement('div');
        front.className = 'front';
        
        const back = document.createElement('div');
        back.className = 'back';
        back.textContent = emoji;
        
        card.appendChild(front);
        card.appendChild(back);
        
        card.addEventListener('click', () => flipCard(card));
        gameGrid.appendChild(card);
        
        // Add staggered animation for card appearance
        setTimeout(() => {
            card.classList.add('fadeIn');
        }, index * 100);
    });

    // Start timer when game initializes
    startTimer();

    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
        const seconds = (elapsedTime % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }

    function flipCard(card) {
        // Prevent flipping more than 2 cards or already flipped card
        if (isProcessing || flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }
        
        // Play flip sound
        flipSound.currentTime = 0;
        flipSound.play();
        
        // Flip the card
        card.classList.add('flipped');
        flippedCards.push(card);

        // Check for match when 2 cards are flipped
        if (flippedCards.length === 2) {
            isProcessing = true;
            setTimeout(checkMatch, 700);
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        
        if (card1.dataset.emoji === card2.dataset.emoji) {
            // Match found
            matchedPairs++;
            scoreDisplay.textContent = matchedPairs;
            
            card1.classList.add('matched');
            card2.classList.add('matched');
            
            // Play match sound
            matchSound.currentTime = 0;
            matchSound.play();
            
            // Create particles at the matched pair position
            const card1Rect = card1.getBoundingClientRect();
            const card2Rect = card2.getBoundingClientRect();
            
            createMatchParticles(card1Rect.left + card1Rect.width/2, card1Rect.top + card1Rect.height/2);
            createMatchParticles(card2Rect.left + card2Rect.width/2, card2Rect.top + card2Rect.height/2);
            
            // Check if game completed
            if (matchedPairs === emojis.length) {
                gameCompleted();
            }
        } else {
            // No match
            card1.classList.add('shake');
            card2.classList.add('shake');
            
            setTimeout(() => {
                card1.classList.remove('flipped', 'shake');
                card2.classList.remove('flipped', 'shake');
            }, 500);
        }
        
        flippedCards = [];
        isProcessing = false;
    }

    // Game completed function - Show cake instead of book
    function gameCompleted() {
        // Stop the timer
        clearInterval(timerInterval);
        
        // Show congratulations message
        setTimeout(() => {
            // Add fade out animation to game container
            gameContainer.style.transition = 'opacity 1s ease-out';
            gameContainer.style.opacity = 0;
            
            // Show cake after animation completes
            setTimeout(() => {
                gameContainer.classList.remove('active');
                gameContainer.classList.add('hidden');
                
                // Show cake container
                const cakeContainer = document.getElementById('cake-container');
                cakeContainer.classList.remove('hidden');
                cakeContainer.classList.add('active');
                cakeContainer.style.opacity = 1;
                
                // Initialize cake
                if (window.initializeCake) {
                    window.initializeCake();
                }
            }, 1000);
        }, 1000);
    }
    
    // Make the gameCompleted function globally available
    window.gameCompleted = gameCompleted;
});