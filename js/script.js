const phrases = [
    "I build Java Spring Boot APIs with clean service layers.",
    "I build Go Gin services with fast, readable routes.",
    "I test backend contracts with Postman and Swagger."
];

const state = {
    phrase: 0,
    char: 0,
    deleting: false
};

function typeLoop() {
    const target = document.getElementById("typing");
    if (!target) return;

    const current = phrases[state.phrase];
    target.textContent = current.slice(0, state.char);

    if (!state.deleting && state.char < current.length) {
        state.char += 1;
        setTimeout(typeLoop, 48);
        return;
    }

    if (!state.deleting && state.char === current.length) {
        state.deleting = true;
        setTimeout(typeLoop, 1300);
        return;
    }

    if (state.deleting && state.char > 0) {
        state.char -= 1;
        setTimeout(typeLoop, 24);
        return;
    }

    state.deleting = false;
    state.phrase = (state.phrase + 1) % phrases.length;
    setTimeout(typeLoop, 280);
}

function setupNavigation() {
    const nav = document.querySelector(".nav");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const links = [...document.querySelectorAll("#navMenu a")];

    const syncNav = () => {
        nav?.classList.toggle("scrolled", window.scrollY > 20);

        const sections = links
            .map(link => document.querySelector(link.getAttribute("href")))
            .filter(Boolean);
        const active = sections.reduce((current, section) => {
            return section.getBoundingClientRect().top <= 130 ? section : current;
        }, sections[0]);

        links.forEach(link => {
            link.classList.toggle("active", active && link.getAttribute("href") === `#${active.id}`);
        });
    };

    menuToggle?.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle?.setAttribute("aria-expanded", "false");
        });
    });

    window.addEventListener("scroll", syncNav, { passive: true });
    syncNav();
}

function setupTheme() {
    const toggle = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");
    const saved = localStorage.getItem("theme");

    if (saved === "light") {
        document.body.classList.add("light");
        icon?.classList.replace("fa-moon", "fa-sun");
    }

    toggle?.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light");
        localStorage.setItem("theme", isLight ? "light" : "dark");
        icon?.classList.toggle("fa-moon", !isLight);
        icon?.classList.toggle("fa-sun", isLight);
    });
}

function setupReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal-item").forEach(item => observer.observe(item));
}

function setupTilt() {
    const cards = document.querySelectorAll(".tilt-card");

    cards.forEach(card => {
        card.addEventListener("pointermove", event => {
            if (window.matchMedia("(max-width: 760px)").matches) return;

            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            card.style.transform = `rotateX(${y * -8}deg) rotateY(${x * 10}deg) translateY(-6px)`;
        });

        card.addEventListener("pointerleave", () => {
            card.style.transform = "";
        });
    });
}

function setupProjectModal() {
    const modal = document.getElementById("projectModal");
    const image = document.getElementById("modalImg");
    const title = document.getElementById("modalTitle");
    const desc = document.getElementById("modalDesc");
    const live = document.getElementById("modalLive");
    const github = document.getElementById("modalGithub");
    const points = document.getElementById("modalPoints");

    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("click", () => {
            image.src = card.dataset.img;
            title.textContent = card.dataset.title;
            desc.textContent = card.dataset.desc;

            live.href = card.dataset.live || "#";
            live.hidden = !card.dataset.live;
            github.href = card.dataset.github || "#";
            github.hidden = !card.dataset.github;
            points.innerHTML = "";

            (card.dataset.points || "")
                .split("|")
                .filter(Boolean)
                .forEach(point => {
                    const item = document.createElement("li");
                    item.textContent = point;
                    points.appendChild(item);
                });

            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        });
    });

    const close = () => {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    modal?.addEventListener("click", event => {
        if (event.target === modal || event.target.closest("[data-close-modal]")) close();
    });
}

function setupCertModal() {
    const modal = document.getElementById("certModal");
    const image = document.getElementById("certImg");
    const title = document.getElementById("certModalTitle");
    const org = document.getElementById("certModalOrg");
    const year = document.getElementById("certModalYear");

    document.querySelectorAll(".cert-card").forEach(card => {
        card.addEventListener("click", () => {
            image.src = card.dataset.cert;
            title.textContent = card.dataset.title || "Certificate";
            org.textContent = card.dataset.org || "";
            year.textContent = card.dataset.year || "";
            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        });
    });

    const close = () => {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    modal?.addEventListener("click", event => {
        if (event.target === modal || event.target.closest("[data-close-cert]")) close();
    });
}

function setupBackToTop() {
    document.getElementById("backToTop")?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function drawBackendScene() {
    const canvas = document.getElementById("systemCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = [
        { label: "Java", orbit: 214, size: 43, speed: 0.008, hue: "#f59e0b" },
        { label: "Go", orbit: 154, size: 39, speed: -0.011, hue: "#38bdf8" },
        { label: "Gin", orbit: 246, size: 35, speed: -0.006, hue: "#22c55e" },
        { label: "API", orbit: 106, size: 34, speed: 0.014, hue: "#a78bfa" },
        { label: "DB", orbit: 180, size: 35, speed: 0.01, hue: "#fb7185" },
        { label: "JWT", orbit: 270, size: 32, speed: 0.005, hue: "#67e8f9" }
    ];
    let tick = 0;

    function render() {
        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;

        ctx.clearRect(0, 0, w, h);

        const glow = ctx.createRadialGradient(cx, cy, 20, cx, cy, 310);
        glow.addColorStop(0, "rgba(56, 189, 248, 0.24)");
        glow.addColorStop(0.42, "rgba(34, 197, 94, 0.08)");
        glow.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, 330, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < 44; i += 1) {
            const angle = i * 0.72 + tick * 0.008;
            const radius = 70 + (i % 7) * 38;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle * 1.17) * radius * 0.42;
            ctx.fillStyle = i % 3 === 0 ? "rgba(34, 197, 94, 0.42)" : "rgba(56, 189, 248, 0.28)";
            ctx.beginPath();
            ctx.arc(x, y, i % 4 === 0 ? 2.2 : 1.4, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = 1;
        [105, 150, 210, 245].forEach((radius, index) => {
            ctx.setLineDash(index % 2 ? [8, 12] : []);
            ctx.beginPath();
            ctx.ellipse(cx, cy, radius, radius * 0.48, tick * 0.006, 0, Math.PI * 2);
            ctx.stroke();
        });
        ctx.setLineDash([]);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(tick * 0.004);

        const cubeSize = 116;
        ctx.fillStyle = "rgba(16, 19, 27, 0.92)";
        ctx.strokeStyle = "rgba(56, 189, 248, 0.54)";
        ctx.lineWidth = 2;
        roundedRect(ctx, -cubeSize / 2, -cubeSize / 2, cubeSize, cubeSize, 18);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#f4f7fb";
        ctx.font = "800 34px Inter, system-ui";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("N", 0, 0);
        ctx.restore();

        const positions = nodes.map((node, index) => {
            const angle = tick * node.speed + index * 1.34;
            return {
                ...node,
                x: cx + Math.cos(angle) * node.orbit,
                y: cy + Math.sin(angle) * node.orbit * 0.48
            };
        });

        positions.forEach(node => {
            ctx.strokeStyle = "rgba(56, 189, 248, 0.18)";
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
        });

        positions.forEach((node, index) => {
            const next = positions[(index + 2) % positions.length];
            ctx.strokeStyle = index % 2 ? "rgba(34, 197, 94, 0.12)" : "rgba(56, 189, 248, 0.12)";
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();
        });

        positions.forEach(node => {
            ctx.shadowColor = node.hue;
            ctx.shadowBlur = 18;
            ctx.fillStyle = "rgba(16, 19, 27, 0.94)";
            ctx.strokeStyle = node.hue;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur = 0;

            ctx.fillStyle = node.hue;
            ctx.font = "800 15px Inter, system-ui";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(node.label, node.x, node.y);
        });

        tick += prefersReducedMotion ? 0 : 1;
        requestAnimationFrame(render);
    }

    render();
}

function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
}

document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupTheme();
    setupReveal();
    setupTilt();
    setupProjectModal();
    setupCertModal();
    setupBackToTop();
    drawBackendScene();
    typeLoop();
});
