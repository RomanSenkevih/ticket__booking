const pageNavDayNumber = Array.from(document.querySelectorAll('.page-nav__day-number'));
const pageNavDayWeek = Array.from(document.querySelectorAll('.page-nav__day-week'));
const dayWeekList = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const today = new Date();
today.setHours(0, 0, 0);

pageNavDayNumber.forEach((el, index) => {
   const day = new Date(today.getTime() + (index * 24 * 60 * 60 * 1000));
   const timestamp = Math.trunc(day / 1000);
   el.textContent = `${day.getDate()},`;
   pageNavDayWeek[index].textContent = dayWeekList[day.getDay()];
   el.parentElement.dataset.timeStamp = timestamp;
});

pageNavDayWeek.forEach((el) => {
    if (el.textContent === 'Сб' || el.textContent === 'Вс') {
        el.style.color = 'red';
        el.nextSibling.style.color = 'red';
    }
});