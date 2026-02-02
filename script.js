// DOM Elements
const coverPage = document.getElementById('coverPage');
const mainContent = document.getElementById('mainContent');
const envelopeWrapper = document.getElementById('envelopeWrapper');
const envelope = document.getElementById('envelope');
const backgroundMusic = document.getElementById('backgroundMusic');
const heartSound = document.getElementById('heartSound');
const sparkleSound = document.getElementById('sparkleSound');
const photoChangeSound = document.getElementById('photoChangeSound');
const loveMeter = document.getElementById('loveMeter');
const boostLove = document.getElementById('boostLove');
const sendLove = document.getElementById('sendLove');
const heartCount = document.getElementById('heartCount');
const loveCanvas = document.getElementById('loveCanvas');
const clearCanvas = document.getElementById('clearCanvas');
const saveCanvas = document.getElementById('saveCanvas');
const surpriseBtn = document.getElementById('surpriseBtn');
const loveTime = document.getElementById('loveTime');
const replayBtn = document.getElementById('replayBtn');
const shareBtn = document.getElementById('shareBtn');
const signatureName = document.getElementById('signatureName');
const confettiCanvas = document.getElementById('confettiCanvas');

// Gallery Elements
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const autoPlayToggle = document.getElementById('autoPlayToggle');
const currentSlide = document.getElementById('currentSlide');
const totalSlides = document.getElementById('totalSlides');
const currentTitle = document.getElementById('currentTitle');
const currentDescription = document.getElementById('currentDescription');

// Configuration
const CONFIG = {
    yourName: "My Dearest Love",
    loveLevel: 100,
    maxLove: 500,
    heartsSent: 0,
    colors: ['#ff6b8b', '#ff9e6d', '#ffd166', '#06d6a0', '#118ab2', '#9d4edd'],
    currentColor: '#ff6b8b',
    canvasHearts: []
};

// Gallery Configuration
const GALLERY = {
    photos: [
        {
            src: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            title: "Our First Laugh",
            description: "The day your smile became my favorite view",
            color: "#ff6b8b"
        },
        {
            src: "https://images.unsplash.com/photo-1529254479751-fbacb4c7a587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            title: "Shared Adventures",
            description: "Exploring the world, hand in colorful hand",
            color: "#ff9e6d"
        },
        {
            src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            title: "Quiet Moments",
            description: "In the silence, our hearts speak the loudest",
            color: "#ffd166"
        },
        {
            src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            title: "Future Dreams",
            description: "Building our forever, together",
            color: "#06d6a0"
        }
    ],
    currentIndex: 0,
    totalSlides: 4,
    autoPlay: true,
    interval: 5000, // 5 seconds
    intervalId: null,
    isTransitioning: false
};

// Initialize
function init() {
    console.log("Initializing Valentine Website...");
    
    // Set your name
    signatureName.textContent = CONFIG.yourName;
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize gallery
    initGallery();
    
    // Initialize confetti
    initConfetti();
    
    // Initialize canvas
    initCanvas();
    
    // Set total slides count
    totalSlides.textContent = GALLERY.totalSlides;
    
    // Try to play music (will work after user interaction)
    setTimeout(() => {
        playMusic();
    }, 1000);
    
    // Start animations
    startAnimations();
    
    console.log("Website initialized successfully!");
}

// Setup Event Listeners
function setupEventListeners() {
    console.log("Setting up event listeners...");
    
    // Open envelope - FIXED: Use wrapper instead of envelope
    envelopeWrapper.addEventListener('click', openEnvelope);
    console.log("Envelope click listener added to wrapper");
    
    // Boost love meter
    boostLove.addEventListener('click', boostLoveMeter);
    
    // Send love
    sendLove.addEventListener('click', sendLoveHeart);
    
    // Canvas interactions
    loveCanvas.addEventListener('click', addHeartToCanvas);
    clearCanvas.addEventListener('click', clearCanvasHearts);
    saveCanvas.addEventListener('click', saveCanvasImage);
    surpriseBtn.addEventListener('click', createSurprise);
    
    // Final buttons
    replayBtn.addEventListener('click', replayExperience);
    shareBtn.addEventListener('click', shareLoveMessage);
    
    // Color palette
    document.querySelectorAll('.color-option').forEach(color => {
        color.addEventListener('click', (e) => {
            e.stopPropagation();
            CONFIG.currentColor = color.dataset.color;
            document.querySelectorAll('.color-option').forEach(c => c.classList.remove('active'));
            color.classList.add('active');
        });
    });
    
    // Auto-play music after user interaction
    document.addEventListener('click', () => {
        playMusic();
    }, { once: true });
    
    console.log("Event listeners setup complete!");
}

// Open Envelope - FIXED FUNCTION
function openEnvelope(e) {
    console.log("Envelope clicked!", e.target);
    
    // Play sound
    playSound(sparkleSound);
    
    // Add opening class to envelope
    envelope.classList.add('open');
    
    // Create confetti immediately
    createConfetti();
    
    // Wait for animation, then show main content
    setTimeout(() => {
        coverPage.classList.add('hidden');
        mainContent.classList.add('active');
        
        // Start all animations
        startContentAnimations();
        
        // Create more confetti
        createConfetti();
        
        console.log("Main content revealed!");
    }, 1000);
}

// Initialize Gallery
function initGallery() {
    console.log("Initializing gallery...");
    
    // Set up gallery navigation
    prevBtn.addEventListener('click', showPrevPhoto);
    nextBtn.addEventListener('click', showNextPhoto);
    autoPlayToggle.addEventListener('click', toggleAutoPlay);
    
    // Start auto-play
    startAutoPlay();
    
    // Update gallery info initially
    updateGalleryInfo();
    
    console.log("Gallery initialized!");
}

// Play Music
function playMusic() {
    backgroundMusic.volume = 0.3;
    backgroundMusic.play().catch(e => {
        console.log("Autoplay prevented. User needs to interact.");
    });
}

// Play Sound Effect
function playSound(sound) {
    sound.currentTime = 0;
    sound.volume = 0.5;
    sound.play().catch(e => console.log("Sound error:", e));
}

// Show Next Photo
function showNextPhoto() {
    if (GALLERY.isTransitioning) return;
    
    GALLERY.currentIndex = (GALLERY.currentIndex + 1) % GALLERY.photos.length;
    changePhoto('next');
}

// Show Previous Photo
function showPrevPhoto() {
    if (GALLERY.isTransitioning) return;
    
    GALLERY.currentIndex = (GALLERY.currentIndex - 1 + GALLERY.photos.length) % GALLERY.photos.length;
    changePhoto('prev');
}

// Change Photo with Animation
function changePhoto(direction) {
    GALLERY.isTransitioning = true;
    
    // Play sound
    playSound(photoChangeSound);
    
    // Get all slides
    const slides = document.querySelectorAll('.photo-slide');
    const currentSlide = slides[GALLERY.currentIndex];
    const prevSlide = document.querySelector('.photo-slide.active');
    
    // Remove active class from all slides
    slides.forEach(slide => {
        slide.classList.remove('active', 'leaving', 'entering');
    });
    
    // Add leaving animation to previous slide
    if (prevSlide) {
        prevSlide.classList.add('leaving');
    }
    
    // Add entering animation to current slide
    currentSlide.classList.add('active', 'entering');
    
    // Add color effect
    addColorEffect(GALLERY.photos[GALLERY.currentIndex].color);
    
    // Update gallery info
    updateGalleryInfo();
    
    // Reset transition flag after animation
    setTimeout(() => {
        GALLERY.isTransitioning = false;
    }, 800);
}

// Add Color Effect
function addColorEffect(color) {
    const galleryDisplay = document.querySelector('.gallery-display');
    
    // Create color overlay
    const colorOverlay = document.createElement('div');
    colorOverlay.className = 'color-effect';
    colorOverlay.style.setProperty('--effect-color', color);
    
    galleryDisplay.appendChild(colorOverlay);
    
    // Remove overlay after animation
    setTimeout(() => {
        if (colorOverlay.parentNode) {
            colorOverlay.remove();
        }
    }, 1500);
}

// Update Gallery Info
function updateGalleryInfo() {
    const currentPhoto = GALLERY.photos[GALLERY.currentIndex];
    currentSlide.textContent = GALLERY.currentIndex + 1;
    currentTitle.textContent = currentPhoto.title;
    currentDescription.textContent = currentPhoto.description;
}

// Start Auto-Play
function startAutoPlay() {
    if (GALLERY.intervalId) {
        clearInterval(GALLERY.intervalId);
    }
    
    GALLERY.intervalId = setInterval(() => {
        if (GALLERY.autoPlay) {
            showNextPhoto();
        }
    }, GALLERY.interval);
    
    // Update auto-play button icon
    autoPlayToggle.innerHTML = '<i class="fas fa-pause"></i>';
}

// Toggle Auto-Play
function toggleAutoPlay() {
    GALLERY.autoPlay = !GALLERY.autoPlay;
    
    if (GALLERY.autoPlay) {
        startAutoPlay();
        autoPlayToggle.innerHTML = '<i class="fas fa-pause"></i>';
        document.querySelector('.auto-play-control span').textContent = 'Auto-playing every 5 seconds';
    } else {
        if (GALLERY.intervalId) {
            clearInterval(GALLERY.intervalId);
            GALLERY.intervalId = null;
        }
        autoPlayToggle.innerHTML = '<i class="fas fa-play"></i>';
        document.querySelector('.auto-play-control span').textContent = 'Paused - Click play to resume';
    }
}

// Boost Love Meter
function boostLoveMeter() {
    if (CONFIG.loveLevel < CONFIG.maxLove) {
        CONFIG.loveLevel += 50;
        if (CONFIG.loveLevel > CONFIG.maxLove) {
            CONFIG.loveLevel = CONFIG.maxLove;
        }
        
        // Update meter
        const percent = (CONFIG.loveLevel / CONFIG.maxLove) * 100;
        loveMeter.style.width = `${percent}%`;
        
        // Play sound
        playSound(heartSound);
        
        // Create sparkles
        createSparkles(boostLove);
        
        // Vibrate if supported
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }
}

// Send Love Heart
function sendLoveHeart() {
    CONFIG.heartsSent++;
    heartCount.textContent = CONFIG.heartsSent;
    
    // Play sound
    playSound(heartSound);
    
    // Create floating heart
    createFloatingHeart(sendLove);
    
    // Animate button
    sendLove.style.transform = 'scale(0.95)';
    setTimeout(() => {
        sendLove.style.transform = 'scale(1)';
    }, 200);
    
    // Vibrate if supported
    if ('vibrate' in navigator) {
        navigator.vibrate(30);
    }
}

// Initialize Canvas
function initCanvas() {
    // Set canvas size
    loveCanvas.width = loveCanvas.offsetWidth;
    loveCanvas.height = loveCanvas.offsetHeight;
}

// Add Heart to Canvas
function addHeartToCanvas(e) {
    const rect = loveCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create heart element
    const heart = document.createElement('div');
    heart.className = 'canvas-heart';
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.color = CONFIG.currentColor;
    heart.style.fontSize = `${Math.random() * 30 + 20}px`;
    heart.style.transform = `rotate(${Math.random() * 360}deg) scale(0)`;
    heart.style.zIndex = '10';
    heart.style.pointerEvents = 'none';
    
    loveCanvas.appendChild(heart);
    
    // Animate heart
    setTimeout(() => {
        heart.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        heart.style.transform = `rotate(${Math.random() * 360}deg) scale(1)`;
    }, 10);
    
    // Remove instruction after first heart
    const instruction = loveCanvas.querySelector('.canvas-instruction');
    if (instruction) {
        instruction.style.opacity = '0';
        setTimeout(() => instruction.remove(), 500);
    }
    
    // Play sound
    playSound(heartSound);
    
    // Store heart
    CONFIG.canvasHearts.push({x, y, color: CONFIG.currentColor, size: Math.random() * 30 + 20});
}

// Clear Canvas Hearts
function clearCanvasHearts() {
    document.querySelectorAll('.canvas-heart').forEach(heart => heart.remove());
    CONFIG.canvasHearts = [];
    
    // Add instruction back
    const instruction = document.createElement('div');
    instruction.className = 'canvas-instruction';
    instruction.innerHTML = `
        <i class="fas fa-hand-pointer"></i>
        <p>Tap anywhere to add hearts!</p>
    `;
    loveCanvas.appendChild(instruction);
}

// Save Canvas Image
function saveCanvasImage() {
    // In a real implementation, this would capture and save the canvas
    alert("💖 Your love art has been saved to memories!");
    playSound(sparkleSound);
}

// Create Surprise
function createSurprise() {
    // Create multiple hearts at random positions
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const x = Math.random() * loveCanvas.offsetWidth;
            const y = Math.random() * loveCanvas.offsetHeight;
            
            // Simulate click at random position
            const event = new MouseEvent('click', {
                clientX: x + loveCanvas.getBoundingClientRect().left,
                clientY: y + loveCanvas.getBoundingClientRect().top
            });
            loveCanvas.dispatchEvent(event);
        }, i * 100);
    }
    
    // Play sound
    playSound(sparkleSound);
    
    // Create confetti
    createConfetti();
}

// Initialize Confetti
function initConfetti() {
    const canvas = confettiCanvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Create Confetti
function createConfetti() {
    const canvas = confettiCanvas;
    const ctx = canvas.getContext('2d');
    const confettiCount = 150;
    
    // Clear previous confetti
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < confettiCount; i++) {
        const x = Math.random() * canvas.width;
        const y = -20;
        const size = Math.random() * 10 + 5;
        const color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
        const speed = Math.random() * 3 + 2;
        const angle = Math.random() * Math.PI * 2;
        
        animateConfetti(x, y, size, color, speed, angle, 0);
    }
}

// Animate Confetti
function animateConfetti(x, y, size, color, speed, angle, rotation) {
    const canvas = confettiCanvas;
    const ctx = canvas.getContext('2d');
    
    // Clear this confetti
    ctx.clearRect(x - size - 1, y - size - 1, size * 2 + 2, size * 2 + 2);
    
    // Update position
    x += Math.cos(angle) * speed;
    y += speed;
    rotation += 0.1;
    
    // Draw confetti
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = color;
    
    // Random shape
    if (Math.random() > 0.5) {
        // Heart
        ctx.beginPath();
        ctx.moveTo(0, -size/2);
        ctx.bezierCurveTo(size/2, -size, size, 0, 0, size);
        ctx.bezierCurveTo(-size, 0, -size/2, -size, 0, -size/2);
        ctx.fill();
    } else {
        // Circle
        ctx.beginPath();
        ctx.arc(0, 0, size/2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.restore();
    
    // Continue animation if not off screen
    if (y < canvas.height) {
        requestAnimationFrame(() => {
            animateConfetti(x, y, size, color, speed, angle, rotation);
        });
    }
}

// Create Sparkles
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 5;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-particle';
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = `${rect.left + rect.width / 2}px`;
        sparkle.style.top = `${rect.top + rect.height / 2}px`;
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.zIndex = '1000';
        sparkle.style.pointerEvents = 'none';
        
        document.body.appendChild(sparkle);
        
        // Animate sparkle
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        
        sparkle.animate([
            {
                transform: 'translate(0, 0) scale(1) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0) rotate(360deg)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        }).onfinish = () => sparkle.remove();
    }
}

// Create Floating Heart
function createFloatingHeart(element) {
    const rect = element.getBoundingClientRect();
    const heart = document.createElement('div');
    heart.className = 'floating-heart-particle';
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = `${rect.left + rect.width / 2}px`;
    heart.style.top = `${rect.top}px`;
    heart.style.fontSize = '2rem';
    heart.style.zIndex = '1000';
    heart.style.color = CONFIG.currentColor;
    heart.style.pointerEvents = 'none';
    
    document.body.appendChild(heart);
    
    // Animate heart
    heart.animate([
        {
            transform: 'translateY(0) scale(1)',
            opacity: 1
        },
        {
            transform: 'translateY(-100px) scale(1.5)',
            opacity: 0
        }
    ], {
        duration: 1500,
        easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
    }).onfinish = () => heart.remove();
}

// Start Animations
function startAnimations() {
    // Update love time
    setInterval(() => {
        loveTime.textContent = Math.floor(Math.random() * 1000) + 1000;
    }, 2000);
    
    // Animate love meter
    setInterval(() => {
        const percent = (CONFIG.loveLevel / CONFIG.maxLove) * 100;
        loveMeter.style.width = `${percent}%`;
    }, 100);
}

// Start Content Animations
function startContentAnimations() {
    // Animate title words
    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach((word, index) => {
        setTimeout(() => {
            word.style.animation = 'wordReveal 0.8s forwards';
        }, index * 200);
    });
    
    // Animate subtitle
    const subtitleLines = document.querySelectorAll('.subtitle-line');
    subtitleLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.animation = 'fadeInUp 0.8s forwards';
        }, 1000 + index * 300);
    });
}

// Replay Experience
function replayExperience() {
    // Reset to cover page
    coverPage.classList.remove('hidden');
    mainContent.classList.remove('active');
    envelope.classList.remove('open');
    
    // Reset some values
    CONFIG.loveLevel = 100;
    CONFIG.heartsSent = 0;
    heartCount.textContent = '0';
    
    // Reset gallery
    GALLERY.currentIndex = 0;
    updateGalleryInfo();
    
    // Play sound
    playSound(sparkleSound);
    
    // Create confetti
    createConfetti();
}

// Share Love Message
function shareLoveMessage() {
    if (navigator.share) {
        navigator.share({
            title: 'A Colorful Valentine For You!',
            text: 'I created this beautiful colorful Valentine message just for you! 💖',
            url: window.location.href
        }).catch(err => {
            console.log('Error sharing:', err);
            copyToClipboard();
        });
    } else {
        copyToClipboard();
    }
}

// Copy to Clipboard
function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('💖 Love link copied! Share it with someone special!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', init);

// Log for debugging
console.log("Script loaded successfully!");