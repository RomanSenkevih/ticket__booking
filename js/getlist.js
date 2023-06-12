const main = document.querySelector('main');
const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://jscp-diplom.netoserver.ru/');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.responseType = 'json';
xhr.send('event=update');
xhr.addEventListener('load', () => {
    const films = xhr.response.films;
    const halls = xhr.response.halls;
    const seances = xhr.response.seances;
    films.result.forEach(el => {
        main.insertAdjacentHTML("afterBegin", `
          <section class="movie" data-movieId="${el.film_id}">
              <div class="movie__info">
              <div class="movie__poster">
                <img class="movie__poster-image" alt="${el.film_name + ' постер'}" src="${el.film_poster}">
              </div>
              <div class="movie__description">
                <h2 class="movie__title">${el.film_name}</h2>
                <p class="movie__synopsis">${el.film_description}</p>
                <p class="movie__data">
                  <span class="movie__data-duration">${el.film_duration + ' минут'}</span>
                  <span class="movie__data-origin">${el.film_origin}</span>
                </p>
              </div>
            </div> 
          </section>`);
    });
    const movieId = Array.from(document.querySelectorAll('.movie'));
    movieId.forEach(element => {
        halls.result.forEach(elem => {
            if (Number(elem.hall_open) !== 0) {
                element.insertAdjacentHTML("beforeEnd", `
               <div class="movie-seances__hall movie-seances__hall__remove" data-hallId="${elem.hall_id}">
                  <h3 class="movie-seances__hall-title">${elem.hall_name}</h3>
                  <ul class="movie-seances__list"></ul>
               </div>
            `);
            }
        });
    });
    const movieSeancesList = Array.from(document.querySelectorAll('.movie-seances__list'));
    movieSeancesList.forEach(e => {
        const dataMovieId = e.closest(".movie").getAttribute('data-movieId');
        const movieSeances = e.parentElement.getAttribute('data-hallId');
        for (let i = 0; i < seances.result.length; i++) {
            if (dataMovieId === seances.result[i].seance_filmid && movieSeances === seances.result[i].seance_hallid) {
                e.parentElement.classList.add('movie-seances__hall__add');
                e.insertAdjacentHTML("beforeEnd", `
              <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html" data-seancesTimeId="${seances.result[i].seance_id}">${seances.result[i].seance_time}<a></li>
              `);
            }
        }
    });
});

document.addEventListener('click', e => {
  if(e.target.getAttribute('data-seancesTimeId')) {
    // e.preventDefault();
    localStorage.setItem('seancesTimeId', e.target.getAttribute('data-seancesTimeId'));
  }
});

