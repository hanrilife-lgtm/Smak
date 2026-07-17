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

console.log("СМАК сайт загружен");
