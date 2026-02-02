// DOM Elements
const landingPage = document.getElementById('landingPage');
const messagePage = document.getElementById('messagePage');
const enterButton = document.getElementById('enterButton');
const musicPlayer = document.getElementById('musicPlayer');
const backgroundMusic = document.getElementById('backgroundMusic');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const volumeSlider = document.getElementById('volumeSlider');
const mainImage = document.getElementById('mainImage');
const heartsBg = document.getElementById('heartsBg');
const signerName = document.getElementById('signerName');

// Configuration
const CONFIG = {
    // Set your name here
    yourName: "Alex", // Change this to your name
    
    // Images to cycle through (Unsplash URLs)
    images: [
        "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1529254479751-fbacb4c7a587?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    
    // Heart colors for background
    heartColors: ['#ff4d8d', '#ff3366', '#ff6b9d', '#ff99c2']
};

// Initialize the website
function init() {
    // Set your name
    signerName.textContent = CONFIG.yourName;
    
    // Create floating hearts
    createFloatingHearts();
    
    // Set up event listeners
    setupEventListeners();
    
    // Start image rotation
    startImageRotation();
}

// Create floating hearts in background
function createFloatingHearts() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Random properties
        const size = Math.random() * 20 + 10;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 10;
        const animationDelay = Math.random() * 5;
        const opacity = Math.random() * 0.5 + 0.3;
        
        // Apply properties
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${left}vw`;
        heart.style.top = `-30px`;
        heart.style.animationDuration = `${animationDuration}s`;
        heart.style.animationDelay = `${animationDelay}s`;
        heart.style.opacity = opacity;
        
        // Random color
        const color = CONFIG.heartColors[Math.floor(Math.random() * CONFIG.heartColors.length)];
        heart.style.background = color;
        
        heartsBg.appendChild(heart);
    }
}

// Set up all event listeners
function setupEventListeners() {
    // Enter button click handler
    enterButton.addEventListener('click', showMessagePage);
    
    // Music controls
    playBtn.addEventListener('click', playMusic);
    pauseBtn.addEventListener('click', pauseMusic);
    volumeSlider.addEventListener('input', adjustVolume);
    
    // Auto-play music when page is shown (with user interaction)
    document.addEventListener('click', handleFirstInteraction, { once: true });
}

// Handle first user interaction
function handleFirstInteraction() {
    // Try to play music automatically after user interaction
    playMusic();
}

// Show message page with animation
function showMessagePage() {
    // Animate landing page out
    landingPage.style.opacity = '0';
    landingPage.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        landingPage.style.display = 'none';
        
        // Show message page with animation
        messagePage.style.display = 'block';
        setTimeout(() => {
            messagePage.style.opacity = '1';
            messagePage.style.transform = 'translateY(0)';
        }, 50);
        
        // Show music player
        setTimeout(() => {
            musicPlayer.style.opacity = '1';
            musicPlayer.style.transform = 'translateY(0)';
        }, 1000);
        
        // Play music automatically when entering
        setTimeout(() => {
            playMusic();
        }, 1500);
        
    }, 500);
}

// Image rotation for animation
let currentImageIndex = 0;
let imageRotationInterval;

function startImageRotation() {
    // Change image every 5 seconds
    imageRotationInterval = setInterval(changeImage, 5000);
}

function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % CONFIG.images.length;
    mainImage.style.opacity = 0;
    
    setTimeout(() => {
        mainImage.src = CONFIG.images[currentImageIndex];
        mainImage.style.opacity = 1;
    }, 500);
}

// Music control functions
function playMusic() {
    backgroundMusic.play()
        .then(() => {
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'flex';
            updateSongInfo();
        })
        .catch(error => {
            console.log("Autoplay prevented. User needs to interact first.");
            // Show play button if autoplay fails
            playBtn.style.display = 'flex';
            pauseBtn.style.display = 'none';
        });
}

function pauseMusic() {
    backgroundMusic.pause();
    playBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';
}

function adjustVolume() {
    backgroundMusic.volume = volumeSlider.value;
}

function updateSongInfo() {
    // In a real implementation, you might fetch this from the audio metadata
    const songTitle = document.getElementById('songTitle');
    const songArtist = document.getElementById('songArtist');
    
    // These would typically come from audio metadata
    songTitle.textContent = "My Love For You";
    songArtist.textContent = "Romantic Melody";
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', init);