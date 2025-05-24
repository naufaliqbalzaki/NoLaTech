document.addEventListener("DOMContentLoaded", () => {
  // Set the current year in the footer
  const year = new Date().getFullYear();
  document.getElementById("year").textContent = year;

  // WhatsApp Button - Scroll to Top Feature
  const whatsappBtn = document.querySelector('.btn.btn-success');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll Animation for sections
  const elements = document.querySelectorAll(".animate-up");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(el => observer.observe(el));

  // Dropdown toggle for mobile (Layanan dropdown)
  const dropdowns = document.querySelectorAll('.nav-item.dropdown > a');
  dropdowns.forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', (e) => {
      const parent = dropdownToggle.parentElement;
      parent.classList.toggle('show');

      // Close other open dropdowns
      document.querySelectorAll('.nav-item.dropdown').forEach(other => {
        if (other !== parent) other.classList.remove('show');
      });

      e.preventDefault(); // Prevent link navigation
      e.stopPropagation(); // Prevent bubbling
    });
  });

  // Submenu toggle for Pembuatan Website and Desain Grafis
  const submenuToggles = document.querySelectorAll('.dropdown-submenu > .dropdown-toggle');
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      const submenu = toggle.nextElementSibling;
      if (submenu && submenu.classList.contains('dropdown-menu')) {
        submenu.classList.toggle('show');

        // Close other submenus
        document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach(otherSubmenu => {
          if (otherSubmenu !== submenu) otherSubmenu.classList.remove('show');
        });

        e.preventDefault(); // Prevent link default
        e.stopPropagation(); // Stop bubbling
      }
    });
  });

  // Close dropdowns if clicked outside
  document.addEventListener('click', (e) => {
    const isInsideDropdown = e.target.closest('.nav-item.dropdown');
    const isInsideSubmenu = e.target.closest('.dropdown-submenu');

    if (!isInsideDropdown && !isInsideSubmenu) {
      document.querySelectorAll('.nav-item.dropdown').forEach(drop => drop.classList.remove('show'));
      document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach(sub => sub.classList.remove('show'));
    }
  });
});
