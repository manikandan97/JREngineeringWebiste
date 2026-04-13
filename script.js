document.addEventListener("DOMContentLoaded", () => {
  // --- Hamburger Menu ---
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("mainNav");
  const navOverlay = document.getElementById("navOverlay");

  function closeMenu() {
    hamburger.classList.remove("active");
    mainNav.classList.remove("open");
    navOverlay.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }

  function openMenu() {
    hamburger.classList.add("active");
    mainNav.classList.add("open");
    navOverlay.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
  }

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      const isOpen = mainNav.classList.contains("open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener("click", closeMenu);
  }

  // Close menu when a nav link is clicked
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // --- Header Shrink on Scroll ---
  const header = document.getElementById("header");

  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleHeaderScroll, { passive: true });

  // --- Smooth Scrolling ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".main-nav a:not(.nav-cta)");

  function updateActiveNav() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });

  // --- IntersectionObserver for Scroll Animations ---
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in, .fade-in-stagger").forEach((el) => {
    fadeObserver.observe(el);
  });

  // --- Dark Mode Toggle ---
  const darkModeToggle = document.getElementById("darkModeToggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  function toggleDarkMode(isDark) {
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  // Check for saved preference
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    toggleDarkMode(true);
  } else if (currentTheme === "light") {
    toggleDarkMode(false);
  } else if (prefersDarkScheme.matches) {
    toggleDarkMode(true);
  }

  darkModeToggle.addEventListener("click", () => {
    const isDarkMode = document.body.getAttribute("data-theme") === "dark";
    toggleDarkMode(!isDarkMode);
  });

  // Listen for system theme changes (using modern API)
  prefersDarkScheme.addEventListener("change", (evt) =>
    toggleDarkMode(evt.matches)
  );

  // --- Contact Form (mailto) ---
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const mobile = document.getElementById("mobile").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      const mailtoLink = `mailto:jrengineeringmdu@gmail.com?subject=New Enquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nMobile: ${mobile}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      window.location.href = mailtoLink;
    });
  }
});
