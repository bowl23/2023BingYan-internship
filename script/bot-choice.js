const play = document.getElementById('play')
const back = document.getElementById('back')
const backText = document.querySelector('.bcak-text')
const difficultyText = document.querySelector('.difficulty-text')
const range = document.getElementById('range')

play.addEventListener('touchstart', () => {
    console.log('play');
    play.classList.add('touch-start');
    play.classList.remove('untouch');

})
play.addEventListener('touchend', () => {
    window.location.href = "./play with bot(canvas).html"
    play.classList.remove('touch-start');
    play.classList.add('untouch');
})
back.addEventListener('touchstart', () => {
    back.classList.add('touch-start');
    back.classList.remove('untouch')
})
back.addEventListener('touchend', () => {
    back.classList.remove('touch-start')
    back.classList.add('untouch')
    window.location.href = './index.html'
})

let textTop = 0
const textHeight = difficultyText.clientHeight;
range.addEventListener('input', () => {

    textTop = 2 * range.value;
    difficultyText.style.top = `-${textTop}%`;
})

range.addEventListener('touchend', () => {
    if (range.value < 20) {
        range.value = 0;
        textTop = 2 * range.value;
    }
    else if (range.value <= 80) {
        range.value = 50;
        textTop = 2 * range.value;
    }
    else {
        range.value = 100
        textTop = 2 * range.value;
    }
    difficultyText.style.top = `-${textTop}%`

    // 控制难度
    if (range.value == 0) {
        localStorage.setItem('diff', 'easy');
    }
    if (range.value == 50) {
        localStorage.setItem('diff', 'normal');
    }
    if (range.value == 100) {
        localStorage.setItem('diff', 'hard');
    }

})

