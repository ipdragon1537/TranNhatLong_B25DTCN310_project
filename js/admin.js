document.addEventListener("DOMContentLoaded", function () {
  const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
  if (confirmLogoutBtn) {
    confirmLogoutBtn.addEventListener("click", function () {
      window.location.href = "/pages/login.html";
    });
  }
});
const dataFilm = {
  movies: [
    {
      id: 1,
      title: "Dune: Part Two",
      titleVi: "Dune: Hành Tinh Cát - Phần 2",
      genres: "Hành động, Viễn tưởng",
      duration: 166,
      releaseDate: "01/03/2024",
      status: 1,
      posterUrl: "/assets/images/Dune Poster.jpg",
      description:
        "Tiếp nối phần trước, Paul Atreides hợp nhất với Fremen để trả thù gia tộc Harkonnen...",
      ticketPrice: 95000,
    },
    {
      id: 2,
      title: "Kung Fu Panda 4",
      titleVi: "Kung Fu Panda 4",
      genres: "Hoạt hình, Hài",
      duration: 94,
      releaseDate: "08/03/2024",
      status: 1,
      posterUrl: "/assets/images/KungFu Poster.jpg",
      description: "Po tiếp tục hành trình trở thành Chiến binh Rồng...",
      ticketPrice: 80000,
    },
    {
      id: 3,
      title: "Godzilla x Kong: The New Empire",
      titleVi: "Godzilla x Kong: Đế Chế Mới",
      genres: "Hành động, Viễn tưởng",
      duration: 115,
      releaseDate: "29/03/2024",
      status: 2,
      posterUrl: "/assets/images/Godzilla Poster.jpg",
      description: "Godzilla và Kong hợp sức chống lại mối đe dọa mới...",
      ticketPrice: 80000,
    },
    {
      id: 4,
      title: "Mai",
      titleVi: "Mai",
      genres: "Tâm lý, Tình cảm",
      duration: 131,
      releaseDate: "10/02/2024",
      status: 0,
      posterUrl: "/assets/images/Mai Poster.jpg",
      description: "Câu chuyện về một người phụ nữ mạnh mẽ...",
      ticketPrice: 80000,
    },
    {
      id: 5,
      title: "Exhuma",
      titleVi: "Exhuma: Quật Mộ Trùng Ma",
      genres: "Kinh dị, Bí ẩn",
      duration: 134,
      releaseDate: "15/03/2024",
      status: 1,
      posterUrl: "/assets/images/Excuma Poster.jpg",
      description: "Một nhóm chuyên gia phong thủy khai quật mộ cổ...",
      ticketPrice: 80000,
    },
  ],
  tickets: [
    {
      id: 1001,
      ticketCode: "VE-1001",
      customerName: "Nguyễn Văn A",
      customerPhone: "0987654321",
      movieId: 1,
      movieTitle: "Dune: Hành Tinh Cát - Phần 2",
      showDate: "2026-03-15",
      showTime: "10:00",
      seats: ["F12", "F13"],
      seatCount: 2,
      pricePerSeat: 90000,
      totalAmount: 180000,
      paymentMethod: 0,
      paymentStatus: true,
      statusDisplay: "Đã Thanh Toán",
    },
    {
      id: 1002,
      ticketCode: "VE-1002",
      customerName: "Trần Thị B",
      customerPhone: "0912654321",
      movieId: 4,
      movieTitle: "Mai",
      showDate: "2026-03-16",
      showTime: "13:30",
      seats: ["G5"],
      seatCount: 1,
      pricePerSeat: 90000,
      totalAmount: 90000,
      paymentMethod: 1,
      paymentStatus: false,
      statusDisplay: "Chờ xử lý",
    },
    {
      id: 1003,
      ticketCode: "VE-1003",
      customerName: "Lê Văn C",
      customerPhone: "0905654321",
      movieId: 2,
      movieTitle: "Kung Fu Panda 4",
      showDate: "2026-03-17",
      showTime: "19:00",
      seats: ["H10", "H11", "H12"],
      seatCount: 3,
      pricePerSeat: 90000,
      totalAmount: 270000,
      paymentMethod: 2,
      paymentStatus: true,
      statusDisplay: "Đã Thanh Toán",
    },
    {
      id: 1004,
      ticketCode: "VE-1004",
      customerName: "Phạm Minh D",
      customerPhone: "0853654321",
      movieId: 5,
      movieTitle: "Exhuma: Quật Mộ Trùng Ma",
      showDate: "2026-03-14",
      showTime: "21:45",
      seats: ["E8"],
      seatCount: 1,
      pricePerSeat: 90000,
      totalAmount: 90000,
      paymentMethod: 0,
      paymentStatus: false,
      statusDisplay: "Đã hủy",
    },
    {
      id: 1005,
      ticketCode: "VE-1005",
      customerName: "Hoàng Yến E",
      customerPhone: "0977654321",
      movieId: 3,
      movieTitle: "Godzilla x Kong: Đế Chế Mới",
      showDate: "2026-03-18",
      showTime: "09:15",
      seats: ["D4", "D5"],
      seatCount: 2,
      pricePerSeat: 90000,
      totalAmount: 180000,
      paymentMethod: 0,
      paymentStatus: false,
      statusDisplay: "Chờ xử lý",
    },
  ],
};
localStorage.setItem("movies",JSON.stringify(dataFilm.movies))
function renderMovies(list) {
  const tbody = document.querySelector(".table-container tbody");
  if (!tbody) return;

  let html = "";
  list.forEach((movie) => {
    let statusText = "";
    let statusClass = "";
    if (movie.status === 1) {
      statusText = "Đang chiếu";
      statusClass = "playing";
    } else if (movie.status === 2) {
      statusText = "Sắp chiếu";
      statusClass = "upcoming";
    } else if (movie.status === 0) {
      statusText = "Đã chiếu";
      statusClass = "play";
    }

    html += `
            <tr>
                <td>
                    <div class="movie-poster orange">
                        <img src="${movie.posterUrl}" alt="${movie.title}">
                    </div>
                </td>
                <td>
                    <strong>${movie.title}</strong>
                    <br>
                    <span class="sub-name" style="font-size: 0.85em; color: #888;">${movie.titleVi}</span>
                </td>
                <td>${movie.genres}</td>
                <td>${movie.duration} phút</td>
                <td>${movie.releaseDate}</td>
                <td>
                    <span class="status status-${statusClass}">${statusText}</span>
                </td>
                <td>
                    <i class="fa-regular fa-pen-to-square" style="cursor:pointer; margin-right: 10px;"></i>
                    <i class="fa-regular fa-circle-xmark" style="cursor:pointer; color: red;"></i>
                </td>
                <td>
                    <button class="btn-buy" style="background-color: #ff4d4d; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-weight: bold;">Mua Vé</button>
                </td>
            </tr>
        `;
  });
  tbody.innerHTML = html;
}
renderMovies(dataFilm.movies);
const filterStatus = (status) => {
  if (status === "all") {
    renderMovies(dataFilm.movies);
  } else {
    const filtered = dataFilm.movies.filter((movie) => movie.status == status);
    renderMovies(filtered);
  }
};
const saveAndRender = () => {
  localStorage.setItem("movies",JSON.stringify(movies));
  renderMovies(movies);
};

