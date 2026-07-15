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

var header = document.querySelector(".header");

window.addEventListener("scroll", function() {
    if (window.scrollY > 80) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var menuBtn = document.querySelector(".mobile-menu");
    var nav = document.querySelector(".nav");

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            nav.classList.toggle("open");
            this.classList.toggle("active");
        });

        // закрытие при клике на ссылку
        var links = document.querySelectorAll(".nav a");
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", function() {
                nav.classList.remove("open");
                menuBtn.classList.remove("active");
            });
        }

        // закрытие при клике вне меню
        document.addEventListener("click", function(e) {
            if (nav.classList.contains("open") && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
                nav.classList.remove("open");
                menuBtn.classList.remove("active");
            }
        });
    }
});

var bookingForm = document.querySelector(".booking form");

if (bookingForm) {
    bookingForm.addEventListener("submit", function(e) {
        e.preventDefault();

        var button = this.querySelector("button");

        button.innerHTML = "Заявка отправлена ✓";
        button.style.background = "#1f8f4d";

        setTimeout(function() {
            button.innerHTML = "Отправить заявку";
            button.style.background = "";
            bookingForm.reset();
        }, 3000);
    });
}

console.log("СМАК сайт загружен");
