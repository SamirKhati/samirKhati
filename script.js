
// 1. Select the elements correctly
const navLinks = document.querySelectorAll('.navbar ul li');
const logoLink = document.querySelector('.logo');
const navBar = document.querySelector('.navbar');
const barsBox = document.querySelector('.bars-animation');
const homeSection = document.querySelector('.home'); // Targets your section

const activePage = () => {
    // Reset Navbar Animation
    navBar.classList.remove('active');
    
    // Reset Bars Animation
    barsBox.classList.remove('active');
    
    // Reset Section Animation (optional, based on your CSS)
    homeSection.classList.remove('active');

    // Re-trigger animations after a short delay
    setTimeout(() => {
        navBar.classList.add('active');
        barsBox.classList.add('active');
        homeSection.classList.add('active');
    }, 1100);

    // Clear 'active' class from all nav items
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
}

// Event for Nav Links
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        // e.preventDefault(); // Uncomment if you don't want the page to jump to #
        if (!link.classList.contains('active')) {
            activePage();
            link.classList.add('active');
            
            // Trigger scroll reveal for the section being navigated to
            setTimeout(() => {
                triggerScrollReveal();
            }, 500);
        }
    });
});

// Event for Logo (Resets everything to Home)
logoLink.addEventListener('click', () => {
    activePage();
    navLinks[0].classList.add('active');
});

const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail');

        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        resumeDetails.forEach(details => {
            details.classList.remove('active');
        });
        resumeDetails[idx].classList.add('active');
    });
});


const portfolioDetails = document.querySelectorAll('.portfolio-details');
const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');

let index = 0;

const activePortfolio = () => {
    // 1. Calculate the slide movement
    // We use index * 2rem because your CSS has a 'gap: 2rem' in .img-slide
    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * -8}rem))`;

    // 2. Update the active text details on the left
    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    portfolioDetails[index].classList.add('active');
};

arrowRight.addEventListener('click', () => {
    // If you have 3 images (like in your HTML), max index is 2
    if (index < 3) { 
        index++;
        arrowLeft.classList.remove('disabled');

    } else {
        index = 3; // Loop back to start
        arrowRight.classList.add('disabled');
    }
    activePortfolio();
});

arrowLeft.addEventListener('click', () => {
    if (index > 1) { 
        index--;
        arrowRight.classList.remove('disabled');

    } else {
        index = 0; // Loop to last image
        arrowLeft.classList.add('disabled');

    }
    activePortfolio();
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select elements to reveal
const revealElements = document.querySelectorAll(
    '.services-box, .resume-detail, .portfolio-details, .contact-content, .heading'
);

revealElements.forEach(el => {
    observer.observe(el);
});

// Function to manually trigger scroll reveal for visible elements
const triggerScrollReveal = () => {
    const visibleElements = document.querySelectorAll(
        '.services-box, .resume-detail, .portfolio-details, .contact-content, .heading'
    );
    
    visibleElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            // Element is in viewport
            el.classList.add('reveal');
            observer.unobserve(el);
        }
    });
};