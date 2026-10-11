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

if (header) {
    window.addEventListener("scroll", function() {
        if (window.scrollY > 80) {
            header.classList.add("active");
        } else {
            header.classList.remove("active");
        }
    }, { passive: true });
}

// ================================
// MOBILE MENU
// ================================

document.addEventListener("DOMContentLoaded", function() {
    var menuBtn = document.querySelector(".mobile-menu");
    var nav = document.querySelector(".nav");

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            var isOpen = nav.classList.toggle("open");
            this.classList.toggle("active");
            this.setAttribute("aria-expanded", isOpen);
        });

        var links = document.querySelectorAll(".nav a");
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", function() {
                nav.classList.remove("open");
                menuBtn.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        }

        document.addEventListener("click", function(e) {
            if (nav.classList.contains("open") && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
                nav.classList.remove("open");
                menuBtn.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
            }
        });
    }
});

// ================================
// АККОРДЕОН МЕНЮ (для menu.html)
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
// ОТПРАВКА ФОРМЫ (с валидацией и защитой от спама)
// ================================

var bookingForm = document.querySelector("#bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function(e) {
        e.preventDefault();

        // === 1. Honeypot защита ===
        var honeypot = this.querySelector("input[name='_company']");
        if (honeypot && honeypot.value !== "") {
            console.warn("Спам-бот обнаружен");
            return;
        }

        // === 2. Собираем данные ===
        var formData = new FormData(this);
        var name = (formData.get("Имя") || "").trim();
        var phone = (formData.get("Телефон") || "").trim();
        var date = formData.get("Дата") || "";
        var guests = (formData.get("Гости") || "").trim();

        // === 3. Валидация ===
        var errors = [];

        if (name.length < 2) {
            errors.push("Введите имя (минимум 2 символа)");
        }

        var phoneClean = phone.replace(/[^\d]/g, "");
        if (phoneClean.length < 10) {
            errors.push("Введите корректный номер телефона");
        }

        if (!date) {
            errors.push("Выберите дату");
        }

        if (!guests || guests.length === 0) {
            errors.push("Укажите количество гостей");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        // === 4. Отправляем ===
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
// СЛАЙДЕР ГАЛЕРЕИ
// ================================

document.addEventListener("DOMContentLoaded", function() {
    if (typeof Swiper !== "undefined" && document.querySelector(".gallerySwiper")) {
        new Swiper('.gallerySwiper', {
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
    }
});

// ================================
// СЛАЙДЕР ПОПУЛЯРНОГО МЕНЮ
// ================================

document.addEventListener("DOMContentLoaded", function() {
    if (typeof Swiper !== "undefined" && document.querySelector(".popularSwiper")) {
        new Swiper('.popularSwiper', {
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
                480: { slidesPerView: 1.5, spaceBetween: 16 },
                600: { slidesPerView: 2.2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 24 },
                1024: { slidesPerView: 4, spaceBetween: 30 },
            },
            speed: 800,
        });
    }
});

console.log("СМАК сайт загружен");
