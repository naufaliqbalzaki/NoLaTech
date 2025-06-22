document.addEventListener("DOMContentLoaded", () => {
  const orderList = document.getElementById("order-list");
  const addOrderBtn = document.getElementById("addOrderBtn");
  const orderModalEl = document.getElementById("orderModal");
  const orderModal = new bootstrap.Modal(orderModalEl);
  const orderForm = document.getElementById("orderForm");

  const customerName = document.getElementById("customerName");
  const orderService = document.getElementById("orderService");
  const orderStatus = document.getElementById("orderStatus");
  const orderDate = document.getElementById("orderDate");
  const orderPackage = document.getElementById("orderPackage");
  const orderType = document.getElementById("orderType");

  let editIndex = null;

  // Ambil data dari localStorage
  const getOrderData = () => JSON.parse(localStorage.getItem("orders")) || [];

  // Simpan data ke localStorage
  const saveOrderData = (data) => localStorage.setItem("orders", JSON.stringify(data));

  // Render data ke dalam tabel
  function renderOrders() {
    const data = getOrderData();
    orderList.innerHTML = "";

    if (data.length === 0) {
      orderList.innerHTML = `<tr><td colspan="8" class="text-center text-muted">Belum ada data pemesanan.</td></tr>`;
      return;
    }

    data.forEach((order, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${order.customerName}</td>
        <td>${order.service}</td>
        <td>${order.package || "-"}</td>
        <td>${order.type || "-"}</td>
        <td>
          <span class="badge ${order.status === 'completed' ? 'bg-success' : 'bg-warning'} text-capitalize">
            ${order.status}
          </span>
        </td>
        <td>${order.date}</td>
        <td>
          <button class="btn btn-warning btn-sm me-1 edit-btn" data-index="${index}">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      orderList.appendChild(row);
    });

    // Tombol edit
    document.querySelectorAll(".edit-btn").forEach((btn) =>
      btn.addEventListener("click", (e) => editOrder(+e.currentTarget.dataset.index))
    );

    // Tombol hapus
    document.querySelectorAll(".delete-btn").forEach((btn) =>
      btn.addEventListener("click", (e) => deleteOrder(+e.currentTarget.dataset.index))
    );
  }

  // Tambah baru
  addOrderBtn.addEventListener("click", () => {
    editIndex = null;
    orderForm.reset();
    orderModal.show();
  });

  // Submit form
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = customerName.value.trim();
    const service = orderService.value;
    const status = orderStatus.value;
    const date = orderDate.value;
    const pkg = orderPackage?.value || "-";
    const type = orderType?.value || "-";

    if (!name || !service || !status || !date) return;

    const data = getOrderData();
    const newOrder = {
      customerName: name,
      service,
      package: pkg,
      type: type,
      status,
      date
    };

    if (editIndex === null) {
      data.push(newOrder);
    } else {
      data[editIndex] = newOrder;
    }

    saveOrderData(data);
    renderOrders();
    orderModal.hide();
  });

  // Edit
  function editOrder(index) {
    const data = getOrderData();
    const order = data[index];

    customerName.value = order.customerName;
    orderService.value = order.service;
    orderStatus.value = order.status;
    orderDate.value = order.date;
    if (orderPackage) orderPackage.value = order.package || "";
    if (orderType) orderType.value = order.type || "";

    editIndex = index;
    orderModal.show();
  }

  // Hapus
  function deleteOrder(index) {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    const data = getOrderData();
    data.splice(index, 1);
    saveOrderData(data);
    renderOrders();
  }

  // Jalankan saat awal
  renderOrders();
});
