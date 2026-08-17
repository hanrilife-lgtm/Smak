window.addEventListener("load", function() {
    var loader = document.querySelector(".loader");
    if (loader) {
        setTimeout(function() {
            loader.classList.add("hidden");
            setTimeout(function() {
                loader.style.display = "none";
            }, 500);
        }, 800);
    }
});

// ================================
// HEADER BLUR
// ================================

var header = document.querySelector(".header");

window.addEventListener("scroll", function() {
    if (window.scrollY > 80) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
});

// ================================
// MOBILE MENU
// ================================

document.addEventListener("DOMContentLoaded", function() {
    var menuBtn = document.querySelector(".mobile-menu");
    var nav = document.querySelector(".nav");

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            nav.classList.toggle("open");
            this.classList.toggle("active");
        });

        var links = document.querySelectorAll(".nav a");
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", function() {
                nav.classList.remove("open");
                menuBtn.classList.remove("active");
            });
        }

        document.addEventListener("click", function(e) {
            if (nav.classList.contains("open") && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
                nav.classList.remove("open");
                menuBtn.classList.remove("active");
            }
        });
    }
});

// ================================
// АККОРДЕОН МЕНЮ
// ================================

document.addEventListener("DOMContentLoaded", function() {
    var headers = document.querySelectorAll(".menu-category-header");

    headers.forEach(function(header) {
        header.addEventListener("click", function(e) {
            var category = this.parentElement;
            var isActive = category.classList.contains("active");

            document.querySelectorAll(".menu-category").forEach(function(cat) {
                cat.classList.remove("active");
            });

            if (!isActive) {
                category.classList.add("active");
            }

            e.preventDefault();
        });
    });

    var firstCategory = document.querySelector(".menu-category");
    if (firstCategory) {
        firstCategory.classList.add("active");
    }
});

// ================================
// ОТПРАВКА ФОРМЫ В GOOGLE APPS SCRIPT
// ================================

var bookingForm = document.querySelector(".booking form");

if (bookingForm) {
    bookingForm.addEventListener("submit", function(e) {
        e.preventDefault();

        var formData = new FormData(this);
        var name = formData.get("Имя") || "Не указано";
        var phone = formData.get("Телефон") || "Не указан";
        var date = formData.get("Дата") || "Не указана";
        var guests = formData.get("Гости") || "Не указано";

        // === ВАШ URL ИЗ GOOGLE APPS SCRIPT ===
        var url = "https://script.google.com/macros/s/AKfycby6u9t-NkTd-AxniVDyWtg1hhutcXzM2TxHz85EBX8BMWiANOfwdMlm0wLtHozud77i/exec";

        var button = this.querySelector("button");
        var originalText = button.innerHTML;

        button.innerHTML = "⏳ Отправка...";
        button.style.opacity = "0.7";
        button.disabled = true;

        fetch(url, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                date: date,
                guests: guests
            })
        })
        .then(function() {
            button.innerHTML = "✅ Заявка отправлена!";
            button.style.background = "#1f8f4d";
            button.style.color = "#fff";
            button.style.opacity = "1";
            button.disabled = false;

            setTimeout(function() {
                button.innerHTML = originalText;
                button.style.background = "";
                button.style.color = "";
                button.style.opacity = "1";
                bookingForm.reset();
            }, 3000);
        })
        .catch(function() {
            button.innerHTML = "❌ Ошибка соединения";
            button.style.background = "#d32f2f";
            button.style.color = "#fff";
            button.style.opacity = "1";
            button.disabled = false;

            setTimeout(function() {
                button.innerHTML = originalText;
                button.style.background = "";
                button.style.color = "";
                button.style.opacity = "1";
            }, 3000);
        });
    });
}

// ================================
// ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА ГАЛЕРЕИ
// ================================

document.addEventListener("DOMContentLoaded", function() {
    var gallerySwiper = new Swiper('.gallerySwiper', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'slide',
        speed: 800,
    });
});

// ================================
// ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА ПОПУЛЯРНОГО МЕНЮ
// ================================

document.addEventListener("DOMContentLoaded", function() {
    var popularSwiper = new Swiper('.popularSwiper', {
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 1.2,
        spaceBetween: 16,
        centeredSlides: false,
        breakpoints: {
            480: {
                slidesPerView: 1.5,
                spaceBetween: 16,
            },
            600: {
                slidesPerView: 2.2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },
        speed: 800,
    });
});

console.log("СМАК сайт загружен");
