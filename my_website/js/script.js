document.addEventListener('DOMContentLoaded', () => {
    const slideTrack = document.getElementById('slide-track');
    const navDotsContainer = document.getElementById('slider-nav-dots');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
    const slideIntervalTime = 4000; // 4 seconds
    let slideInterval;

    // 1. Generate Navigation Dots dynamically
    function createNavDots() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('nav-dot');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', () => {
                moveToSlide(i);
            });
            navDotsContainer.appendChild(dot);
        }
        updateNavDots();
    }

    // 2. Function to move the slider
    function moveToSlide(index) {
        currentIndex = index;
        // Calculate how much to shift the track (e.g., -100% for slide 2, -200% for slide 3)
        const offset = -currentIndex * 100;
        slideTrack.style.transform = `translateX(${offset}%)`;
        updateNavDots();
    }

    // 3. Update the 'active' class on the correct dot
    function updateNavDots() {
        const dots = document.querySelectorAll('.nav-dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    // 4. Automatic sliding functionality
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        moveToSlide(currentIndex);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Pause animation on container hover
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);


    // Initialize the slider
    createNavDots();
    startAutoSlide();
});