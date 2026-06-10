// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. Dark/Light Mode Toggle --- */
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Function to apply saved theme
    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
            if(themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        } else {
            body.classList.remove('light-mode');
            if(themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    }
    
    // Check saved theme on load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
    
    // Toggle on click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    /* --- 2. Active Navigation Link --- */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    /* --- 3. 3D Image Parallax Mouse Effect --- */
    const heroSection = document.querySelector('.home-hero');
    const parallaxImg = document.querySelector('.parallax-img');
    const gridFloor = document.querySelector('.grid-floor-v2');

    if(heroSection && parallaxImg) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 25;
            const y = (window.innerHeight / 2 - e.pageY) / 25;
            
            parallaxImg.style.transform = `translateZ(-50px) translateX(${x}px) translateY(${y}px) scale(1.1)`;
            
            if(gridFloor) {
                gridFloor.style.transform = `rotateX(60deg) translateX(${-x * 2}px) translateY(${-y}px)`;
            }
        });

        heroSection.addEventListener('mouseleave', () => {
            parallaxImg.style.transform = 'translateZ(0) translateX(0) translateY(0) scale(1)';
            if(gridFloor) {
                gridFloor.style.transform = 'rotateX(60deg) translateX(0) translateY(0)';
            }
        });
    }

// --- BOOMBASTIC PARALLAX EFFECT ---
const heroWrapper = document.querySelector('.hero-wrapper');
const floatingImages = document.querySelectorAll('.float-img');
const bgShapes = document.querySelectorAll('.bg-shape');
const bgGrid = document.querySelector('.bg-grid');

// Mouse Move Parallax
if (heroWrapper) {
    heroWrapper.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 20;
        const y = (window.innerHeight / 2 - e.pageY) / 20;
        
        // Move floating images
        floatingImages.forEach((img, index) => {
            const speed = parseFloat(img.getAttribute('data-speed'));
            img.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
        });
        
        // Move background grid
        if(bgGrid) {
            bgGrid.style.transform = `perspective(500px) rotateX(60deg) translateX(${-x}px) translateY(${-y}px)`;
        }
    });

    /* --- 4. Scroll Parallax Effect --- */
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const bg = document.querySelector('.parallax-img');
        if(bg) {
            bg.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
        }
    });



    /* --- 5. Gallery Slider Logic --- */
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    if(slides.length > 0) {
        function showSlide(n) {
            slides.forEach(s => s.classList.remove('active'));
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        if(prevBtn) {
            prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        }
        if(nextBtn) {
            nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        }
        
        setInterval(() => showSlide(currentSlide + 1), 5000);
    }



    /* --- 6. Lightbox Logic --- */
    const triggers = document.querySelectorAll('.lightbox-trigger');
    const modal = document.getElementById('textLightbox');
    const closeBtn = document.querySelector('.close-lightbox');

    if(modal) {
        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const dataText = trigger.getAttribute('data-text');
                document.getElementById('lightboxText').innerText = dataText;
                modal.style.display = 'flex';
            });
        });

        if(closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        window.addEventListener('click', (e) => {
            if(e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});