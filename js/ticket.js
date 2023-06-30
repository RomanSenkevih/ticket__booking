const ticket = document.querySelector(".ticket");
const selectedSession = JSON.parse(localStorage.selectedSession);
let hellAndPlace = selectedSession.hellAndPlace[0];

for (let i = 1; i < selectedSession.hellAndPlace.length; i++) {
  hellAndPlace += `, ${selectedSession.hellAndPlace[i]}`;
};
let qrInfo = `На фильм ${selectedSession.filmName}, В зале ${
  selectedSession.hallName
}, Ряд/Место ${hellAndPlace}, Начало сеанса ${new Date(
  selectedSession.timestamp * 1000
)}`;
console.log(new Date(selectedSession.timestamp * 1000));
const qrcode = QRCreator(qrInfo, { image: "SVG" });
const content = (qrcode) => {return qrcode.error ? `недопустимые исходные данные ${qrcode.error}` : qrcode.result;};

ticket.insertAdjacentHTML("afterBegin", `
    <header class="tichet__check">
    <h2 class="ticket__check-title">Электронный билет</h2>
    </header>

    <div class="ticket__info-wrapper">
    <p class="ticket__info">На фильм: <span class="ticket__details ticket__title">${selectedSession.filmName}</p>
    <p class="ticket__info">Ряд/Место: <span class="ticket__details ticket__chairs">${hellAndPlace}</span></p>
    <p class="ticket__info">В зале: <span class="ticket__details ticket__hall">${selectedSession.hallName}</span></p>
    <p class="ticket__info">Начало сеанса: <span class="ticket__details ticket__start">${selectedSession.seanceTime}</span></p>

    <div class="ticket__info-qr"></div>

    <p class="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
    <p class="ticket__hint">Приятного просмотра!</p>
    </div>
`);

document.querySelector(".ticket__info-qr").append(content(qrcode));
qrcode.download();
