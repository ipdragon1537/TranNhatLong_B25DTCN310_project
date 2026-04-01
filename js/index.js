const dataFilm = {
  movies: [
    {
      id: 1,
      title: "Dune: Part Two",
      genres: "Hành động, Viễn tưởng",
      duration: 166,
      status: 1,
      posterUrl: "/assets/images/Dune Poster.jpg",
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
if (!localStorage.getItem("movies")) {
  localStorage.setItem("movies", JSON.stringify(dataFilm.movies));
}
const getMovies = () =>
  JSON.parse(localStorage.getItem("movies")) || [];
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
  const movies = getMovies();

  const playing = movies
    .filter((m) => m.status === 1)
    .slice(0, 4);

  renderMovies(playing);
});