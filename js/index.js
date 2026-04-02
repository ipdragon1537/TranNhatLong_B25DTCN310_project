const dataFilm = {
  movies: [
    {
      id: 1,
      title: "Dune: Part Two",
      genres: "Hành động, Viễn tưởng",
      duration: 166,
      status: 1,
      posterUrl: "/assets/images/Dune Poster 2.jpg",
      trailerUrl:"https://www.youtube.com/watch?v=ofRdPtkUmJ4"
    },
    {
      id: 2,
      title: "Kung Fu Panda 4",
      genres: "Hoạt hình, Hài",
      duration: 94,
      status: 1,
      posterUrl: "/assets/images/KungFu Poster.jpg",
    },
    {
      id: 3,
      title: "Godzilla x Kong",
      genres: "Hành động, Viễn tưởng",
      duration: 115,
      status: 1,
      posterUrl: "/assets/images/Godzilla Poster.jpg",
    },
    {
      id: 4,
      title: "Mai",
      genres: "Tâm lý",
      duration: 131,
      status: 0,
      posterUrl: "/assets/images/Mai Poster.jpg",
    },
    {
      id: 5,
      title: "Exhuma",
      genres: "Kinh dị",
      duration: 134,
      status: 1,
      posterUrl: "/assets/images/Excuma Poster.jpg",
    },
  ],
};
const tickets = [
  {
    id: 1001,
    ticketCode: "VE-1001",
    customerName: "Nguyễn Văn A",
    customerPhone: "0937654321",
    movieId: 1,
    movieTitle: "Dune: Hành Tinh Cát - Phần 2",
    showDate: "2026-03-15",
    showTime: "18:00",
    seats: ["F12", "F13"],
    seatCount: 2,
    pricePerSeat: 90000,
    totalAmount: 180000,
    paymentMethod: 0,
    paymentStatus: true,
    createdAt: "2026-03-10T14:30:00Z",
    note: "Khách yêu cầu ghế gần lối đi",
    statusDisplay: "Đã Thanh Toán"
  },
  {
    id: 1002,
    ticketCode: "VE-1002",
    customerName: "Trần Thị B",
    customerPhone: "0912054331",
    movieId: 2,
    movieTitle: "Mai",
    showDate: "2026-03-16",
    showTime: "13:30",
    seats: ["G5"],
    seatCount: 1,
    pricePerSeat: 90000,
    totalAmount: 90000,
    paymentMethod: 1,
    paymentStatus: false,
    createdAt: "2026-03-11T09:15:00Z",
    note: "",
    statusDisplay: "Chờ xử lý"
  },
  {
    id: 1003,
    ticketCode: "VE-1003",
    customerName: "Lê Văn C",
    customerPhone: "0905654321",
    movieId: 3,
    movieTitle: "Kung Fu Panda 4",
    showDate: "2026-03-17",
    showTime: "19:00",
    seats: ["H10", "H11", "H12"],
    seatCount: 3,
    pricePerSeat: 90000,
    totalAmount: 270000,
    paymentMethod: 2,
    paymentStatus: true,
    createdAt: "2026-03-12T16:45:00Z",
    note: "Combo bắp nước tặng kèm",
    statusDisplay: "Đã Thanh Toán"
  },
  {
    id: 1004,
    ticketCode: "VE-1004",
    customerName: "Phạm Minh D",
    customerPhone: "0933054321",
    movieId: 4,
    movieTitle: "Exhuma: Quật Mộ Trùng Ma",
    showDate: "2026-03-14",
    showTime: "21:45",
    seats: ["E8"],
    seatCount: 1,
    pricePerSeat: 90000,
    totalAmount: 90000,
    paymentMethod: 0,
    paymentStatus: false,
    createdAt: "2026-03-13T11:20:00Z",
    note: "Khách hủy do bận đột xuất",
    statusDisplay: "Đã hủy"
  },
  {
    id: 1005,
    ticketCode: "VE-1005",
    customerName: "Hoàng Văn E",
    customerPhone: "0977654321",
    movieId: 5,
    movieTitle: "Godzilla x Kong: Đế Chế Mới",
    showDate: "2026-03-18",
    showTime: "09:15",
    seats: ["J1", "J2"],
    seatCount: 2,
    pricePerSeat: 90000,
    totalAmount: 180000,
    paymentMethod: 1,
    paymentStatus: false,
    createdAt: "2026-03-14T08:50:00Z",
    note: "Chờ xác nhận thanh toán chuyển khoản",
    statusDisplay: "Chờ xử lý"
  }
];
localStorage.setItem("movies", JSON.stringify(dataFilm.movies));
const getMovies = () => JSON.parse(localStorage.getItem("movies")) || [];
const renderMovies = (movies) => {
  const container = document.getElementById("movie-list");
  if (!container) return;

  if (movies.length === 0) {
    container.innerHTML = `<p style="color:white">Không có phim</p>`;
    return;
  }

  container.innerHTML = movies
    .map(
      (m) => `
      <div class="books">
        <img src="${m.posterUrl}" alt="${m.title}">
        <h4>${m.title}</h4>
        <p>${m.duration} phút • ${m.genres}</p>
        <button onclick="location.href='booking.html?id=${m.id}'">
          Mua vé
        </button>
      </div>
    `
    )
    .join("");
};

document.addEventListener("DOMContentLoaded", () => {
  const playing = getMovies()
    .filter((m) => m.status === 1)
    .slice(0, 4);

  renderMovies(playing);
});
const isLoggedIn = false;
const hasShowtimes = true;

function handleAdd(movieId) {
  if (!isLoggedIn) {
    window.location.href = "/pages/login.html";
    return;
  }

  if (hasShowtimes) {
    window.location.href = `/booking/${movieId}`;
  } else {
    alert("Chưa có suất chiếu");
  }
}
//Bấm nút trailer thì in ra modal Trailer
let trailerOpen = () => {
  const movie = dataFilm.movies[0];

  if (movie.trailerUrl) {
    let embedUrl = movie.trailerUrl.replace("watch?v=", "embed/");
    
    document.getElementById("videoPlayer").src = embedUrl;
    document.getElementById("trailerModal").style.display = "block";
  } else {
    alert("Phim chưa có trailer");
  }
}

let closeModal = () => {
  document.getElementById("trailerModal").style.display = "none"; 
  document.getElementById("videoPlayer").src = "";
}
// Hiển thị phim nổi bật
function renderHero() {
  const movies = getMovies();
  let movie = movies.find(m => m.status === 1);

  const section = document.querySelector(".section");
  const heroImage = document.querySelector(".hero-image");
  heroImage.style.backgroundImage = `
    linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2)),
    url('${movie.posterUrl}')
  `;
  heroImage.style.backgroundSize = "cover";
  heroImage.style.backgroundPosition = "center";
  section.querySelector("h2").innerText = movie.title;
  section.querySelector("p").innerText =
    `${movie.genres} • ${movie.duration} phút`;
  section.querySelector(".ticket-button").onclick = () => handleAdd(movie.id);
  section.querySelector(".trailer").onclick = () => trailerOpen(movie.id);
}

renderHero();