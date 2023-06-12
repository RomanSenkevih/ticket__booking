const buying = document.querySelector('.buying');
const idSeances = localStorage.getItem('seancesTimeId');
const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://jscp-diplom.netoserver.ru/');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.responseType = 'json';
xhr.send('event=update');
xhr.addEventListener('load', () => {
    const films = xhr.response.films;
    const halls = xhr.response.halls;
    const seances = xhr.response.seances;
    let seanceHallid;
    let seanceFilmid;
    let seanceTime;
    let filmName;
    let hallName;
    let hallPriceVip;
    let hallPriceStandart;



    console.log(xhr.response)

    seances.result.forEach(elem => {
        if(elem.seance_id === idSeances){
            seanceHallid = elem.seance_hallid;
            seanceFilmid = elem.seance_filmid;
            seanceTime = elem.seance_time;
        }
    });

    films.result.forEach(el => { 
        if(el.film_id === seanceFilmid) {
            filmName = el.film_name;
        }
    });

    halls.result.forEach(el => { 
        if(el.hall_id === seanceHallid) {
            hallName = el.hall_name;
            hallPriceVip= el.hall_price_vip;
            hallPriceStandart  = el.hall_price_standart
        }
    });

            buying.insertAdjacentHTML("afterBegin", `
          <div class="buying__info">
             <div class="buying__info-description">
               <h2 class="buying__info-title">${filmName}</h2>
               <p class="buying__info-start">Начало сеанса: ${seanceTime}</p>
               <p class="buying__info-hall">${hallName}</p>          
            </div>
            <div class="buying__info-hint">
                <p>Тапните дважды,<br>чтобы увеличить</p>
            </div>
            </div>
            <div class="conf-step">
            <div class="conf-step__wrapper">
      
             </div>
             <div class="conf-step__legend">
            <div class="col">
                <p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_standart"></span> Свободно (<span class="conf-step__legend-value price-standart">250</span>руб)</p>
                <p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_vip"></span> Свободно VIP (<span class="conf-step__legend-value price-vip">350</span>руб)</p>            
            </div>
            <div class="col">
                <p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_taken"></span> Занято</p>
                <p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_selected"></span> Выбрано</p>                    
            </div>
            </div>
  </div>
  <button class="acceptin-button"  >Забронировать</button>`);
});
console.log(localStorage.getItem('seancesTimeId'))