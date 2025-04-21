document.addEventListener('DOMContentLoaded', () => {
    const book = document.getElementById('book');
    const pages = document.querySelectorAll('.page');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const celebrateBtn = document.getElementById('celebrate-btn');
    let currentPage = 0;
    let isAnimating = false;

    // Initialize book
    function initBook() {
        // Position pages in 3D space
        pages.forEach((page, index) => {
            page.style.zIndex = pages.length - index;
        });
        
        updatePageControlsState();
    }

    function turnPage(direction) {
        if (isAnimating) return;
        isAnimating = true;

        // Play page flip sound
        const flipSound = document.getElementById('flipSound');
        flipSound.currentTime = 0;
        flipSound.play();

        if (direction === 'next' && currentPage < pages.length - 1) {
            const currentPageElem = pages[currentPage];
            currentPageElem.style.transform = 'rotateY(-180deg)';
            currentPage++;
        } else if (direction === 'prev' && currentPage > 0) {
            currentPage--;
            const currentPageElem = pages[currentPage];
            currentPageElem.style.transform = 'rotateY(0deg)';
        }

        setTimeout(() => {
            isAnimating = false;
            updatePageControlsState();
        }, 800);
    }
    function updatePageControlsState() {
        // Update navigation button states
        prevPageBtn.disabled = currentPage === 0;
        prevPageBtn.style.opacity = currentPage === 0 ? "0.5" : "1";
        
        nextPageBtn.disabled = currentPage === pages.length - 1;
        nextPageBtn.style.opacity = currentPage === pages.length - 1 ? "0.5" : "1";
        
        // Add special animation if we're on the final page
        if (currentPage === pages.length - 1) {
            celebrateBtn.classList.add('pulse');
        } else {
            celebrateBtn.classList.remove('pulse');
        }
    }

    // Click handlers for book pages
    book.addEventListener('click', (e) => {
        // Only handle clicks directly on the book, not its buttons
        if (e.target === book || e.target.closest('.page')) {
            turnPage('next');
        }
    });
    
    // Button handlers
    prevPageBtn.addEventListener('click', () => turnPage('prev'));
    nextPageBtn.addEventListener('click', () => turnPage('next'));
    
    // Celebration button
    celebrateBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent book page from turning
        launchCelebration();
    });
    
    function launchCelebration() {
        const celebrationSound = document.getElementById('celebrationSound');
        celebrationSound.play();
        
        // Show confetti
        const confettiContainer = document.getElementById('confetti-container');
        confettiContainer.classList.remove('hidden');
        
        // Trigger confetti animation
        createConfetti();
    }

    // Initialize the book
    initBook();
});