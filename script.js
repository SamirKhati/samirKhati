// ==NAVBAR + SECTION ANIMATION ==

const navItems = document.querySelectorAll('.navbar ul li');
const navBar = document.querySelector('.navbar');
const barsBox = document.querySelector('.bars-animation');
const sections = document.querySelectorAll('section');
const logoLink = document.querySelector('.logo');

function activateSection(targetId) {

    navBar.classList.remove('active');
    barsBox.classList.remove('active');

    sections.forEach(section => {
        section.classList.remove('active');
    });

    setTimeout(() => {
        navBar.classList.add('active');
        barsBox.classList.add('active');

        if (targetId) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) targetSection.classList.add('active');
        }
    }, 500);
}

// Navbar click
navItems.forEach((item) => {
    item.addEventListener('click', (e) => {

        const link = item.querySelector('a');
        const targetId = link.getAttribute('href');

        if (targetId.startsWith("#")) {
            e.preventDefault();

            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            activateSection(targetId);

            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            setTimeout(triggerScrollReveal, 500);
        }
    });
});

// Logo click (Back to Home)
logoLink.addEventListener('click', (e) => {
    e.preventDefault();

    navItems.forEach(nav => nav.classList.remove('active'));
    navItems[0].classList.add('active');

    activateSection('#home');

    document.querySelector('#home').scrollIntoView({
        behavior: 'smooth'
    });
});


// === ACTIVE NAV ON SCROLL ===

window.addEventListener('scroll', () => {

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop &&
            window.pageYOffset < sectionTop + sectionHeight) {

            currentSection = section.getAttribute('id');
        }
    });

    navItems.forEach(li => {
        li.classList.remove('active');

        const link = li.querySelector('a');
        if (link.getAttribute('href') === `#${currentSection}`) {
            li.classList.add('active');
        }
    });
});


// == RESUME TAB SWITCH ==

const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {

        resumeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        resumeDetails.forEach(detail => detail.classList.remove('active'));
        resumeDetails[idx].classList.add('active');
    });
});


// == PORTFOLIO SLIDER ==

const portfolioDetails = document.querySelectorAll('.portfolio-details');
const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');

let index = 0;
const totalSlides = document.querySelectorAll('.img-item').length;

function activePortfolio() {

    imgSlide.style.transform = `translateX(-${index * 100}%)`;

    portfolioDetails.forEach(detail => detail.classList.remove('active'));
    portfolioDetails[index].classList.add('active');

    arrowLeft.classList.toggle('disabled', index === 0);
    arrowRight.classList.toggle('disabled', index === totalSlides - 1);
}

arrowRight.addEventListener('click', () => {
    if (index < totalSlides - 1) {
        index++;
        activePortfolio();
    }
});

arrowLeft.addEventListener('click', () => {
    if (index > 0) {
        index--;
        activePortfolio();
    }
});


// ==SCROLL REVEAL==

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

const revealElements = document.querySelectorAll(
    '.services-box, .resume-detail, .portfolio-details, .contact-box, .heading'
);

revealElements.forEach(el => observer.observe(el));

function triggerScrollReveal() {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('reveal');
            observer.unobserve(el);
        }
    });
}


// ================= INITIAL LOAD =================

window.addEventListener('load', () => {
    document.querySelector('#home').classList.add('active');
});