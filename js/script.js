document.addEventListener("DOMContentLoaded", () => {
  // Utility: Debounce
  function debounce(func, delay) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
  }

  // Set current year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // WhatsApp scroll-top
  const whatsappBtn = document.querySelector(".btn-whatsapp");
  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Animate-up
  const animatedElements = document.querySelectorAll(".animate-up");
  animatedElements.forEach((el, i) => {
    el.style.animationDelay = `${0.2 + i * 0.15}s`;
  });
  const animationObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  animatedElements.forEach((el) => animationObserver.observe(el));

  // Counter
  const counters = document.querySelectorAll(".count");
  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1500;
        const start = performance.now();
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);

        const animate = (time) => {
          const progress = (time - start) / duration;
          if (progress < 1) {
            el.textContent = Math.ceil(easeOut(progress) * target);
            requestAnimationFrame(animate);
          } else {
            el.textContent = target;
            el.classList.add("finished");
            el.style.animation = "bounce 0.4s ease";
          }
        };
        requestAnimationFrame(animate);
        obs.unobserve(el);
      }
    });
  }, { threshold: 1 });
  counters.forEach((el) => counterObserver.observe(el));

  // Navbar shrink
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", debounce(() => {
    if (navbar) navbar.classList.toggle("shrink", window.scrollY > 50);
  }, 50));

  // Scrollspy
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link[href^='#']");
  window.addEventListener("scroll", debounce(() => {
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
  }, 75));

  const navbarCollapse = document.getElementById("navbarNav");

  // Manual toggle for navbar-toggler
  const navbarToggler = document.querySelector(".navbar-toggler");
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
      } else {
        new bootstrap.Collapse(navbarCollapse, { toggle: true });
      }
    });
  }

  // Toggle dropdown (mobile)
  document.querySelectorAll(".nav-item.dropdown > a").forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      if (window.innerWidth <= 991) {
        const parent = toggle.parentElement;
        const isOpen = parent.classList.contains("show");

        // Tutup semua dropdown lainnya
        document.querySelectorAll(".nav-item.dropdown").forEach((item) => {
          item.classList.remove("show");
        });

        // Toggle aktif
        if (!isOpen) {
          parent.classList.add("show");
        }

        e.preventDefault();
        e.stopPropagation();
      }
    });
  });

  // Toggle submenu (mobile)
  document.querySelectorAll(".dropdown-submenu > .dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      if (window.innerWidth <= 991) {
        const submenu = toggle.nextElementSibling;
        const isOpen = submenu?.classList.contains("show");

        // Tutup semua submenu lainnya
        document.querySelectorAll(".dropdown-submenu .dropdown-menu").forEach((menu) => {
          menu.classList.remove("show");
        });

        // Toggle aktif
        if (submenu && !isOpen) {
          submenu.classList.add("show");
        }

        e.preventDefault();
        e.stopPropagation();
      }
    });
  });

  // Klik link biasa → tutup navbar collapse
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      const isDropdownToggle = link.classList.contains("dropdown-toggle");
      const isInsideSubmenu = link.closest(".dropdown-submenu");

      if (window.innerWidth <= 991 && navbarCollapse.classList.contains("show")) {
        if (!isDropdownToggle && !isInsideSubmenu) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        } else {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    });
  });

  // Click outside to close
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
      document.querySelectorAll(".nav-item.dropdown, .dropdown-submenu .dropdown-menu").forEach((el) => {
        el.classList.remove("show");
      });
    }
  });

  // === TESTIMONI FORM ===
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
      testiCarouselInner.appendChild(newItem);

      const items = testiCarouselInner.querySelectorAll(".carousel-item");
      if (items.length === 1) newItem.classList.add("active");

      testiForm.reset();
      bootstrap.Modal.getInstance(testiModal).hide();
    });
  }

  // === PORTFOLIO MODAL ===
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const modal = new bootstrap.Modal(document.getElementById("portfolioModal"));
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const carouselInner = document.querySelector("#modalCarousel .carousel-inner");

  portfolioItems.forEach((item) => {
    item.addEventListener("click", () => {
      const title = item.getAttribute("data-title");
      const description = item.getAttribute("data-description");
      const images = item.getAttribute("data-images").split(",");

      modalTitle.textContent = title;
      modalDescription.textContent = description;
      carouselInner.innerHTML = "";

      images.forEach((src, i) => {
        const carouselItem = document.createElement("div");
        carouselItem.className = "carousel-item" + (i === 0 ? " active" : "");
        carouselItem.innerHTML = `<img src="${src.trim()}" class="d-block w-100 rounded" alt="${title}">`;
        carouselInner.appendChild(carouselItem);
      });

      modal.show();
    });
  });
});
