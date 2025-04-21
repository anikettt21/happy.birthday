document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggleBtn = document.getElementById('music-toggle');
    let isMusicPlaying = false;
    
    // Array of background music tracks
    const musicTracks = [
        'assets/music/blue.mp3',
        'assets/music/happy_birthday.mp3',
        'assets/music/celebration.mp3',
        'assets/music/party.mp3',
        'assets/music/joyful.mp3'
    ];
    
    let currentTrackIndex = 0;
    
    // Set initial volume
    bgMusic.volume = 0.4;

    // Function to play random music track
    function playRandomTrack() {
        // Select random track index
        currentTrackIndex = Math.floor(Math.random() * musicTracks.length);
        bgMusic.src = musicTracks[currentTrackIndex];
        
        // Play music
        playMusic();
    }
    
    // Function to play the next track
    function playNextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
        bgMusic.src = musicTracks[currentTrackIndex];
        playMusic();
    }
    
    // Play music function
    function playMusic() {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }).catch(error => {
            console.error("Error playing music:", error);
        });
    }

    // Add music controls
    function toggleMusic() {
        if (bgMusic.paused) {
            playMusic();
        } else {
            bgMusic.pause();
            isMusicPlaying = false;
            musicToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    }
    
    // Button click handler
    musicToggleBtn.addEventListener('click', toggleMusic);
    
    // Keyboard shortcut
    document.addEventListener('keypress', (e) => {
        if (e.code === 'Space' && document.getElementById('book-container').classList.contains('active')) {
            toggleMusic();
            e.preventDefault(); // Prevent space from scrolling the page
        }
    });
    
    // If music is playing when page is changed, add visual feedback
    bgMusic.addEventListener('play', () => {
        musicToggleBtn.classList.add('pulse');
        setTimeout(() => {
            musicToggleBtn.classList.remove('pulse');
        }, 2000);
    });
    
    // When track ends, play next track
    bgMusic.addEventListener('ended', () => {
        playNextTrack();
    });

    // Play music automatically when page loads
    window.addEventListener('load', function() {
        // Small delay to ensure everything is loaded
        setTimeout(() => {
            playRandomTrack();
        }, 1000);
    });

    // Add observer to detect when book container becomes visible
    const bookContainer = document.getElementById('book-container');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' &&
                bookContainer.classList.contains('active')) {
                // Play music if it's not already playing when book becomes visible
                if (bgMusic.paused) {
                    setTimeout(() => {
                        playMusic();
                    }, 1000);
                }
            }
        });
    });
    
    // Start observing the book container for class changes
    observer.observe(bookContainer, { attributes: true });
});