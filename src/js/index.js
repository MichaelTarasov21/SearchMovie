import { genres } from "./genre";
const DOMSelectors = {
  grid: document.querySelector(".movie-grid"),
  searchbar: document.getElementById("SearchBar"),
  searchbutton: document.getElementById("Searchbutton")
};

const key = `1fd276ec57b4baedacae00246e5cf4b7`;
let query = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=10000&vote_average.gte=8`;
const init = async function () {
  try {
    const response = await fetch(query);
    const data = await response.json();

    data.results.forEach((movie) => {
      let genreArr = [];
      const addGenre = function () {
        genres.forEach((element) => {
          if (movie.genre_ids.includes(element.id)) {
            genreArr.push(element.name);
            return genreArr;
          }
        });
      };
      addGenre(); 
      DOMSelectors.grid.insertAdjacentHTML(
        "beforeend",
        `<div class="movie-card">
      <div class="movie-card-front">
        <img
          src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
          alt=""
          class="poster"
        />
      </div>
      <div class="movie-card-back">
        <h3 class="movie-card-header">${movie.original_title}</h3>
        <div class="score-box">
          <p class="user-score">Community Score</p>
          <p class="user-score">${movie.vote_average}</p>
        </div>

        <div class="release-box">
          <p class="release-date">Released</p>
          <p class="release-date">${movie.release_date}</p>
        </div>

        <div class="movie-genres">
          <div>${genreArr}</div>
        </div>
      </div>
    </div>`
      );
    });
  } catch (error) {
    console.log(error);
  }
};
function search(){
  const keyword_id = DOMSelectors.searchbar.value;
  query = `https://api.themoviedb.org/3/keyword/${keyword_id}/movies?api_key=${key}&language=en-US&include_adult=false`
  const idget = async function(){
    const response = await fetch(query);
    const data = await response.json();
    const id = data.results[0].id;
    query =  `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`;
    init();
  };
  idget();
}
DOMSelectors.searchbutton.addEventListener("click", search())
//DOMSelectors.searchbar.addEventListener("click", console.log("I work good")); keeping to ask whalen why it clicks auto