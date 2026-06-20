const images = [
    "assets/images/196469205_1946256208859274_8969977656166504113_n.jpg",
    "assets/images/494305898_3005206799648662_9199667255102739911_n.jpg",
    "assets/images/494357586_3005206462982029_3491922493984252744_n.jpg",
    "assets/images/494770247_3005206692982006_6644118324749028908_n.jpg",
    "assets/images/508493459_3141994015954962_5373708003265526995_n.jpg",
    "assets/images/508545158_3141993945954969_7775012107558624614_n.jpg",
    "assets/images/508618402_3141994262621604_5147003365258589193_n.jpg",
    "assets/images/Happy Birthday Ma & Pa.jpg",
    "assets/images/Happy Birthday Ma & Pa10.jpg",
    "assets/images/Happy Birthday Ma & Pa11.jpg",
    "assets/images/Happy Birthday Ma & Pa12.jpg",
    "assets/images/Happy Birthday Ma & Pa13.jpg",
    "assets/images/Happy Birthday Ma & Pa14.jpg",
    "assets/images/Happy Birthday Ma & Pa15.jpg",
    "assets/images/Happy Birthday Ma & Pa16.jpg",
    "assets/images/Happy Birthday Ma & Pa17.jpg",
    "assets/images/Happy Birthday Ma & Pa2.jpg",
    "assets/images/Happy Birthday Ma & Pa3.jpg",
    "assets/images/Happy Birthday Ma & Pa4.jpg",
    "assets/images/Happy Birthday Ma & Pa5.jpg",
    "assets/images/Happy Birthday Ma & Pa6.jpg",
    "assets/images/Happy Birthday Ma & Pa7.jpg",
    "assets/images/Happy Birthday Ma & Pa8.jpg",
    "assets/images/Happy Birthday Ma & Pa9.jpg",
    "assets/images/family 11.jpg",
    "assets/images/family 13.jpg",
    "assets/images/family 14.jpg",
    "assets/images/family 15.jpg",
    "assets/images/family 16.jpg",
    "assets/images/family 17.jpg",
    "assets/images/family 18.jpg",
    "assets/images/family 9.jpg",
    "assets/images/family pic 12.jpg",
    "assets/images/family pic 6.jpg",
    "assets/images/family pic 7.jpg",
    "assets/images/family pic 8.jpg",
    "assets/images/family pic 9.jpg",
    "assets/images/family pic.jpg",
    "assets/images/family pic2.jpg",
    "assets/images/family pic3.jpg",
    "assets/images/family pic4.jpg",
    "assets/images/family pic5.jpg"
];

const messages = [
    {
        verse: "May the Lord bless you and protect you. May He look upon you with joy and surround your life with His love and gentle care. Happy Birthday!"
    },
    {
        verse: "This is the day the Lord has made; let us rejoice and be glad in it! Wishing you a beautifully blessed birthday."
    },
    {
        verse: "Thanks be to God for the wonderful gift of you! May your year ahead overflow with His grace and abundant blessings."
    },
    {
        isFinal: true,
        greeting: "Happy Birthday, Ma and Pa!",
        from: "With all our love, Jr and Rj"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const introScreen = document.getElementById('intro-screen');
    const mainExperience = document.getElementById('main-experience');
    const bgMusic = document.getElementById('bg-music');
    const slideshowContainer = document.getElementById('slideshow-container');
    const messageContainer = document.getElementById('message-container');
    
    let currentImageIndex = 0;
    let currentMessageIndex = 0;
    let messageInterval;
    let imageInterval;

    // Build Messages HTML
    let messageHTML = '';
    messages.forEach((msg, index) => {
        if (msg.isFinal) {
            messageHTML += `
                <div class="message-content" id="msg-${index}">
                    <h2 class="final-greeting">${msg.greeting}</h2>
                    <p class="from-text">${msg.from}</p>
                </div>
            `;
        } else {
            messageHTML += `
                <div class="message-content" id="msg-${index}">
                    ${msg.title ? `<p class="verse-title">${msg.title}</p>` : ''}
                    <h3 class="verse-text">${msg.verse}</h3>
                    ${msg.wish ? `<p class="wish-text">${msg.wish}</p>` : ''}
                </div>
            `;
        }
    });

    // Add Navigation Dots
    messageHTML += `<div class="message-nav">`;
    messages.forEach((_, index) => {
        messageHTML += `<div class="nav-dot" data-index="${index}"></div>`;
    });
    messageHTML += `</div>`;
    
    messageContainer.innerHTML = messageHTML;

    // Shuffle images for a dynamic experience every time
    const shuffledImages = [...images].sort(() => 0.5 - Math.random());

    // Setup Slideshow
    function setupSlideshow() {
        const slide1 = document.createElement('div');
        slide1.className = 'slide active';
        slide1.style.backgroundImage = `url('${shuffledImages[0]}')`;
        
        const slide2 = document.createElement('div');
        slide2.className = 'slide';
        slide2.style.backgroundImage = `url('${shuffledImages[1]}')`;

        slideshowContainer.appendChild(slide1);
        slideshowContainer.appendChild(slide2);

        let activeSlide = 1;
        currentImageIndex = 1;

        imageInterval = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % shuffledImages.length;
            
            if (activeSlide === 1) {
                slide2.style.backgroundImage = `url('${shuffledImages[currentImageIndex]}')`;
                slide2.classList.add('active');
                slide1.classList.remove('active');
                activeSlide = 2;
            } else {
                slide1.style.backgroundImage = `url('${shuffledImages[currentImageIndex]}')`;
                slide1.classList.add('active');
                slide2.classList.remove('active');
                activeSlide = 1;
            }
        }, 6000); // Crossfade every 6 seconds
    }

    // Handle Message Transitions
    function showMessage(index) {
        // Hide all messages
        document.querySelectorAll('.message-content').forEach(el => {
            el.classList.remove('active');
        });
        document.querySelectorAll('.nav-dot').forEach(el => {
            el.classList.remove('active');
        });

        // Show target message
        document.getElementById(`msg-${index}`).classList.add('active');
        document.querySelector(`.nav-dot[data-index="${index}"]`).classList.add('active');
        currentMessageIndex = index;
    }

    function startMessageSequence() {
        showMessage(0);
        messageContainer.classList.add('visible');

        messageInterval = setInterval(() => {
            let nextIndex = (currentMessageIndex + 1) % messages.length;
            showMessage(nextIndex);
        }, 12000); // Change message every 12 seconds
    }

    // Interactive dots
    document.querySelectorAll('.nav-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            clearInterval(messageInterval); // Stop auto-play if they interact
            const index = parseInt(e.target.getAttribute('data-index'));
            showMessage(index);
        });
    });

    // Start Button Logic
    startBtn.addEventListener('click', () => {
        // Try to play audio
        bgMusic.play().catch(e => console.log("Audio autoplay prevented", e));
        
        // Transition screens
        introScreen.classList.add('hidden');
        mainExperience.classList.remove('hidden');

        // Start animations
        setupSlideshow();
        
        // Delay the first message slightly for dramatic effect
        setTimeout(() => {
            startMessageSequence();
        }, 1500);
    });
});
