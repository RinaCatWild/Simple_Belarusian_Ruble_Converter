import 'babel-polyfill';
import _ from 'lodash';
import './../sass/styles.scss';

let button = document.getElementById('button'),
    input = document.getElementById('sumInput'),
    exchangeWindow = document.getElementById('exchWind'),
    clearButton = document.getElementById('clear');

button.onclick = async function () {
    try {
        if (input.value != "") {
            let url = 'http://www.nbrb.by/api/exrates/rates?ondate=2016-7-6&periodicity=0',
                response = await fetch(url),
                exchData = await response.json(),
                usdCur = exchData.find(x => x.Cur_Abbreviation === 'USD').Cur_OfficialRate,
                eurCur = exchData.find(x => x.Cur_Abbreviation === 'EUR').Cur_OfficialRate,
                rubCur = exchData.find(x => x.Cur_Abbreviation === 'RUB').Cur_OfficialRate,
                userAnswer = input.value,
                data = `<p>${(userAnswer * usdCur).toFixed(2)} USD</p>
                <p>${(userAnswer * eurCur).toFixed(2)} EUR</p>
                <p>${(userAnswer * rubCur * 10).toFixed(2)} RUB</p>`;
            exchangeWindow.innerHTML = data;
        } else {
            exchangeWindow.innerHTML = `<p>Введите сумму в белорусских рублях!</p>`;
        }
    } catch (error) {
        exchangeWindow.innerHTML = `<p>Упс! Возникла ошибка. Попробуйте снова позже.</p>`;
    }
}

clearButton.onclick = function () {
    input.value = "";
    exchangeWindow.innerHTML = "";
};
