// Navbar Scroll Effect
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("nav-scrolled");
    } else {
        navbar.classList.remove("nav-scrolled");
    }
});

// Fade-in Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("fade-in");
    });
});

document.querySelectorAll("section").forEach(sec => observer.observe(sec));
