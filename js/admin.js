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
      status: 0,
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
// localStorage.setItem("movies", JSON.stringify(dataFilm.movies));
const getMovies = () => JSON.parse(localStorage.getItem("movies")) || [];

let currentPage = 1;
const itemsPerPage = 5;
let currentFilteredMovies = getMovies();

// =============================================
// RENDER TABLE
// =============================================
function renderMovies(list) {
  const tbody = document.querySelector(".table-container tbody");
  if (!tbody) return;

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:#888;">Không có phim</td></tr>`;
    return;
  }

  tbody.innerHTML = list
    .map(movie => {
      let statusText = "";
      let statusClass = "";
      if (movie.status === 1) {
        statusText = "Đang chiếu";
        statusClass = "playing";
      } else if (movie.status === 2) {
        statusText = "Sắp chiếu";
        statusClass = "upcoming";
      } else {
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
    })
    .join("");
}

// =============================================
// PHÂN TRANG
// =============================================
function handlePagination() {
  const total = currentFilteredMovies.length;
  const totalPages = Math.ceil(total / itemsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  renderMovies(currentFilteredMovies.slice(startIndex, endIndex));
  updateButtonsUI(total, totalPages);
}

function updateButtonsUI(totalItems, totalPages) {
  const pageButtons = document.querySelectorAll(".pagination .pages button");
  const infoSpan = document.querySelector(".pagination span");

  if (infoSpan) {
    const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
    infoSpan.innerHTML = `Hiển thị <strong>${start}-${end}</strong> trên <strong>${totalItems}</strong> phim`;
  }

  pageButtons.forEach((btn) => {
    const text = btn.innerText.trim();

    if (text === "<") {
      btn.onclick = () => {
        if (currentPage > 1) {
          currentPage--;
          handlePagination();
        }
      };
      btn.disabled = currentPage === 1;
    } else if (text === ">") {
      btn.onclick = () => {
        if (currentPage < totalPages) {
          currentPage++;
          handlePagination();
        }
      };
      btn.disabled = currentPage === totalPages || totalPages === 0;
    } else {
      const pageNum = parseInt(text);
      if (!isNaN(pageNum)) {
        btn.onclick = () => {
          currentPage = pageNum;
          handlePagination();
        };
        if (pageNum === currentPage) btn.classList.add("active");
        else btn.classList.remove("active");
        btn.style.display = pageNum <= totalPages ? "inline-block" : "none";
      }
    }
  });

  const dots = document.querySelector(".pagination .pages span:not(button)");
  if (dots) dots.style.display = totalPages > 3 ? "inline-block" : "none";
}

// =============================================
// CẬP NHẬT SỐ LIỆU + ACTIVE TRÊN TAB
// =============================================
function updateTabCounts() {
  const movies = getMovies();
  const total = movies.length;
  const playing = movies.filter((m) => m.status === 1).length;
  const upcoming = movies.filter((m) => m.status === 2).length;
  const ended = movies.filter((m) => m.status === 0).length;

  const tabAll = document.querySelector('[data-filter="all"]');
  const tabPlaying = document.querySelector('[data-filter="1"]');
  const tabUpcoming = document.querySelector('[data-filter="2"]');
  const tabEnded = document.querySelector('[data-filter="0"]');

  if (tabAll) tabAll.textContent = `Tất cả (${total})`;
  if (tabPlaying) tabPlaying.textContent = `Đang chiếu (${playing})`;
  if (tabUpcoming) tabUpcoming.textContent = `Sắp chiếu (${upcoming})`;
  if (tabEnded) tabEnded.textContent = `Đã chiếu (${ended})`;
}

function setActiveTab(filter) {
  document
    .querySelectorAll(".filter-tabs button, .filter-tabs .btn-tab")
    .forEach((btn) => {
      btn.classList.remove("active");
    });
  const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
  if (activeBtn) activeBtn.classList.add("active");
}
updateTabCounts();
handlePagination();
setActiveTab("all");

// =============================================
// LỌC THEO TRẠNG THÁI
// =============================================
const filterStatus = (status) => {
  const movies = getMovies();
  currentFilteredMovies =
    status === "all" ? movies : movies.filter((m) => m.status == status);
  currentPage = 1;
  setActiveTab(String(status));
  handlePagination();
  const buttons = document.querySelectorAll(".filters button");
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });
  if (event && event.target) {
    event.target.classList.add("active");
  }
};

// =============================================
// TÌM KIẾM THEO TÊN
// =============================================
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("movieSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase().trim();
      const allMovies = getMovies();
      currentFilteredMovies = allMovies.filter((movie) => {
        const titleEn = movie.title ? movie.title.toLowerCase() : "";
        const titleVi = movie.titleVi ? movie.titleVi.toLowerCase() : "";
        return titleEn.includes(searchTerm) || titleVi.includes(searchTerm);
      });
      currentPage = 1;
      handlePagination();
    });
  }
});

// =============================================
// XÓA PHIM
// =============================================
function deleteMovie(id) {
  if (!confirm("Bạn có chắc muốn xóa phim này?")) {
    notify("cancel", "Đã hủy thao tác");
    return;
  }
  const movies = getMovies().filter((m) => m.id !== id);
  localStorage.setItem("movies", JSON.stringify(movies));
  currentFilteredMovies = currentFilteredMovies.filter((m) => m.id !== id);
  updateTabCounts();
  handlePagination();
  notify("delete", "Đã xóa thành công");
}

// =============================================
// MODAL THÊM PHIM
// =============================================
function openModal() {
  document.getElementById("addMovieModal").classList.add("active");
}

function closeModal() {
  document.getElementById("addMovieModal").classList.remove("active");
}
function showError(message) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: "#e74c3c",
      borderRadius: "8px",
      fontSize: "14px",
    },
    stopOnFocus: true,
  }).showToast();
}

document.querySelector(".btn-submit").addEventListener("click", () => {
  const title = document.getElementById("input-title").value.trim();
  const genre = document.getElementById("input-genre").value;
  const duration = document.getElementById("input-duration").value.trim();
  const date = document.getElementById("input-date").value;
  const status = document.getElementById("input-status").value;
  const price = document.getElementById("input-price").value.trim();
  const posterUrl = document.getElementById("input-poster").value.trim();
  const description = document.getElementById("input-desc").value.trim();

  if (!title) return showError("Tên phim không được để trống!");
  if (!genre) return showError("Thể loại không được để trống!");
  if (!duration) return showError("Thời lượng không được để trống!");
  if (isNaN(duration) || Number(duration) <= 0)
    return showError("Thời lượng phải là số hợp lệ!");
  if (!date) return showError("Ngày khởi chiếu không được để trống!");

  const selectedYear = new Date(date).getFullYear();
  if (selectedYear < 1900 || selectedYear > 2100)
    return showError("Ngày khởi chiếu không hợp lệ (Năm phải từ 1900 - 2100)!");

  if (!status) return showError("Trạng thái phim không được để trống!");
  if (!price) return showError("Giá vé không được để trống!");
  if (isNaN(price)) return showError("Giá vé phải là số hợp lệ!");
  if (Number(price) < 0) return showError("Giá vé không được là số âm!");
  if (!posterUrl) return showError("URL ảnh bìa không được để trống!");

  try {
    new URL(posterUrl);
  } catch (_) {
    return showError("URL ảnh bìa phải hợp lệ!");
  }

  if (!description) return showError("Mô tả ngắn không được để trống!");

  const movies = getMovies();
  const newMovie = {
    id: Date.now(),
    title,
    titleVi: title,
    genres: genre,
    duration: Number(duration),
    releaseDate: date,
    status: status === "Đang chiếu" ? 1 : status === "Sắp chiếu" ? 2 : 0,
    posterUrl,
    ticketPrice: Number(price) || 0,
    description,
  };
  movies.push(newMovie);
  localStorage.setItem("movies", JSON.stringify(movies));
  currentFilteredMovies = movies;
  currentPage = Math.ceil(movies.length / itemsPerPage);
  updateTabCounts();
  handlePagination();
  notify("add", "Đã thêm thành công");

  [
    "input-title",
    "input-genre",
    "input-duration",
    "input-date",
    "input-status",
    "input-price",
    "input-poster",
    "input-desc",
  ].forEach((id) => (document.getElementById(id).value = ""));

  closeModal();
});

// =============================================
// MODAL CẬP NHẬT PHIM
// =============================================
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

  if (!title) return showError("Tên phim không được để trống!");
  if (!genre) return showError("Thể loại không được để trống!");
  if (!duration || isNaN(duration) || Number(duration) <= 0)
    return showError("Thời lượng phải là số dương hợp lệ!");
  if (!date) return showError("Ngày khởi chiếu không được để trống!");
  if (!price) return showError("Giá vé không được để trống!");
  if (isNaN(price)) return showError("Giá vé phải là số hợp lệ!");
  if (Number(price) < 0) return showError("Giá vé không được là số âm!");
  if (!poster) return showError("URL ảnh bìa không được để trống!");

  try {
    new URL(poster);
  } catch {
    return showError("URL ảnh bìa phải hợp lệ!");
  }
  if (!desc) return showError("Mô tả không được để trống!");
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
  const filteredIndex = currentFilteredMovies.findIndex((m) => m.id === id);
  if (filteredIndex !== -1) {
    currentFilteredMovies[filteredIndex] = movies[index];
  }

  notify("update", "Cập nhật phim thành công");
  closeEditModal();
  updateTabCounts();
  handlePagination();
};

// =============================================
// TOAST NOTIFICATION
// =============================================
function notify(type, message) {
  let titleText = "";
  let className = "toast-custom";
  let iconClass = "";
  switch (type) {
    case "add":
      titleText = "Thành công";
      className += " toast-success";
      iconClass = "fa-solid fa-circle-check";
      break;
    case "update":
      titleText = "Đã cập nhật";
      className += " toast-success";
      iconClass = "fa-solid fa-square-check";
      break;
    case "cancel":
      titleText = "Đã hủy";
      className += " toast-error";
      iconClass = "fa-solid fa-circle-xmark";
      break;
    case "delete":
      titleText = "Đã xóa";
      className += " toast-error";
      iconClass = "fa-solid fa-trash-can";
      break;
  }

  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.gap = "12px";

  const icon = document.createElement("i");
  icon.className = iconClass;
  icon.style.fontSize = "20px";
  icon.style.color =
    type === "add" || type === "update" ? "#10b981" : "#ef4444";

  const body = document.createElement("div");
  body.className = "toast-body";
  body.style.display = "flex";
  body.style.flexDirection = "column";

  const title = document.createElement("div");
  title.className = "toast-title";
  title.innerText = titleText;
  title.style.fontWeight = "600";
  title.style.color = "#fff";

  const desc = document.createElement("div");
  desc.className = "toast-desc";
  desc.innerText = message;
  desc.style.fontSize = "14px";
  desc.style.color = "#9ca3af";

  body.appendChild(title);
  body.appendChild(desc);
  container.appendChild(icon);
  container.appendChild(body);

  Toastify({
    node: container,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    className: className,
    stopOnFocus: true,
  }).showToast();
}
