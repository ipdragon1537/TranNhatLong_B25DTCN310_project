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
function renderInstagramHero() {
  const wrapper = document.getElementById("heroWrapper");
  const dotsContainer = document.getElementById("carouselDots");
  const movies = getMovies().filter(m => m.status === 1);

  if (!wrapper || movies.length === 0) {
    wrapper.innerHTML = "<div style='color:white; padding:100px;'>Chưa có phim nổi bật.</div>";
    return;
  }
  wrapper.innerHTML = movies.map(movie => `
    <div class="hero-slide" style="background-image: url('${movie.posterUrl}')">
      <div class="hero-content">
        <h5>🔥 Đang thịnh hành</h5>
        <h2>${movie.titleVi || movie.title}</h2>
        <p>${movie.description || "Hành trình vĩ đại của những nhân vật huyền thoại đang chờ đợi bạn khám phá ngay hôm nay."}</p>
        <div class="button-group">
          <button class="ticket-button" onclick="handleAdd(${movie.id})">🎟️ Đặt vé ngay</button>
          <button class="trailer" onclick="trailerOpen(${movie.id})">▶ Xem trailer</button>
        </div>
      </div>
    </div>
  `).join("");
  dotsContainer.innerHTML = movies.map((_, i) => `
    <div class="dot ${i === 0 ? 'active' : ''}" onclick="scrollToSlide(${i})"></div>
  `).join("");
  const viewport = document.getElementById("heroViewport");
  viewport.addEventListener("scroll", () => {
    const scrollPosition = viewport.scrollLeft;
    const slideWidth = viewport.offsetWidth;
    const currentIndex = Math.round(scrollPosition / slideWidth);
    
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  });
}
function scrollToSlide(index) {
  const viewport = document.getElementById("heroViewport");
  const slideWidth = viewport.offsetWidth;
  viewport.scrollLeft = index * slideWidth;
}
document.addEventListener("DOMContentLoaded", renderInstagramHero);
