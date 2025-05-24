document.addEventListener("DOMContentLoaded", () => {
  // Utility: Debounce
  function debounce(func, delay) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
  }

  // Set current year in footer
  const year = new Date().getFullYear();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = year;

  // WhatsApp Button scroll-to-top
  const whatsappBtn = document.querySelector(".btn-whatsapp");
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Animate-up logic with dynamic delay
  const animatedElements = document.querySelectorAll(".animate-up");
  animatedElements.forEach((el, index) => {
    el.style.animationDelay = `${0.2 + index * 0.15}s`;
  });

  const animationObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((el) => animationObserver.observe(el));

  // Count-up for .count elements
  const counters = document.querySelectorAll(".count");
  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const duration = 1500;
          const start = performance.now();

          function easeOut(t) {
            return 1 - Math.pow(1 - t, 3);
          }

          function animate(time) {
            let progress = (time - start) / duration;
            if (progress < 1) {
              el.textContent = Math.ceil(easeOut(progress) * target);
              requestAnimationFrame(animate);
            } else {
              el.textContent = target;
              el.classList.add("finished");
              el.style.animation = "bounce 0.4s ease";
            }
          }

          requestAnimationFrame(animate);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 1 }
  );

  counters.forEach((el) => counterObserver.observe(el));

  // Navbar shrink on scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener(
    "scroll",
    debounce(() => {
      if (navbar) navbar.classList.toggle("shrink", window.scrollY > 50);
    }, 50)
  );

  // Scrollspy active class toggle
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");

  const handleScrollSpy = () => {
    const scrollPos = window.scrollY + 150;
    sections.forEach((section) => {
      const id = section.id;
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          navLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      }
    });
  };
  window.addEventListener("scroll", debounce(handleScrollSpy, 75));

  // Mobile Dropdown + Submenu toggles
  const toggleMobileDropdowns = () => {
    const dropdowns = document.querySelectorAll(".nav-item.dropdown > a");
    dropdowns.forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        if (window.innerWidth <= 991) {
          const parent = toggle.parentElement;
          parent.classList.toggle("show");
          document.querySelectorAll(".nav-item.dropdown").forEach((other) => {
            if (other !== parent) other.classList.remove("show");
          });
          e.preventDefault();
          e.stopPropagation();
        }
      });
    });

    const submenus = document.querySelectorAll(".dropdown-submenu > .dropdown-toggle");
    submenus.forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        if (window.innerWidth <= 991) {
          const submenu = toggle.nextElementSibling;
          submenu?.classList.toggle("show");
          document.querySelectorAll(".dropdown-submenu .dropdown-menu").forEach((other) => {
            if (other !== submenu) other.classList.remove("show");
          });
          e.preventDefault();
          e.stopPropagation();
        }
      });
    });
  };
  toggleMobileDropdowns();

  // Click outside to close dropdowns
  document.addEventListener("click", (e) => {
    const insideDropdown = e.target.closest(".nav-item.dropdown, .dropdown-submenu");
    if (!insideDropdown) {
      document.querySelectorAll(".nav-item.dropdown").forEach((el) => el.classList.remove("show"));
      document.querySelectorAll(".dropdown-submenu .dropdown-menu").forEach((el) => el.classList.remove("show"));
    }
  });

  // Reset dropdowns on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 991) {
      document.querySelectorAll(".nav-item.dropdown, .dropdown-submenu .dropdown-menu").forEach((el) =>
        el.classList.remove("show")
      );
    }
  });

  // ==== TESTIMONI FORM ====

  const openFormBtn = document.getElementById("openTestiForm");
  const testiModal = document.getElementById("testiModal");
  const testiForm = document.getElementById("testiForm");
  const testiCarouselInner = document.querySelector("#carouselExample .carousel-inner");

  if (openFormBtn && testiModal && testiForm && testiCarouselInner) {
    openFormBtn.addEventListener("click", () => {
      new bootstrap.Modal(testiModal).show();
    });

    testiForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("testiName").value.trim();
      const message = document.getElementById("testiMessage").value.trim();

      if (!name || !message) return;

      const newItem = document.createElement("div");
      newItem.classList.add("carousel-item");
      newItem.innerHTML = `
        <blockquote class="blockquote">
          <p>"${message}"</p>
          <footer class="blockquote-footer">
            <span class="author-name">${name}</span>
          </footer>
        </blockquote>
      `;

      // Tambah ke carousel
      testiCarouselInner.appendChild(newItem);

      // Jika sebelumnya hanya ada 1 item aktif, nonaktifkan dan set baru jadi aktif
      const items = testiCarouselInner.querySelectorAll(".carousel-item");
      if (items.length === 1) {
        newItem.classList.add("active");
      }

      // Reset dan tutup modal
      testiForm.reset();
      bootstrap.Modal.getInstance(testiModal).hide();
    });
  }
});