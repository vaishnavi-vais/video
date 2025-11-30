document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Sticky Header on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate Skills on Scroll
    const skillsSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-level');

    const animateSkills = () => {
        const skillsPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (skillsPosition < screenPosition) {
            skillBars.forEach(bar => {
                const width = bar.parentElement.previousElementSibling.querySelector('.skill-percent').textContent;
                bar.style.width = width;
                bar.style.opacity = '1';
            });
        }
    };

    window.addEventListener('scroll', animateSkills);

    // Animate Timeline Items on Scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const animateTimeline = () => {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight - 100) {
                item.classList.add('visible');
            }
        });
    };

    // Initial check for timeline items in viewport
    animateTimeline();
    
    // Check on scroll
    window.addEventListener('scroll', animateTimeline);

    // Form Submission (prevent default for demo)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message (in a real app, you'd handle this after server response)
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Add animation class to hero section on load
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
        heroImage.style.opacity = '1';
        heroImage.style.transform = 'translateY(0)';
    }, 300);

    // Initialize AOS (Animate On Scroll) for other elements
    // Note: You'll need to include AOS library in your HTML for this to work
    // <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    // <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    // Then initialize with: AOS.init();
    
    // For this demo, we'll use our own simple animation
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Video Modal Functionality
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    videoModal.innerHTML = `
        <div class="video-container">
            <span class="close-video">&times;</span>
            <video controls>
                Your browser does not support the video tag.
            </video>
        </div>
    `;
    document.body.appendChild(videoModal);

    // Handle video play button click
    document.addEventListener('click', (e) => {
        // Open video modal
        if (e.target.closest('.video-play')) {
            e.preventDefault();
            const portfolioItem = e.target.closest('.portfolio-item');
            const videoSrc = portfolioItem.querySelector('source').src;
            
            const video = videoModal.querySelector('video');
            video.src = videoSrc;
            video.load();
            
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Play the video after a short delay to ensure it's ready
            setTimeout(() => {
                video.play().catch(e => console.error('Video play failed:', e));
            }, 300);
        }
        
        // Close video modal
        if (e.target.classList.contains('close-video') || e.target === videoModal) {
            const video = videoModal.querySelector('video');
            video.pause();
            video.currentTime = 0;
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            const video = videoModal.querySelector('video');
            video.pause();
            video.currentTime = 0;
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Add hover effect to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const overlay = item.querySelector('.portfolio-overlay');
            const content = item.querySelector('.portfolio-content');
            if (overlay) overlay.style.opacity = '1';
            if (content) content.style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.portfolio-overlay');
            const content = item.querySelector('.portfolio-content');
            if (overlay) overlay.style.opacity = '0';
            if (content) content.style.transform = 'translateY(20px)';
        });
    });

    // Add click event to profile placeholder to trigger file input
    const profilePlaceholder = document.querySelector('.profile-placeholder');
    if (profilePlaceholder) {
        profilePlaceholder.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const img = document.createElement('img');
                        img.src = event.target.result;
                        img.alt = 'Profile Picture';
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.borderRadius = 'inherit';
                        img.style.objectFit = 'cover';
                        
                        // Clear the placeholder content
                        profilePlaceholder.innerHTML = '';
                        profilePlaceholder.appendChild(img);
                        
                        // Add a small animation
                        profilePlaceholder.style.transform = 'scale(1.05)';
                        setTimeout(() => {
                            profilePlaceholder.style.transform = 'scale(1)';
                        }, 200);
                    };
                    reader.readAsDataURL(file);
                }
            };
            
            input.click();
        });
    }
});

// Add a simple typewriter effect to the hero heading
function initTypewriter() {
    const glitchText = document.querySelector('.glitch');
    if (!glitchText) return;
    
    const text = glitchText.getAttribute('data-text') || glitchText.textContent;
    let index = 0;
    let isDeleting = false;
    let currentText = '';
    let typingSpeed = 100;
    
    function type() {
        const fullText = text;
        
        if (isDeleting) {
            currentText = fullText.substring(0, currentText.length - 1);
        } else {
            currentText = fullText.substring(0, currentText.length + 1);
        }
        
        glitchText.textContent = currentText;
        
        if (!isDeleting && currentText === fullText) {
            isDeleting = true;
            typingSpeed = 50;
            setTimeout(type, 1500);
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            typingSpeed = 100;
            setTimeout(type, 500);
        } else {
            setTimeout(type, typingSpeed);
        }
    }
    
    // Start the typewriter effect after a short delay
    setTimeout(type, 1000);
}

// Initialize the typewriter effect when the page loads
window.onload = function() {
    initTypewriter();
    
    // Add a simple particle effect to the hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size between 2px and 5px
            const size = Math.random() * 3 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation duration between 10s and 20s
            const duration = Math.random() * 10 + 10;
            particle.style.animation = `float ${duration}s linear infinite`;
            
            // Random delay
            particle.style.animationDelay = `-${Math.random() * 20}s`;
            
            // Random opacity between 0.1 and 0.5
            particle.style.opacity = Math.random() * 0.4 + 0.1;
            
            hero.appendChild(particle);
        }
    }
};

// Add a simple music player for background music (optional)
function initMusicPlayer() {
    const musicPlayer = document.createElement('div');
    musicPlayer.className = 'music-player';
    musicPlayer.innerHTML = `
        <audio id="bgMusic" loop>
            <source src="" type="audio/mp3">
            Your browser does not support the audio element.
        </audio>
        <button id="musicToggle" class="music-toggle">
            <i class="fas fa-music"></i>
            <span>Play Music</span>
        </button>
    `;
    
    document.body.appendChild(musicPlayer);
    
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    // In a real app, you would set the music source
    // bgMusic.src = 'path/to/your/music.mp3';
    
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i><span>Play Music</span>';
        } else {
            bgMusic.play().catch(e => {
                console.log('Autoplay prevented:', e);
                // Show a message that the user needs to interact first
                alert('Please click anywhere on the page to enable music playback.');
            });
            musicToggle.innerHTML = '<i class="fas fa-pause"></i><span>Pause Music</span>';
        }
        isPlaying = !isPlaying;
    });
    
    // Enable audio after user interaction
    const enableAudio = () => {
        document.removeEventListener('click', enableAudio);
        document.removeEventListener('scroll', enableAudio);
        
        // This is where you would initialize the audio context if needed
        // const AudioContext = window.AudioContext || window.webkitAudioContext;
        // const audioContext = new AudioContext();
        // // Resume the audio context
        // if (audioContext.state === 'suspended') {
        //     audioContext.resume();
        // }
    };
    
    // Enable audio on any user interaction
    document.addEventListener('click', enableAudio, { once: true });
    document.addEventListener('scroll', enableAudio, { once: true });
}

// Uncomment to enable the music player (requires adding music file)
// initMusicPlayer();
