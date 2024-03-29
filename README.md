## Задача

-   Разработать сайт бронирования билетов онлайн

## Сущности

_Кинозал_  Помещение, в котором демонстрируются фильмы. Режим работы определяется расписанием на день. Зал — прямоугольный, состоит из N*M различных зрительских мест.

_Зрительское место_  Место в кинозале. Зрительские места могут быть VIP и обычные.

_Фильм_  Информация о фильме заполняется администратором. Фильм связан с сеансом в кинозале.

_Сеанс_  Сеанс — это временной промежуток, в котором в кинозале будет показываться фильм. На сеанс могут быть забронированы билеты.

_Билет_  QR-код c уникальным кодом бронирования, в котором обязательно указаны место, ряд, сеанс. Билет действителен строго на свой сеанс. Для генерации QR-кода можно использовать [QRCreator.js](https://github.com/slesareva-gala/QR-Code)

## Роли пользователей системы

-   Гость — неавторизованный посетитель сайта

### Возможности гостя

-   просмотр расписания
-   просмотр информации о фильмах
-   выбор места в кинозале
-   бронирование билета

## Этапы разработки

1.  Адаптируйте исходную верстку под планшетные и мобильные устройства.
Ваша верстка должна корректно отображаться на устройствах с шириной экрана **320px** и более.
Для быстрой адаптации рекомендуем вам воспользоваться [системой сеток BootStrap](https://getbootstrap.su/docs/5.0/layout/grid/).
2. Разработка API для взаимодействия с [Backend.]
3. Программирование гостевой части.

### Используемые технологии
Ванильный JavaScript и HTML. Никаких фреймворков. Никаких библиотек.

HTML: код взаимодействует с документом HTML, манипулируя элементами DOM и отображая динамическое содержимое.