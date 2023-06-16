const buying = document.querySelector('.buying');
const selectSeanse = JSON.parse(localStorage.selectSeanse);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jscp-diplom.netoserver.ru/');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.send(`event=get_hallConfig&timestamp=${Date.now() / 1000}&hallId=${selectSeanse.seanceHallid}&seanceId=${selectSeanse.idSeances}`);
    xhr.addEventListener('load', () => {
        console.log(xhr.response);
        console.log(Date.now() / 1000) 
    buying.insertAdjacentHTML("afterBegin", `
          <div class="buying__info">
             <div class="buying__info-description">
               <h2 class="buying__info-title">${selectSeanse.filmName}</h2>
               <p class="buying__info-start">Начало сеанса: ${selectSeanse.seanceTime}</p>
               <p class="buying__info-hall">${selectSeanse.hallName}</p>          
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
                <p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_standart"></span> Свободно (<span class="conf-step__legend-value price-standart">${selectSeanse.hallPriceStandart}</span>руб)</p>
                <p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_vip"></span> Свободно VIP (<span class="conf-step__legend-value price-vip">${selectSeanse.hallPriceVip}</span>руб)</p>            
            </div>
            <div class="col">
                <p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_taken"></span> Занято</p>
                <p class="conf-step__legend-price"><span class="conf-step__chair conf-step__chair_selected"></span> Выбрано</p>                    
            </div>
            </div>
  </div>
  <button class="acceptin-button"  >Забронировать</button>`);
});


