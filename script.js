const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");
const carrusel = document.querySelector(".carrusel");

let index = 0;
let autoSlideInterval;

function showSlide(i) {
   if (i < 0) {
     index = images.length - 1;
   } else if (i >= images.length) {
     index = 0;
   } else {
     index = i;
   }
   slides.style.transform = `translateX(${-index * 100}%)`;
   updateDots();
 }

function updateDots() {
   dots.forEach((dot, i) => {
     dot.classList.toggle("active", i === index);
   });
 }

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        showSlide(index + 1);
    }, 5000);
}

function pauseAutoSlide() {
    clearInterval(autoSlideInterval);
}

function addEventListeners() {
    prevBtn.addEventListener("click", () => {
        showSlide(index - 1);
    });

    nextBtn.addEventListener("click", () => {
        showSlide(index + 1);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            showSlide(i);
        });
    });

    // Pause on hover
    carrusel.addEventListener("mouseenter", pauseAutoSlide);
    carrusel.addEventListener("mouseleave", startAutoSlide);

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            showSlide(index - 1);
        } else if (e.key === "ArrowRight") {
            showSlide(index + 1);
        }
    });

    // Image error handling
    images.forEach(img => {
        img.addEventListener('error', () => {
            console.error(`Image failed to load: ${img.src}`);
        });
    });
}

function initCarousel() {
    if (!slides || images.length === 0) {
        console.error("Carousel elements not found or no images.");
        return;
    }

    if (images.length < 2) {
        // Disable controls if only one image
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        dots.forEach(dot => dot.style.display = 'none');
        return;
    }

    startAutoSlide();
    addEventListeners();
}

// Initialize the carousel
initCarousel();
