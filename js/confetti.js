function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = [
        '#ff6b6b', '#ffd166', '#06d6a0', '#118ab2', '#a18cd1', 
        '#fbc2eb', '#f6d365', '#fda085', '#ff9a9e', '#fad0c4'
    ];
    const shapes = ['square', 'triangle', 'circle', 'star'];
    const confettiCount = 150;
    
    // Clear any existing confetti
    confettiContainer.innerHTML = '';
    
    for (let i = 0; i < confettiCount; i++) {
        // Create confetti element
        const confetti = document.createElement('div');
        confetti.className = `confetti ${shapes[Math.floor(Math.random() * shapes.length)]}`;
        
        // Random position, color, size and animation
        const left = Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        const animationDuration = Math.random() * 3 + 2;
        const shakeDelay = Math.random() * 2;
        
        confetti.style.left = `${left}%`;
        confetti.style.backgroundColor = color;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.animationDuration = `${animationDuration}s, ${animationDuration * 0.8}s`;
        confetti.style.animationDelay = `0s, ${shakeDelay}s`;
        
        confettiContainer.appendChild(confetti);
    }
    
    // Remove confetti after animation is complete
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 5000);
    
    // Add some special effects to the book
    const book = document.getElementById('book');
    book.style.transform = 'scale(1.05)';
    setTimeout(() => {
        book.style.transform = 'scale(1)';
    }, 500);
}

// Create additional particle effects when a matched pair is found
function createMatchParticles(x, y) {
    const confettiContainer = document.getElementById('confetti-container');
    const particleCount = 15;
    const colors = ['#ff6b6b', '#ffd166', '#06d6a0']; 
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti circle';
        
        const size = Math.random() * 8 + 4;
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 50 + 30;
        const lifetime = Math.random() * 1 + 0.5; // 0.5-1.5 seconds
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Custom animation for match particles
        particle.style.position = 'absolute';
        particle.style.animation = 'none';
        particle.style.opacity = '0.7';
        particle.style.transition = `all ${lifetime}s ease-out`;
        
        confettiContainer.appendChild(particle);
        
        // Trigger animation
        setTimeout(() => {
            const destX = x + Math.cos(angle) * velocity;
            const destY = y + Math.sin(angle) * velocity;
            particle.style.transform = `translate(${destX - x}px, ${destY - y}px)`;
            particle.style.opacity = '0';
        }, 10);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, lifetime * 1000);
    }
}