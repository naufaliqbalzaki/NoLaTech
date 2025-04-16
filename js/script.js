document.addEventListener("DOMContentLoaded", () => {
  // WhatsApp Button - Scroll to Top Feature
  const whatsappBtn = document.querySelector('.btn.btn-success');
  whatsappBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Scroll Animation for sections
  const elements = document.querySelectorAll(".animate-up");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.1
  });
  elements.forEach(el => observer.observe(el));

  // Dropdown toggle for mobile
  const dropdowns = document.querySelectorAll('.nav-item.dropdown');
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
      // Toggle visibility of dropdown menu on mobile
      dropdown.classList.toggle('show');
      e.stopPropagation(); // Prevent event from propagating
    });
  });

  // Submenu toggle for Pembuatan Website and Desain Grafis
  const submenuItems = document.querySelectorAll('.dropdown-submenu > .dropdown-item');
  submenuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const submenu = item.nextElementSibling; // Next sibling is the actual submenu
      if (submenu && submenu.classList.contains('dropdown-menu')) {
        submenu.classList.toggle('show'); // Toggle submenu visibility
        e.stopPropagation(); // Prevent the click event from propagating
      }
    });
  });

  // Close dropdown if clicked outside
  document.addEventListener('click', (e) => {
    const isClickInsideDropdown = e.target.closest('.nav-item.dropdown');
    const isClickInsideSubmenu = e.target.closest('.dropdown-submenu');

    if (!isClickInsideDropdown && !isClickInsideSubmenu) {
      // Hide all dropdowns and submenus if clicked outside
      dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
      submenuItems.forEach(item => {
        const submenu = item.nextElementSibling;
        if (submenu && submenu.classList.contains('dropdown-menu')) {
          submenu.classList.remove('show'); // Hide submenu when clicking outside
        }
      });
    }
  });
});
