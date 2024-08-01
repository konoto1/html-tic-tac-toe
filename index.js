const clickDOM = document.querySelectorAll('.game > button');

for (let i = 0; i < clickDOM.length; i++) {
    let count = 0;
    clickDOM[i].addEventListener('click', () => {

        const isEmpty = clickDOM[i].textContent.length === 0;
        if (isEmpty) {
            clickDOM[i].textContent = 'X';
            count++;
        }

        console.log(count);
    })


}