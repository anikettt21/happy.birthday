document.addEventListener('DOMContentLoaded', () => {
    // References to DOM elements
    const cakeContainer = document.getElementById('cake-container');
    const openBookBtn = document.getElementById('open-book-btn');
    const candlesCountDisplay = document.getElementById('candles-count');
    const blowSound = document.getElementById('blowSound');
    const bookContainer = document.getElementById('book-container');
    
    // Candle settings
    const totalCandles = 5;
    let remainingCandles = totalCandles;
    let candlesBlown = 0;
    let canInteract = false;
    
    // Initialize cake
    function initCake() {
        createCandles();
        addDecorations();
        
        // Initially hide the button
        openBookBtn.style.display = 'none';
        
        // Enable interaction with candles
        setTimeout(() => {
            canInteract = true;
        }, 1500);
    }
    
    
// Creating properly aligned candles
function createCandles() {
    const cake = document.querySelector('.cake');
    const cakeTop = document.querySelector('.cake-top');
    
    // Clear any existing candles first
    const existingCandles = cake.querySelectorAll('.candle');
    existingCandles.forEach(candle => candle.remove());
    
    // Set candles in position
    const candleWidth = 10;
    const cakeWidth = 140; // Width of cake-top
    const spacing = (cakeWidth - (totalCandles * candleWidth)) / (totalCandles + 1);
    
    for (let i = 0; i < totalCandles; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        
        // Calculate left position to distribute evenly
        const leftPosition = 30 + spacing + (i * (candleWidth + spacing));
        
        // Position candles with proper z-index and small random tilt
        candle.style.left = `${leftPosition}px`;
        candle.style.bottom = '150px'; // Increased height to place on top of the cake
        candle.style.transform = `translateZ(${20 + i * 2}px) rotate(${-2 + Math.random() * 4}deg)`;
        
        // Create flame
        const flame = document.createElement('div');
        flame.className = 'flame';
        
        const innerFlame = document.createElement('div');
        innerFlame.className = 'inner-flame';
        
        flame.appendChild(innerFlame);
        candle.appendChild(flame);
        
        // Add click event
        candle.addEventListener('click', () => blowCandle(candle));
        
        cake.appendChild(candle);
    }
}

// Enhanced candle styles
function addCandleStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .candle {
            position: absolute;
            width: 10px;
            height: 50px;
            background: linear-gradient(to top, #ef4444, #fcd34d);
            border-radius: 5px;
            cursor: pointer;
            transform-style: preserve-3d;
            transition: transform 0.3s ease;
            box-shadow: 0 0 5px rgba(0,0,0,0.2);
        }
        
        .candle:hover {
            transform: translate3d(0, -5px, 0) !important;
        }
        
        .candle::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 5px;
            background: #fef3c7;
            border-radius: 5px 5px 0 0;
            top: 0;
        }
    `;
    document.head.appendChild(styleElement);
}
    
    // Add decorative elements to cake
    function addDecorations() {
        const cake = document.querySelector('.cake');
        
        // Add sprinkles
        for (let i = 0; i < 30; i++) {
            const sprinkle = document.createElement('div');
            sprinkle.className = 'sprinkle';
            
            // Random positions and colors
            const colors = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6'];
            const leftPosition = 10 + Math.random() * 160;
            const bottomPosition = 10 + Math.random() * 150;
            const rotation = Math.random() * 180;
            
            sprinkle.style.left = `${leftPosition}px`;
            sprinkle.style.bottom = `${bottomPosition}px`;
            sprinkle.style.transform = `translateZ(15px) rotate(${rotation}deg)`;
            sprinkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            cake.appendChild(sprinkle);
        }
        
        // Add cherries
        for (let i = 0; i < 5; i++) {
            const cherry = document.createElement('div');
            cherry.className = 'cherry';
            
            const leftPosition = 20 + i * 35;
            const bottomPosition = 120 + (i % 2) * 15;
            
            cherry.style.left = `${leftPosition}px`;
            cherry.style.bottom = `${bottomPosition}px`;
            cherry.style.transform = `translateZ(20px)`;
            
            cake.appendChild(cherry);
        }
    }
    
    // Handle blowing out a candle
    function blowCandle(candle) {
        if (!canInteract || !candle.querySelector('.flame')) return;
        
        // Play blow sound
        blowSound.currentTime = 0;
        blowSound.play();
        
        // Hide flame with animation
        const flame = candle.querySelector('.flame');
        flame.classList.add('extinguish');
        
        // Create smoke effect
        createSmokeEffect(candle);
        
        // Remove flame after animation
        setTimeout(() => {
            flame.remove();
            
            // Update counters
            remainingCandles--;
            candlesBlown++;
            candlesCountDisplay.textContent = remainingCandles;
            
            // Check if all candles are blown
            if (remainingCandles === 0) {
                setTimeout(allCandlesBlown, 1000);
            }
        }, 500);
    }
    
    // Create smoke effect after candle is blown
    function createSmokeEffect(candle) {
        const candleRect = candle.getBoundingClientRect();
        const candleX = candleRect.left + candleRect.width / 2;
        const candleY = candleRect.top;
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const smoke = document.createElement('div');
                smoke.className = 'smoke';
                
                // Position at the top of the candle
                smoke.style.left = `${candleX}px`;
                smoke.style.top = `${candleY}px`;
                
                document.body.appendChild(smoke);
                
                // Remove smoke element after animation
                setTimeout(() => {
                    smoke.remove();
                }, 2000);
            }, i * 200);
        }
    }
    
   // All candles blown celebration
function allCandlesBlown() {
    const cake = document.querySelector('.cake');
    cake.classList.add('celebrate');
        
         // Show message
    const cakeMessage = document.querySelector('.cake-message');
    cakeMessage.innerHTML = '<h2>Your wish has been made!</h2><p>Now open your special birthday book!</p>';
    
        
        // Make button more prominent
        openBookBtn.style.display = 'block';
        openBookBtn.classList.add('bounce-in');
        openBookBtn.classList.add('pulse');
    }
    
    // Open book event handler
    openBookBtn.addEventListener('click', () => {
        // Fade out cake container
        cakeContainer.style.opacity = '0';
        
        // Transition to book after animation
        setTimeout(() => {
            cakeContainer.classList.add('hidden');
            cakeContainer.classList.remove('active');
            
            bookContainer.classList.remove('hidden');
            bookContainer.classList.add('active');
            bookContainer.style.opacity = '1';
        }, 1000);
    });
    
    // Initialize cake when game is completed
    // This function is called from game.js when memory game is completed
    window.initializeCake = function() {
        initCake();
    };
    
    // If cake container is already active (for testing), initialize cake
    if (!cakeContainer.classList.contains('hidden')) {
        initCake();
    }
});