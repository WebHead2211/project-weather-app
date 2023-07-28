import { goForward,  goBack } from "./changedate";
import { forecast } from "./fetch";

export {dataInfo, checkButton}

const buttonSearch = document.getElementById('search-button');
const input = document.querySelector('input');
input.value = '';
const buttonNext = document.getElementById('button-next');
const buttonPrev = document.getElementById('button-prev');


buttonSearch.addEventListener('click', () => {
    if (input.value) {
        forecast(input.value);
        input.value = '';
    }
});

forecast('vadodara');

buttonPrev.addEventListener('click', goBack);
buttonNext.addEventListener('click', goForward);

let dataInfo;

function checkButton() {
    const containerList = document.querySelectorAll('.data-container');
    let activeContainer;
    containerList.forEach(item => {
        if(item.dataset.status == 'active') {
            activeContainer = item;
        }
    });
    if(activeContainer.dataset.index == 0) {
        buttonPrev.disabled = true;    
    } else if(activeContainer.dataset.index == 2) {
        buttonNext.disabled = true;
    } else {
        buttonNext.disabled = false;
        buttonPrev.disabled = false;
    }
    return true;
}

checkButton();