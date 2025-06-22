// admin/js/auth.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById('loginForm');
  const togglePassword = document.getElementById('togglePassword');
  const passwordField = document.getElementById('password');

  // Dummy credentials
  const adminCredentials = {
    username: 'admin',
    password: 'password123'
  };

  // Handle Login Submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = passwordField.value.trim();

    // Basic credential check
    if (username === adminCredentials.username && password === adminCredentials.password) {
      alert("Login Berhasil! Mengarahkan ke dashboard...");
      window.location.href = "dashboard.html";
    } else {
      alert("Username atau password salah!");
    }
  });

  // Optional: Toggle show/hide password
  if (togglePassword && passwordField) {
    togglePassword.addEventListener('click', () => {
      const type = passwordField.type === 'password' ? 'text' : 'password';
      passwordField.type = type;
      togglePassword.innerHTML = type === 'password'
        ? '<i class="fa fa-eye"></i>'
        : '<i class="fa fa-eye-slash"></i>';
    });
  }
});
