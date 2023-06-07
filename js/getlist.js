const main = document.querySelector('main');
const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://jscp-diplom.netoserver.ru/');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.responseType = 'json';
xhr.send('event=update');

xhr.addEventListener('load', () => {
    const responseObj = xhr.response;
    const films = xhr.response.films;
    const halls = xhr.response.halls;
    const seances = xhr.response.seances;
    console.log(responseObj)

    films.result.forEach((el) => {
          main.insertAdjacentHTML("afterBegin", `
          <section class="movie">
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
          </section>`)  
    });
});