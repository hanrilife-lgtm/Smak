/* =================================
   SMAK RESTAURANT
   PREMIUM JAVASCRIPT
================================= */

// ================================
// LOADER
// ================================

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("hidden");
            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }, 800);
    }
});

// ================================
// LENIS SMOOTH SCROLL
// ================================

const lenis = new Lenis({
    duration: 1.2,
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ================================
// HEADER EFFECT
// ================================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
});

// ================================
// HERO ANIMATION
// ================================

const heroAnimation = gsap.timeline();

heroAnimation
    .from(".hero-small", {
        y: 40,
        opacity: 0,
        duration: 1
    })
    .from(".hero h1", {
        y: 80,
        opacity: 0,
        duration: 1.2
    }, "-=0.5")
    .from(".hero h2", {
        y: 50,
        opacity: 0,
        duration: 1
    }, "-=0.5")
    .from(".hero-buttons", {
        y: 30,
        opacity: 0,
        duration: 1
    }, "-=0.5")
    .from(".hero-info div", {
        y: 30,
        opacity: 0,
        stagger: .2
    });

// ================================
// SCROLL REVEAL
// ================================

gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll(
    ".section, .feature-card, .dish, .event-card, .menu-item"
);

sections.forEach((section) => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 85%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// ================================
// HERO PARALLAX
// ================================

const heroBg = document.querySelector(".hero-bg");
if (heroBg) {
    gsap.to(heroBg, {
        y: 150,
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            scrub: true
        }
    });
}

// ================================
// MOBILE MENU
// ================================

const menuBtn = document.querySelector(".mobile-menu");
const nav = document.querySelector(".nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        nav.classList.toggle("open");
        menuBtn.classList.toggle("active");
    });

    // закрытие меню при клике на ссылку
    document.querySelectorAll(".nav a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            menuBtn.classList.remove("active");
        });
    });

    // закрытие меню при клике вне его
    document.addEventListener("click", (e) => {
        if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
            nav.classList.remove("open");
            menuBtn.classList.remove("active");
        }
    });
}

// ================================
// IMAGE HOVER EFFECT
// ================================

const images = document.querySelectorAll(
    ".dish img, .gallery-grid img, .banquet-gallery img, .gallery-card img"
);

images.forEach(img => {
    img.addEventListener("mouseenter", () => {
        gsap.to(img, {
            scale: 1.05,
            duration: .5
        });
    });

    img.addEventListener("mouseleave", () => {
        gsap.to(img, {
            scale: 1,
            duration: .5
        });
    });
});

// ================================
// BOOKING FORM
// ================================

const bookingForm = document.querySelector(".booking form");

if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const button = bookingForm.querySelector("button");

        button.innerHTML = "Заявка отправлена ✓";
        button.style.background = "#1f8f4d";

        setTimeout(() => {
            button.innerHTML = "Отправить заявку";
            button.style.background = "";
            bookingForm.reset();
        }, 3000);
    });
}

// ================================
// BANQUET FORM
// ================================

const banquetForm = document.querySelector("#request form");

if (banquetForm) {
    banquetForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const button = banquetForm.querySelector("button");

        button.innerHTML = "Заявка отправлена ✓";
        button.style.background = "#1f8f4d";

        setTimeout(() => {
            button.innerHTML = "Отправить заявку";
            button.style.background = "";
            banquetForm.reset();
        }, 3000);
    });
}

// ================================
// CALLBACK FORM
// ================================

const callbackForm = document.querySelector(".callback-box form");

if (callbackForm) {
    callbackForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const button = callbackForm.querySelector("button");

        button.innerHTML = "Скоро перезвоним ✓";
        button.style.background = "#1f8f4d";

        setTimeout(() => {
            button.innerHTML = "Позвоните мне";
            button.style.background = "";
            callbackForm.reset();
        }, 3000);
    });
}

// ================================
// CURSOR EFFECT
// ================================

const cursor = document.createElement("div");
cursor.className = "cursor";
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: .2
    });
});

// ================================
// NUMBER COUNTER
// ================================

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
    gsap.from(counter, {
        innerHTML: 0,
        duration: 2,
        snap: { innerHTML: 1 },
        scrollTrigger: {
            trigger: counter,
            start: "top 80%"
        }
    });
});

// ================================
// PRELOAD IMAGES
// ================================

const imagesToLoad = document.images;
Array.from(imagesToLoad).forEach(img => {
    img.loading = "lazy";
});

// ================================
// ПЛАВНАЯ ПРОКРУТКА ПО ЯКОРЯМ
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header').offsetHeight || 100;
            lenis.scrollTo(target, {
                offset: -headerHeight,
                duration: 1.5,
            });
        }
    });
});

console.log("СМАК Premium Website Loaded");