const apikey = "3f608c38cd2f8183bcad8e64c24884f9";
const queryurl = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
const genreurl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`;
let request = new XMLHttpRequest();
let genres = new XMLHttpRequest();
let moviesdone = 0;
request.open("GET", queryurl, true);
genres.open("GET", genreurl, true);
genres.onload = function () {
  let genrelist = JSON.parse(this.response);
  genrelist = genrelist.genres;
  request.send();
  request.onload = function () {
    let response = JSON.parse(this.response);
    response = response.results;
    for (let i = 0; i < response.length; i++) {
      document.getElementById("moviegrid").insertAdjacentHTML(
        "beforeend",
        `<div class="movie-card">
    <div class="movie-card-front">
      <img
        src="https://image.tmdb.org/t/p/w300/${response[i].poster_path}"
        alt=""
        class="poster"
      />
    </div>
    <div class="movie-card-back">
      <h3 class="movie-card-header">${response[i].original_title}</h3>
      <div class="score-box">
        <p class="user-score">Community Score</p>
        <p class="user-score">${response[i].vote_average}</p>
      </div>

      <div class="release-box">
        <p class="release-date">Released</p>
        <p class="release-date">${response[i].release_date}</p>
      </div>

      <div class="movie-genres">        
      </div>
    </div>
  </div>`
      );
      const genreboxes = document.getElementsByClassName("movie-genres");
      const activegenrebox = genreboxes[i];
      const moviegenres = response[i].genre_ids;
      let genrenames = "";
     for (x = 0; x < moviegenres.length; x++) {
        for (n = 0; n < genrelist.length; n++) {
            const genre = genrelist[n];
          if (genre.id === moviegenres[x]) {
            genrenames = genrenames + `<li class="movie-genre">${genre.name}</li>`;
          } 
        }
      }
      activegenrebox.insertAdjacentHTML("afterbegin",genrenames);
    }
  };
};
genres.send();
