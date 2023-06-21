const buying = document.querySelector('.buying');
const selectedSession = JSON.parse(localStorage.selectSeanse);

    const xhr2 = new XMLHttpRequest();
    xhr2.open('POST', 'https://jscp-diplom.netoserver.ru/');
    xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr2.responseType = 'json';
    xhr2.send(`event=get_hallConfig&timestamp=${selectedSession.timestamp}&hallId=${selectedSession.seanceHallid}&seanceId=${selectedSession.seancesId}`);
    xhr2.addEventListener('load', () => {
        console.log(xhr2.response)
      buying.insertAdjacentHTML("afterBegin", `
          <div class="buying__info">
             <div class="buying__info-description">
               <h2 class="buying__info-title">${selectedSession.filmName}</h2>
               <p class="buying__info-start">Начало сеанса: ${selectedSession.seanceTime}</p>
               <p class="buying__info-hall">${selectedSession.hallName}</p>          
            </div>
            <div class="buying__info-hint">
                <p>Тапните дважды,<br>чтобы увеличить</p>
            </div>
            </div>
            <div class="conf-step">
            <div class="conf-step__wrapper">
                ${xhr2.response !== null ? xhr2.response : selectedSession.hallConfig}
             </div>
             <div class="conf-step__legend">
            <div class="col">
                <p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_standart"></span> Свободно (<span class="conf-step__legend-value price-standart">${selectedSession.hallPriceStandart}</span>руб)</p>
                <p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_vip"></span> Свободно VIP (<span class="conf-step__legend-value price-vip">${selectedSession.hallPriceVip}</span>руб)</p>            
            </div>
            <div class="col">
                <p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_taken"></span> Занято</p>
                <p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_selected"></span> Выбрано</p>                    
            </div>
            </div>
  </div>
  <button class="acceptin-button"  >Забронировать</button>`);
});


