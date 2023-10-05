const pvpBtn = document.getElementById('pvp');
const pveBtn = document.getElementById('pve');
const back = document.getElementById('back');
const people = document.getElementById('people')
const bot = document.getElementById('bot')

back.addEventListener('touchstart', () => {
    back.classList.add('touch-start');
    back.classList.remove('untouch')
});
back.addEventListener('touchend', () => {
    back.classList.add('untouch')
    back.classList.remove('touch-start')
    window.alert('不准跑！')
})
pvpBtn.addEventListener('touchstart', () => {
    people.classList.add('touch')
    people.classList.remove('untouch')
    pvpBtn.classList.add('touch-start');
    pvpBtn.classList.remove('untouch')
});
pvpBtn.addEventListener('touchend', () => {
    people.classList.add('untouch')
    people.classList.remove('touch')
    pvpBtn.classList.add('untouch')
    pvpBtn.classList.remove('touch-start')
    window.location.href = 'play with people(canvas).html'
})
pveBtn.addEventListener('touchstart', () => {
    bot.classList.add('touch')
    bot.classList.remove('untouch')
    pveBtn.classList.add('touch-start');
    pveBtn.classList.remove('untouch')
});
pveBtn.addEventListener('touchend', () => {
    bot.classList.add('untouch')
    bot.classList.remove('touch')
    pveBtn.classList.add('untouch')
    pveBtn.classList.remove('touch-start')
    window.location.href = 'bot-choice.html'
})
