import { format, parse } from "date-fns";
import { checkButton, dataInfo } from ".";

export {
    dataFill,
    errorFill
}

let isCelcius = true;
const containerList = document.querySelectorAll('.data-container');
const unitButton = document.getElementById('unit-button');

function dataFill(info, search) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = false;
    });
    const name = document.getElementById('name');
    const country = document.getElementById('country');
    const time = document.getElementById('time');
    name.textContent = info.location.name;
    country.textContent = info.location.country;
    time.textContent = info.location.localtime.slice(11);
    setBg(time.textContent);
    containerList.forEach((item, index) => {
        const currentDay = info.forecast.forecastday[index];
        const currentDate = item.querySelector('.date');
        const currentTemp = item.querySelector('.temp');
        const currentImg = item.querySelector('.desc');
        const currentCondition = item.querySelector('.condition');
        currentDate.textContent = dateFormat(parse(currentDay.date, 'yyyy-MM-dd', new Date()));
        currentTemp.textContent = setTemp(isCelcius, currentDay);
        currentImg.src = `https:${currentDay.day.condition.icon}`;
        currentCondition.textContent = currentDay.day.condition.text;
        if(search) {
            if(index == 0) {
                item.dataset.status = 'active';
            } else {
                item.dataset.status = 'next';
            }
        }
    });
    checkButton();
}

function setBg(time) {
    const div = document.querySelector('.bg');
    if(time == 'error') {
        div.style.backgroundImage = 'url(https://images.unsplash.com/photo-1523804427826-322aa3cfaa42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)';
        return true;
    }
    const hour = +(time.slice(0, -3));
    if (hour >= 7 && hour <= 19) {
        //day
        div.style.backgroundImage = `url('./images/day.jpg')`;
    } else {
        //night
        div.style.backgroundImage = `url('./images/night.jpg')`;
    }
}

function setTemp(celcius, current) {
    if (celcius) {
        return `${Math.round(current.day.avgtemp_c)}C`;
    } else {
        return `${Math.round(current.day.avgtemp_f)}F`;
    }
}

function dateFormat(date) {
    const formatted = format(date, 'd MMMM');
    return formatted;
}



unitButton.addEventListener('click', () => {
    if (unitButton.querySelector('i').className == 'fa-solid fa-c') {
        unitButton.querySelector('i').className = 'fa-solid fa-f'
        isCelcius = false;
    } else {
        unitButton.querySelector('i').className = 'fa-solid fa-c'
        isCelcius = true;
    }
    updateTemp();
});

function updateTemp() {
    dataFill(dataInfo, false);
}


function errorFill(search) {
    unitButton.disabled = true;
    const name = document.getElementById('name');
    const country = document.getElementById('country');
    const time = document.getElementById('time'); 
    setBg('error');
    name.textContent = ':(';
    country.textContent = `Sorry, I don't know that place`;
    time.textContent = '??:??';
    containerList.forEach((item, index) => {
        const currentDate = item.querySelector('.date');
        const currentTemp = item.querySelector('.temp');
        const currentImg = item.querySelector('.desc');
        const currentCondition = item.querySelector('.condition');
        currentDate.textContent = '???';
        currentTemp.textContent = '???';
        currentImg.src = `https://pixabay.com/get/g2586718f71826e5a1f0763d64b8bd7fac232246506a56b47b5df503c5b9ec6078c769df7aa60ee6408131fa6b1c9c608c1e7685a1bc8d8f1cc64e7527bf30183d9b248951c548e772ff2e15560b9b0d0_640.png`;
        currentImg.classList.add('error');
        currentCondition.textContent = 'Error';
        if(search) {
            if(index == 0) {
                item.dataset.status = 'active';
            } else {
                item.dataset.status = 'next';
            }
        }
    });
    checkButton();
}