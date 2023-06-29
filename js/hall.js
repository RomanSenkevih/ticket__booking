const buying = document.querySelector('.buying');
const selectedSession = JSON.parse(localStorage.selectSeanse);

    const xhr2 = new XMLHttpRequest();
    xhr2.open('POST', 'https://jscp-diplom.netoserver.ru/');
    xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr2.responseType = 'json';
    xhr2.send(`event=get_hallConfig&timestamp=${selectedSession.timestamp}&hallId=${selectedSession.seanceHallid}&seanceId=${selectedSession.seancesId}`);
    xhr2.addEventListener('load', () => {
        // console.log(xhr2.response)
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
            <div class="conf-step__wrapper">${xhr2.response !== null ? xhr2.response : selectedSession.hallConfig}</div>
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
  <a class="acceptin-button-a" href="payment.html"><button class="acceptin-button">Забронировать</button></a>`)
  
//   *********************************************************************************************
  let chairТumber = 0;
  let sobNumber = 0;
  let hellAndPlace = [];
  let ticketPriceAmount = 0;
  const confStepWrapper = document.querySelector('.conf-step__wrapper');
  const confStepRow = Array.from(document.querySelectorAll('.conf-step__row'));
  const confStepChair = Array.from(document.querySelectorAll('.conf-step__chair'));

  confStepChair.forEach((element) => {
    if(!element.classList.contains('conf-step__chair_disabled') && element.parentElement.classList.contains("conf-step__row")) {
        chairТumber += 1;
        element.dataset.chairТumber = chairТumber;
    }
  })

      confStepRow.forEach(el => {
        sobNumber += 1;
        el.dataset.sobNumber = sobNumber;
      })

  document.addEventListener('click', e => {
    if (!e.target.classList.contains('conf-step__chair_disabled') && !e.target.classList.contains('conf-step__chair_taken') && e.target.parentElement.classList.contains("conf-step__row")) {
       e.target.classList.toggle('conf-step__chair_selected');
    }
    
    if(e.target.classList.contains('acceptin-button')){
        confStepChair.forEach((element) => {
               let row = element.parentElement.classList.contains("conf-step__row");
               let selected = element.classList.contains('conf-step__chair_selected')
               let standart = element.classList.contains('conf-step__chair_standart')
               let vip = element.classList.contains('conf-step__chair_vip')
              if(selected && row) {
                 hellAndPlace.push(`${element.getAttribute('data-chairТumber')}/${element.parentElement.getAttribute('data-sob-number')}`);
                 if(selected && row && standart) {
                     ticketPriceAmount += Number(selectedSession.hallPriceStandart)
                 }else if(selected && row && vip) {
                     ticketPriceAmount += Number(selectedSession.hallPriceVip);
                 }
                 selectedSession.hellAndPlace = hellAndPlace;
                 selectedSession.ticketPriceAmount = ticketPriceAmount; 
              }
        });
        if(hellAndPlace.length > 0) { 
        confStepChair.forEach((elem) => {
          delete elem.parentElement.dataset.sobNumber;
          delete elem.dataset.chairТumber;
        });  
        selectedSession.hallConfig = confStepWrapper.innerHTML;
        localStorage.setItem("selectedSession", JSON.stringify(selectedSession));
      } else {
        e.preventDefault();
        alert('Не выбрано место!')
      }
    }
  })
});


