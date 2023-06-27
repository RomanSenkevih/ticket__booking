const ticketInfoWrapper = document.querySelector('.ticket__info-wrapper');
const selectedSession = JSON.parse(localStorage.selectedSession);
let hellAndPlace = selectedSession.hellAndPlace[0]
const acceptinButton = document.querySelector('.acceptin-button');

const xhr3 = new XMLHttpRequest();
        xhr3.open('POST', 'https://jscp-diplom.netoserver.ru/');
        xhr3.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr3.responseType = 'json';
        xhr3.send(`event=sale_add&timestamp=${selectedSession.timestamp}&hallId=${selectedSession.seanceHallid}&seanceId=${selectedSession.seancesId}&hallConfiguration=${selectedSession.hallConfig}`);
        xhr3.addEventListener('load', () => {
            acceptinButton.addEventListener('click', (e) => {
                if(xhr3.response === null || xhr3.response === undefined) {
                    e.preventDefault();
                    alert('Что-то пошло не так! Попробуйте повторить бронирование через 5 минут.')
                } else { }  
            })
        });

for(let i = 1; i < selectedSession.hellAndPlace.length; i++){
    hellAndPlace += `, ${selectedSession.hellAndPlace[i]}`
}
ticketInfoWrapper.insertAdjacentHTML("afterBegin",`
    <p class="ticket__info">На фильм: <span class="ticket__details ticket__title">${selectedSession.filmName}</span></p>
    <p class="ticket__info">Место/Ряд: <span class="ticket__details ticket__chairs">${hellAndPlace}</span></p>
    <p class="ticket__info">В зале: <span class="ticket__details ticket__hall">${selectedSession.hallName}</span></p>
    <p class="ticket__info">Начало сеанса: <span class="ticket__details ticket__start">${selectedSession.seanceTime}</span></p>
    <p class="ticket__info">Стоимость: <span class="ticket__details ticket__cost">${selectedSession.ticketPriceAmount}</span> рублей</p>
`);
