const pageNavDayNumber = Array.from(document.querySelectorAll('.page-nav__day-number'));
const pageNavDayWeek = Array.from(document.querySelectorAll('.page-nav__day-week'));
let nowDate = new Date();
let year = nowDate.getFullYear();
let date = nowDate.getDate();
let month = nowDate.getMonth();
let getDayName = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
let DayName = getDayName[nowDate.getDay()];
let monthDays = new Date(year, month + 1, 0).getDate();
let dayN = date;
pageNavDayNumber.forEach((el, index) => {
    if (index === 0) {
        el.textContent = nowDate.getDate();
        el.previousSibling.textContent = DayName;
    } else {
        dayN += 1;
        if (dayN <= monthDays) {
            el.textContent = dayN;
        } else {
            month += 1;
            dayN = 1;
            el.textContent = dayN;
        }
        el.previousSibling.textContent = getDayName[new Date(year, month, dayN).getDay()];
    }
});
pageNavDayWeek.forEach((el) => {
    if (el.textContent === 'СБ' || el.textContent === 'ВС') {
        el.style.color = 'red';
        el.nextSibling.style.color = 'red';
    }
});