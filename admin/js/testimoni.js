document.addEventListener("DOMContentLoaded", () => {
  const testimoniList = document.getElementById("testimoni-list");
  const addTestimoniBtn = document.getElementById("addTestimoniBtn");
  const testimoniModalEl = document.getElementById("testimoniModal");
  const testimoniModal = new bootstrap.Modal(testimoniModalEl);
  const testimoniForm = document.getElementById("testimoniForm");

  const testiName = document.getElementById("testiName");
  const testiMessage = document.getElementById("testiMessage");

  let editIndex = null;

  // Ambil data dari localStorage
  const getTestimoniData = () => JSON.parse(localStorage.getItem("testimoni")) || [];

  // Simpan data ke localStorage
  const saveTestimoniData = (data) => localStorage.setItem("testimoni", JSON.stringify(data));

  // Render data ke tabel
  function renderTestimoni() {
    const data = getTestimoniData();
    testimoniList.innerHTML = "";

    if (data.length === 0) {
      testimoniList.innerHTML = `<tr><td colspan="4" class="text-muted text-center">Belum ada testimoni yang ditambahkan.</td></tr>`;
      return;
    }

    data.forEach((testi, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${testi.nama}</td>
        <td>"${testi.message}"</td>
        <td>
          <button class="btn btn-warning btn-sm me-1 edit-btn" data-index="${index}">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      testimoniList.appendChild(row);
    });

    // Tombol edit
    document.querySelectorAll(".edit-btn").forEach((btn) =>
      btn.addEventListener("click", (e) => editTestimoni(+e.currentTarget.dataset.index))
    );

    // Tombol hapus
    document.querySelectorAll(".delete-btn").forEach((btn) =>
      btn.addEventListener("click", (e) => deleteTestimoni(+e.currentTarget.dataset.index))
    );
  }

  // Buka modal tambah
  addTestimoniBtn.addEventListener("click", () => {
    editIndex = null;
    testimoniForm.reset();
    testimoniModal.show();
  });

  // Submit form (tambah/edit)
  testimoniForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = testiName.value.trim();
    const message = testiMessage.value.trim();
    if (!nama || !message) return;

    const data = getTestimoniData();
    const newEntry = { nama, message };

    if (editIndex === null) {
      data.push(newEntry);
    } else {
      data[editIndex] = newEntry;
    }

    saveTestimoniData(data);
    renderTestimoni();
    testimoniModal.hide();
  });

  // Edit testimoni
  function editTestimoni(index) {
    const data = getTestimoniData();
    const testi = data[index];

    testiName.value = testi.nama;
    testiMessage.value = testi.message;
    editIndex = index;

    testimoniModal.show();
  }

  // Hapus testimoni
  function deleteTestimoni(index) {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return;

    const data = getTestimoniData();
    data.splice(index, 1);
    saveTestimoniData(data);
    renderTestimoni();
  }

  // Inisialisasi awal
  renderTestimoni();
});
