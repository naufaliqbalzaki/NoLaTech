document.addEventListener("DOMContentLoaded", () => {
  const portofolioList = document.getElementById("portofolio-list");
  const addBtn = document.getElementById("addPortofolioBtn");
  const modalEl = document.getElementById("portofolioModal");
  const modal = new bootstrap.Modal(modalEl);
  const form = document.getElementById("portofolioForm");

  const titleInput = document.getElementById("portofolioTitle");
  const descInput = document.getElementById("portofolioDescription");
  const imageInput = document.getElementById("portofolioImage");

  let editIndex = null;
  let currentImageData = "";

  // Ambil data dari localStorage
  function getData() {
    return JSON.parse(localStorage.getItem("portofolio")) || [];
  }

  // Simpan data ke localStorage
  function saveData(data) {
    localStorage.setItem("portofolio", JSON.stringify(data));
  }

  // Tampilkan data di tabel
  function renderPortofolio() {
    const data = getData();
    portofolioList.innerHTML = "";

    if (data.length === 0) {
      portofolioList.innerHTML = `<tr><td colspan="5" class="text-muted text-center">Belum ada data portofolio.</td></tr>`;
      return;
    }

    data.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.title}</td>
        <td>"${item.description}"</td>
        <td><img src="${item.image}" alt="${item.title}" /></td>
        <td>
          <button class="btn btn-warning btn-sm me-1 edit-btn" data-index="${index}">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      portofolioList.appendChild(row);
    });

    // Bind tombol edit dan hapus
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        editPortofolio(parseInt(btn.dataset.index));
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        deletePortofolio(parseInt(btn.dataset.index));
      });
    });
  }

  // Buka modal untuk tambah data
  addBtn.addEventListener("click", () => {
    form.reset();
    editIndex = null;
    currentImageData = "";
    modal.show();
  });

  // Simpan data (tambah atau edit)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const file = imageInput.files[0];

    if (!title || !description || (!file && editIndex === null)) return;

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = file ? reader.result : currentImageData;

      const data = getData();
      const entry = { title, description, image: imageData };

      if (editIndex === null) {
        data.push(entry);
      } else {
        data[editIndex] = entry;
      }

      saveData(data);
      renderPortofolio();
      modal.hide();
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      reader.onload();
    }
  });

  // Edit data
  function editPortofolio(index) {
    const data = getData();
    const item = data[index];

    titleInput.value = item.title;
    descInput.value = item.description;
    imageInput.value = ""; // Reset input file
    currentImageData = item.image;
    editIndex = index;

    modal.show();
  }

  // Hapus data
  function deletePortofolio(index) {
    if (!confirm("Yakin ingin menghapus portofolio ini?")) return;
    const data = getData();
    data.splice(index, 1);
    saveData(data);
    renderPortofolio();
  }

  // Inisialisasi saat halaman dimuat
  renderPortofolio();
});
