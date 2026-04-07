const dataFilm = {
  movies: [
    {
      id: 1,
      title: "Dune: Part Two",
      titleVi: "Dune: Hành Tinh Cát - Phần 2",
      genres: "Hành động, Viễn tưởng",
      duration: 166,
      releaseDate: "2024-03-01",
      status: 1,
      posterUrl: "/assets/images/Dune Poster.jpg",
      ticketPrice: 95000,
    },
    {
      id: 2,
      title: "Kung Fu Panda 4",
      titleVi: "Kung Fu Panda 4",
      genres: "Hoạt hình, Hài",
      duration: 94,
      releaseDate: "2024-08-03",
      status: 1,
      posterUrl: "/assets/images/KungFu Poster.jpg",
      ticketPrice: 80000,
    },
    {
      id: 3,
      title: "Godzilla x Kong",
      titleVi: "Godzilla x Kong: Đế Chế Mới",
      genres: "Hành động, Viễn tưởng",
      duration: 115,
      releaseDate: "2024-03-29",
      status: 2,
      posterUrl: "/assets/images/Godzilla Poster.jpg",
      ticketPrice: 80000,
    },
    {
      id: 4,
      title: "Mai",
      titleVi: "Mai",
      genres: "Tâm lý, Tình cảm",
      duration: 131,
      releaseDate: "2024-02-10",
      status: 1,
      posterUrl: "/assets/images/Mai Poster.jpg",
      ticketPrice: 80000,
    },
    {
      id: 5,
      title: "Exhuma",
      titleVi: "Exhuma: Quật Mộ Trùng Ma",
      genres: "Kinh dị, Bí ẩn",
      duration: 134,
      releaseDate: "2024-03-15",
      status: 1,
      posterUrl: "/assets/images/Excuma Poster.jpg",
      ticketPrice: 80000,
    },
    {
      id: 6,
      title: "Spider-Man: Across the Spider-Verse",
      titleVi: "Người Nhện: Du Hành Vũ Trụ",
      genres: "Hoạt hình, Hành động",
      duration: 140,
      releaseDate: "2023-06-01",
      status: 0,
      posterUrl: "https://via.placeholder.com/150",
      ticketPrice: 85000,
    },
    {
      id: 7,
      title: "Oppenheimer",
      titleVi: "Oppenheimer",
      genres: "Tiểu sử, Chính kịch",
      duration: 180,
      releaseDate: "2023-07-21",
      status: 0,
      posterUrl: "https://via.placeholder.com/150",
      ticketPrice: 90000,
    },
    {
      id: 8,
      title: "Deadpool & Wolverine",
      titleVi: "Deadpool & Wolverine",
      genres: "Hành động, Hài",
      duration: 127,
      releaseDate: "2024-07-26",
      status: 2,
      posterUrl: "https://via.placeholder.com/150",
      ticketPrice: 95000,
    },
    {
      id: 9,
      title: "Inside Out 2",
      titleVi: "Những Mảnh Ghép Cảm Xúc 2",
      genres: "Hoạt hình, Gia đình",
      duration: 96,
      releaseDate: "2024-06-14",
      status: 1,
      posterUrl: "https://via.placeholder.com/150",
      ticketPrice: 80000,
    },
    {
      id: 10,
      title: "John Wick: Chapter 4",
      titleVi: "Sát Thủ John Wick 4",
      genres: "Hành động, Giật gân",
      duration: 169,
      releaseDate: "2023-03-24",
      status: 0,
      posterUrl: "https://via.placeholder.com/150",
      ticketPrice: 85000,
    },
    {
      id: 11,
      title: "The Batman",
      titleVi: "The Batman",
      genres: "Hành động, Tội phạm",
      duration: 176,
      releaseDate: "2022-03-04",
      status: 0,
      posterUrl: "https://via.placeholder.com/150",
      ticketPrice: 80000,
    },
    {
      id: 12,
      title: "A Quiet Place: Day One",
      titleVi: "Vùng Đất Câm Lặng: Ngày Một",
      genres: "Kinh dị, Viễn tưởng",
      duration: 100,
      releaseDate: "2024-06-28",
      status: 1,
      posterUrl: "https://via.placeholder.com/150",
      ticketPrice: 85000,
    },
  ],
};
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
        <button onclick="location.href='login.html?id=${m.id}'">
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
