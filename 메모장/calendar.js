function calendar(newYear, newMonth) {
    // 1. 무슨 요일에 시작하는지 알아야 한다.
    const time = new Date(newYear, newMonth - 1, 1);

    // 2. 해당 월에 날이 며칠이나 있는지!
    // const timeLength = 32 - new Date(newYear, newMonth - 1, 32).getDate();
    const timeLength = new Date(newYear, newMonth, 0).getDate();

    let year = time.getFullYear(),
        month = time.getMonth(),
        date = time.getDate(),
        day = time.getDay();

    const captionYear = document.querySelector('.year'),
        captionMonth = document.querySelector('.month'),
        timeEl = document.querySelector('time'),
        days = document.querySelectorAll('tr td');

    // 값이 아예 들어가지 않는 행의 크기도 동일하게 유지하기 위해서
    // tr td에 전부 띄어쓰기, 즉 공백을 넣어준다.
    for (let i = 0; i < days.length; i++) {
        days[i].innerHTML = '&nbsp';
    }

    for (let i = day; i < day + timeLength; i++) {
        //days[i].textContent = date++;
        days[i].innerHTML = `
        <div>
            <p>${date++}</p>
            <button class='btn-add'>+</button>
            </div>
        <ul>

        <ul>
        `;
    }
    captionYear.textContent = year;
    captionMonth.textContent = month + 1;
    timeEl.dateTime = `${year} - ${month + 1}`
}


const btns = document.querySelectorAll('time button');
btns.forEach((item) => {
    item.addEventListener('click', () => {
        if (item.classList.contains('prev')) {
            calendar(year, --month);
        } else {
            calendar(year, ++month);
            loadMemo();
        }
    })
})


// 위의 이벤트리스너보다 아래에 있는데도 undefined가 아니라 제대로 값이 할당된 이유는??
// 위의 이벤트리스너가 실행(클릭)되기전까지는 year과 month의 값을 필요로하지 않기 떄문이다.
let year = new Date().getFullYear()
let month = new Date().getMonth() + 1

calendar(year, month)
