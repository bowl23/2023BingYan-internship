const pvpBtn = document.getElementById('pvp');
const pveBtn = document.getElementById('pve');
const back = document.getElementById('back');

back.addEventListener('touchstart', () => {
    back.classList.add('touch-start');
    back.classList.remove('untouch')
});
back.addEventListener('touchend', () => {
    back.classList.add('untouch')
    back.classList.remove('touch-start')
})
