const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://jscp-diplom.netoserver.ru/');
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.responseType = 'json';
xhr.send('event=update');

xhr.addEventListener('load', () => {
    let responseObj = xhr.response;
    console.log(responseObj); 
});


