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


range.addEventListener('input', () => {
    const textHeight = difficultyText.clientHeight;
    console.log(textHeight);
    const textTop = 100 * range.value / difficultyText.clientHeight;
    console.log(textTop);
    difficultyText.style.top = `-${textTop}%`;
})