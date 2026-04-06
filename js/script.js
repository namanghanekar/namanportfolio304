console.log("script.js loaded");

/* =====================
   DOM READY (IMPORTANT FIX)
===================== */
document.addEventListener("DOMContentLoaded", function () {

    /* =====================
       HAMBURGER MENU
    ===================== */
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });

        // ✅ Auto close menu on click
        document.querySelectorAll("#navMenu a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });
    }

    /* =====================
       BACK TO TOP
    ===================== */
    const topBtn = document.getElementById("backToTop");

    if (topBtn) {
        topBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* =====================
       DARK / LIGHT MODE
    ===================== */
    const toggleBtn = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
        icon.classList.replace("fa-moon", "fa-sun");
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light");

            if (document.body.classList.contains("light")) {
                icon.classList.replace("fa-moon", "fa-sun");
                localStorage.setItem("theme", "light");
            } else {
                icon.classList.replace("fa-sun", "fa-moon");
                localStorage.setItem("theme", "dark");
            }
        });
    }

});

/* =====================
   TYPING EFFECT
===================== */
const text = "I build scalable backend systems and clean web applications.";
let index = 0;

function typeEffect() {
    const el = document.getElementById("typing");
    if (!el) return;

    if (index < text.length) {
        el.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 50);
    }
}

window.addEventListener("load", () => {
    typeEffect();
    revealElements();
});

/* =====================
   SCROLL REVEAL
===================== */
function revealElements() {
    const elements = document.querySelectorAll(".reveal-item, .reveal-about");
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
        if (el.getBoundingClientRect().top < windowHeight - 120) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealElements);

/* =====================
   PROJECT MODAL
===================== */
function openModal(title, desc, img, live, github) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDesc").textContent = desc;
    document.getElementById("modalImg").src = img;

    const liveBtn = document.getElementById("modalLive");
    const gitBtn = document.getElementById("modalGithub");

    liveBtn.style.display = live ? "inline-block" : "none";
    gitBtn.style.display = github ? "inline-block" : "none";

    liveBtn.href = live;
    gitBtn.href = github;

    document.getElementById("projectModal").classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById("projectModal").classList.remove("active");
    document.body.style.overflow = "auto";
}

/* =====================
   CERTIFICATE MODAL
===================== */
function openCertModal(imageSrc) {
    const modal = document.getElementById("certModal");
    const img = document.getElementById("certImg");

    img.src = imageSrc;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeCertModal() {
    const modal = document.getElementById("certModal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

/* Close on outside click */
document.addEventListener("click", function (e) {
    const modal = document.getElementById("certModal");
    if (modal && e.target.id === "certModal") {
        closeCertModal();
    }
});
window.addEventListener("scroll", () => {
    const nav = document.querySelector(".nav");

    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});