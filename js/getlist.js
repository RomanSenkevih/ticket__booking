const main = document.querySelector('main');
const pageNavDay = Array.from(document.querySelectorAll('.page-nav__day'));
let timeStamp;

pageNavDay.forEach(el => {
    if (el.classList.contains('page-nav__day_chosen')) {
        downloadsMoviesOfTheSelectedDay('update')
        timeStamp = el.getAttribute('data-time-stamp');
    }
    el.addEventListener('click', () => {
        pageNavDay.forEach(el => {
            el.classList.remove('page-nav__day_chosen')
        });
        el.classList.add('page-nav__day_chosen')
        let movie = Array.from(document.querySelectorAll('.movie'));
        movie.forEach(elem => {
            elem.remove()
        })
        downloadsMoviesOfTheSelectedDay('update')
        timeStamp = el.getAttribute('data-time-stamp');
    })
});
// *******************************************************************************************************
function downloadsMoviesOfTheSelectedDay(update) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jscp-diplom.netoserver.ru/');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.send(`event=${update}`);

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
              <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html" data-seanceStart=${seances.result[i].seance_start} data-seancesTimeId="${seances.result[i].seance_id}">${seances.result[i].seance_time}<a></li>
              `);
                }
            }
        });
     
        document.addEventListener('click', e => {

            if (e.target.getAttribute('data-seancesTimeId')) {
              let seanceHallid;
              let seanceFilmid;
              let seanceStart;
              let selectSeanse = {}
              selectSeanse.seancesId = e.target.getAttribute('data-seancesTimeId');
              
              seances.result.forEach(elemS => {
                  if (elemS.seance_id === e.target.getAttribute('data-seancesTimeId')) {
                      seanceHallid = elemS.seance_hallid;
                      seanceFilmid = elemS.seance_filmid;
                      seanceStart = elemS.seance_start;
                      selectSeanse.seanceTime = elemS.seance_time;
                  }
              });
                          
              selectSeanse.timestamp = (Number(seanceStart) * 60) + Number(timeStamp)

              films.result.forEach(elemF => {
                  if (elemF.film_id === seanceFilmid) {
                    selectSeanse.filmName = elemF.film_name;
                  }
              });
              halls.result.forEach(elemH => {
                  if (elemH.hall_id === seanceHallid) {
                      selectSeanse.hallName = elemH.hall_name;
                      selectSeanse.hallPriceVip = elemH.hall_price_vip;
                      selectSeanse.hallPriceStandart = elemH.hall_price_standart
                  }
              });
               selectSeanse.seanceHallid;
               selectSeanse.seanceFilmid;
               localStorage.clear();
               localStorage.setItem("selectSeanse", JSON.stringify(selectSeanse));
            };
          });
          inactiveSession();
    });
};
// **********************************************************************************
function inactiveSession() {
    const movieSeancesTime =Array.from(document.querySelectorAll('.movie-seances__time'));
    movieSeancesTime.forEach(elem => {
        let dataSeanceStart = Number(elem.getAttribute('data-seanceStart')) * 60; 
        let timeStampSeance = Math.trunc(dataSeanceStart + Number(timeStamp))
        let timeisNow = Math.trunc(Date.now() /1000)
        if(timeStampSeance <  timeisNow) {
             elem.classList.add('pointer-events-none')
        }
    }); 
};

setInterval(inactiveSession, 300000)
