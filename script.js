/* =================================
   SMAK RESTAURANT
   PREMIUM JAVASCRIPT
================================= */

// ================================
// LOADER
// ================================

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
        header.addEventListener("click", function() {
            var category = this.parentElement;
            var isActive = category.classList.contains("active");

            document.querySelectorAll(".menu-category").forEach(function(cat) {
                cat.classList.remove("active");
            });

            if (!isActive) {
                category.classList.add("active");
            }
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
        var url = "https://script.google.com/macros/s/AKfycbz00VZuQaRq1akKUwNLQI9EFUWF_Eyw7wubWqwBIWWRF3TEvDLXC78_xD39ts8jfCeI/exec";

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

console.log("СМАК сайт загружен");
