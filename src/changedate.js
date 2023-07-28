import { checkButton } from ".";

export {
    goForward,
    goBack
}

function goForward(e) {
    const current = document.querySelector('[data-status="active"]');
    let next;
    if(+current.dataset.index < 2) {
        current.dataset.status = 'previous';
        const nextIndex = +(current.dataset.index) + 1;
        next = document.querySelector(`[data-index="${nextIndex}"]`);
        next.dataset.status = 'active';
    }
    checkButton();
}

function goBack(e) {
    const current = document.querySelector('[data-status="active"]');
    let previous;
    if(+current.dataset.index > 0) {
        current.dataset.status = 'next';
        const nextIndex = +(current.dataset.index) - 1;
        previous = document.querySelector(`[data-index="${nextIndex}"]`);
        previous.dataset.status = 'active';
    }
    checkButton();
}

const containerList = document.querySelectorAll('.data-container');
containerList.forEach(item => {
    const currentImg = item.querySelector('.img-wrapper');
    currentImg.addEventListener('mouseover', (e) => {
        const para = item.querySelector('.condition');
        para.classList.remove('hide-condition');
    });
    currentImg.addEventListener('mouseout', (e) => {
        const para = item.querySelector('.condition');
        para.classList.add('hide-condition');
    });
});
