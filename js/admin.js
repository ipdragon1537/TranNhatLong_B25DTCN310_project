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
      description: "Tiếp nối phần trước, Paul Atreides hợp nhất với Fremen để trả thù gia tộc Harkonnen...",
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
};


localStorage.setItem("movies", JSON.stringify(dataFilm.movies));

const getMovies = () => JSON.parse(localStorage.getItem("movies")) || [];
//in ra danh sách phim
function renderMovies(list) {
  const tbody = document.querySelector(".table-container tbody");
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:#888;">Không có phim</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map((movie) => {
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

    return `
      <tr>
        <td>
          <div class="movie-poster orange">
            <img src="${movie.posterUrl}" alt="${movie.title}">
          </div>
        </td>
        <td>
          <strong>${movie.title}</strong><br>
          <span style="font-size:0.85em;color:#888;">${movie.titleVi || ""}</span>
        </td>
        <td>${movie.genres}</td>
        <td>${movie.duration} phút</td>
        <td>${movie.releaseDate}</td>
        <td><span class="status status-${statusClass}">${statusText}</span></td>
        <td>
          <i class="fa-regular fa-pen-to-square" onclick="openEditModal(${movie.id})" style="cursor:pointer;margin-right:10px;"></i>
          <i class="fa-regular fa-circle-xmark" onclick="deleteMovie(${movie.id})" style="cursor:pointer;color:red;"></i>
        </td>
      </tr>
    `;
  }).join("");
}

renderMovies(getMovies());
//Lọc theo trạng thái 
const filterStatus = (status) => {
  const movies = getMovies();
  if (status === "all") {
    renderMovies(movies);
  } else {
    renderMovies(movies.filter((m) => m.status == status));
  }
};

// Xóa phim
function deleteMovie(id) {
  if (!confirm("Bạn có chắc muốn xóa phim này?")) return;
  const movies = getMovies().filter((m) => m.id !== id);
  localStorage.setItem("movies", JSON.stringify(movies));
  renderMovies(movies);
}

// Modal thêm phim
function openModal() {
  document.getElementById("addMovieModal").classList.add("active");
}

function closeModal() {
  document.getElementById("addMovieModal").classList.remove("active");
}

document.getElementById("addMovieModal").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

document.getElementById("editMovieModal").addEventListener("click", function (e) {
  if (e.target === this) closeEditModal();
});

document.querySelector(".btn-submit").addEventListener("click", () => {
  const title = document.getElementById("input-title").value.trim();
  const genre = document.getElementById("input-genre").value;
  const duration = document.getElementById("input-duration").value.trim();
  const date = document.getElementById("input-date").value;
  const status = document.getElementById("input-status").value;
  const price = document.getElementById("input-price").value.trim();
  const posterUrl = document.getElementById("input-poster").value.trim();
  const description = document.getElementById("input-desc").value.trim();

  if (!title || !genre || !duration || !date || !price) {
    alert("Vui lòng điền đầy đủ các trường bắt buộc!");
    return;
  }

  const movies = getMovies();
  movies.push({
    id: Date.now(),
    title,
    titleVi: title,
    genres: genre,
    duration: Number(duration),
    releaseDate: date,
    status: status === "Đang chiếu" ? 1 : status === "Sắp chiếu" ? 2 : 0,
    posterUrl: posterUrl || "/assets/images/default.jpg",
    price: Number(price),
    description,
  });

  localStorage.setItem("movies", JSON.stringify(movies));
  renderMovies(movies);
  alert("Thêm phim thành công!");
  closeModal();
});

// Modal cập nhật phim
function openEditModal(id) {
  const movies = getMovies();
  const movie = movies.find((m) => m.id === id);
  if (!movie) return;

  document.getElementById("edit-id").value = movie.id;
  document.getElementById("edit-title").value = movie.title || "";
  document.getElementById("edit-genre").value = movie.genres || "";
  document.getElementById("edit-duration").value = movie.duration || "";
  document.getElementById("edit-date").value = movie.releaseDate || "";
  document.getElementById("edit-status").value = movie.status ?? 1;
  document.getElementById("edit-price").value = movie.ticketPrice || "";
  document.getElementById("edit-poster").value = movie.posterUrl || "";
  document.getElementById("edit-desc").value = movie.description || "";

  document.getElementById("editMovieModal").style.display = "flex";
}

function closeEditModal() {
  document.getElementById("editMovieModal").style.display = "none";
}

document.getElementById("btn-update-custom").onclick = () => {
  const id = Number(document.getElementById("edit-id").value);
  const title = document.getElementById("edit-title").value.trim();
  const genre = document.getElementById("edit-genre").value.trim();
  const duration = document.getElementById("edit-duration").value;
  const date = document.getElementById("edit-date").value;
  const status = document.getElementById("edit-status").value;
  const price = document.getElementById("edit-price").value;
  const poster = document.getElementById("edit-poster").value.trim();
  const desc = document.getElementById("edit-desc").value.trim();

  if (!title || !genre || !duration || !date || !price) {
    alert("Vui lòng nhập đầy đủ!");
    return;
  }

  const movies = getMovies();
  const index = movies.findIndex((m) => m.id === id);
  if (index === -1) return;

  movies[index] = {
    ...movies[index],
    id,
    title,
    genres: genre,
    duration: Number(duration),
    releaseDate: date,
    status: Number(status),
    ticketPrice: Number(price),
    posterUrl: poster,
    description: desc,
  };

  localStorage.setItem("movies", JSON.stringify(movies));
  alert("Cập nhật thành công!");
  closeEditModal();
  renderMovies(movies);
};
