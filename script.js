document.addEventListener("DOMContentLoaded", () => {
  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const mobile = document.getElementById("mobile").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      const mailtoLink = `mailto:jrengineeringmdu@yahoo.co.in?subject=New Contact from ${name}&body=Name: ${name}%0D%0AMobile: ${mobile}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

      window.location.href = mailtoLink;
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Add active class to navigation links on scroll
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".main-nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Dark mode toggle
  const darkModeToggle = document.getElementById("darkModeToggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  function toggleDarkMode(isDark) {
    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  // Check for saved user preference, if any, on load
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    toggleDarkMode(true);
  } else if (currentTheme === "light") {
    toggleDarkMode(false);
  } else if (prefersDarkScheme.matches) {
    toggleDarkMode(true);
  }

  // Add event listener to button
  darkModeToggle.addEventListener("click", () => {
    const isDarkMode = document.body.getAttribute("data-theme") === "dark";
    toggleDarkMode(!isDarkMode);
  });

  // Listen for changes to the user's preferred color scheme
  prefersDarkScheme.addListener((evt) => toggleDarkMode(evt.matches));

  // Add event listener to copy button
  const copyButton = document.getElementById("copy-to-clipboard");
  if (copyButton) {
    copyButton.addEventListener("click", () => {
      const name = document.getElementById("name").value;
      const mobile = document.getElementById("mobile").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      const textToCopy = `Name: ${name}\nMobile: ${mobile}\nEmail: ${email}\n\nMessage:\n${message}`;

      navigator.clipboard.writeText(textToCopy).then(
        () => {
          alert("Contact information copied to clipboard!");
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    });
  }
});
