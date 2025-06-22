document.addEventListener("DOMContentLoaded", () => {
  // ==================================================
  // 📊 Data Simulasi Statistik Mingguan
  // ==================================================
  const orderData = [
    { date: '2023-06-01', count: 10 },
    { date: '2023-06-02', count: 12 },
    { date: '2023-06-03', count: 8 },
    { date: '2023-06-04', count: 15 },
    { date: '2023-06-05', count: 20 },
    { date: '2023-06-06', count: 25 },
    { date: '2023-06-07', count: 30 }
  ];

  const testimonialCount = 45;
  const portfolioCount = 12;

  // ==================================================
  // 🔢 Animasi Count Up
  // ==================================================
  function animateCount(id, target, duration = 1000) {
    const el = document.getElementById(id);
    if (!el) return;

    const startTime = performance.now();
    const start = 0;

    function update(timestamp) {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      el.textContent = Math.floor(progress * (target - start) + start);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // ==================================================
  // 📈 Statistik Angka
  // ==================================================
  const totalOrders = orderData.reduce((acc, curr) => acc + curr.count, 0);
  animateCount("order-count", totalOrders);
  animateCount("testimonial-count", testimonialCount);
  animateCount("portfolio-count", portfolioCount);

  // ==================================================
  // 📉 Chart.js - Line Chart
  // ==================================================
  const chartCanvas = document.getElementById("orderChart");
  if (chartCanvas) {
    const ctx = chartCanvas.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: orderData.map(d => d.date),
        datasets: [{
          label: "Jumlah Pemesanan",
          data: orderData.map(d => d.count),
          fill: true,
          borderColor: "#3498db",
          backgroundColor: "rgba(52, 152, 219, 0.07)",
          pointBackgroundColor: "#2980b9",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 5,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "nearest",
          intersect: false
        },
        scales: {
          x: {
            title: { display: true, text: "Tanggal" },
            ticks: { color: "#2c3e50" }
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: "Jumlah Pemesanan" },
            ticks: { color: "#2c3e50" }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#2c3e50",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#2980b9",
            borderWidth: 2
          }
        }
      }
    });
  }

  // ==================================================
  // 📱 Toggle Sidebar (Mobile)
  // ==================================================
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  if (sidebarToggle && sidebar && overlay) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");
      overlay.classList.toggle("show");
    });

    overlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("show");
    });
  }

  // ==================================================
  // 🔄 Tombol Refresh Halaman (Jika Ada)
  // ==================================================
  const refreshBtn = document.getElementById("reload-btn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      location.reload();
    });
  }
});
