let tickets = [
  {
    id: 1001,
    ticketCode: "#VE-1001",
    customerName: "Nguyễn Văn A",
    customerPhone: "0987.xxx.xxx",
    movie: "Dune: Part Two",
    showtime: "10:00 - 15/10/2023",
    seats: ["F12", "F13"],
    totalAmount: 180000,
    status: "paid",
    note: ""
  },
  {
    id: 1002,
    ticketCode: "#VE-1002",
    customerName: "Trần Thị B",
    customerPhone: "0912.xxx.xxx",
    movie: "Mai",
    showtime: "13:30 - 15/10/2023",
    seats: ["G5"],
    totalAmount: 90000,
    status: "pending",
    note: ""
  },
  {
    id: 1003,
    ticketCode: "#VE-1003",
    customerName: "Lê Văn C",
    customerPhone: "0909.xxx.xxx",
    movie: "Kung Fu Panda 4",
    showtime: "19:00 - 15/10/2023",
    seats: ["H10", "H11", "H12"],
    totalAmount: 270000,
    status: "paid",
    note: ""
  },
  {
    id: 1004,
    ticketCode: "#VE-1004",
    customerName: "Phạm Minh D",
    customerPhone: "0933.xxx.xxx",
    movie: "Exhuma: Quật Mộ",
    showtime: "21:45 - 14/10/2023",
    seats: ["E8"],
    totalAmount: 90000,
    status: "cancelled",
    note: "Khách hủy do bận đột xuất"
  },
  {
    id: 1005,
    ticketCode: "#VE-1005",
    customerName: "Hoàng Yến E",
    customerPhone: "0977.xxx.xxx",
    movie: "Godzilla x Kong",
    showtime: "09:15 - 16/10/2023",
    seats: ["D4", "D5"],
    totalAmount: 180000,
    status: "pending",
    note: ""
  }
];

// Render Ticket Table
function renderTicketTable() {
  const tableBody = document.querySelector('.ticket-table tbody');
  tableBody.innerHTML = tickets.map(ticket => `
    <tr>
      <td class="ticket-id">${ticket.ticketCode}</td>
      <td class="info-cell">
        <span class="primary">${ticket.customerName}</span>
        <span class="secondary">${ticket.customerPhone}</span>
      </td>
      <td>${ticket.movie}</td>
      <td class="info-cell">
        <span class="primary">${ticket.showtime.split(' - ')[0]}</span>
        <span class="secondary date">${ticket.showtime.split(' - ')[1]}</span>
      </td>
      <td>
        <div class="seat-cell">
          ${ticket.seats.map(seat => `<span class="seat-badge">${seat}</span>`).join('')}
        </div>
      </td>
      <td style="font-weight: 700">${ticket.totalAmount.toLocaleString()}đ</td>
      <td><span class="status-badge ${ticket.status}">${getStatusText(ticket.status)}</span></td>
      <td class="action-btns">
        <i class="fa-solid fa-pen-to-square" onclick="openEditTicketModal(${ticket.id})"></i>
        <i class="fa-solid fa-circle-xmark" onclick="openCancelTicketModal(${ticket.id})"></i>
      </td>
    </tr>
  `).join('');
}
function getStatusText(status) {
  switch (status) {
    case 'paid': return 'Đã Thanh Toán';
    case 'pending': return 'Chờ xử lý';
    case 'cancelled': return 'Đã hủy';
    default: return '';
  }
}
function openAddTicketModal() {
  document.getElementById('add-ticket-modal').style.display = 'block';
}
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}
function addTicket(event) {
  event.preventDefault();
  const form = event.target;
  const newTicket = {
    id: Date.now(),
    ticketCode: `#VE-${Date.now().toString().slice(-4)}`,
    customerName: form['add-customer-name'].value,
    customerPhone: form['add-customer-phone'].value,
    movie: form['add-movie'].options[form['add-movie'].selectedIndex].text,
    showtime: form['add-showtime'].options[form['add-showtime'].selectedIndex].text,
    seats: form['add-seats'].value.split(',').map(seat => seat.trim()),
    totalAmount: 90000 * form['add-seats'].value.split(',').length,
    status: form['add-payment-method'].value === '1' ? 'paid' : 'pending',
    note: form['add-note'].value
  };
  tickets.push(newTicket);
  renderTicketTable();
  closeModal('add-ticket-modal');
  form.reset();
}
function openEditTicketModal(ticketId) {
  const ticket = tickets.find(t => t.id === ticketId);
  const form = document.getElementById('edit-ticket-form');
  document.getElementById('edit-ticket-id').value = ticket.id;
  document.getElementById('edit-customer-name').value = ticket.customerName;
  document.getElementById('edit-showtime').value = ticket.showtime;
  document.getElementById('edit-seats').value = ticket.seats.join(', ');
  document.getElementById('edit-seat-count').textContent = ticket.seats.length;
  document.getElementById('edit-total-amount').textContent = `${ticket.totalAmount.toLocaleString()} đ`;
  document.getElementById('edit-payment-status').value = ticket.status === 'paid' ? 'true' : 'false';
  document.getElementById('edit-note').value = ticket.note;
  document.getElementById('edit-ticket-modal').style.display = 'block';
}
function updateTicket(event) {
  event.preventDefault();
  const form = event.target;
  const ticketId = parseInt(form['edit-ticket-id'].value);
  const updatedTicket = {
    ...tickets.find(t => t.id === ticketId),
    movie: form['edit-movie'].options[form['edit-movie'].selectedIndex].text,
    status: form['edit-payment-status'].value === 'true' ? 'paid' : 'pending',
    note: form['edit-note'].value
  };
  tickets = tickets.map(t => t.id === ticketId ? updatedTicket : t);
  renderTicketTable();
  closeModal('edit-ticket-modal');
}
function openCancelTicketModal(ticketId) {
  document.getElementById('cancel-ticket-id').value = ticketId;
  document.getElementById('cancel-ticket-modal').style.display = 'block';
}
function cancelTicket() {
  const ticketId = parseInt(document.getElementById('cancel-ticket-id').value);
  tickets = tickets.map(t => t.id === ticketId ? {...t, status: 'cancelled'} : t);
  renderTicketTable();
  closeModal('cancel-ticket-modal');
}
document.addEventListener('DOMContentLoaded', () => {
  renderTicketTable();
});