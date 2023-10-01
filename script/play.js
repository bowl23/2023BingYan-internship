// 退出按钮
const exit = document.getElementById('exit')
exit.addEventListener('touchstart', () => {
    exit.classList.add('touch');
})
exit.addEventListener('touchend', () => {
    window.location.href = '../pages/index.html'
    exit.classList.remove('touch')
})

const redBall = document.getElementById('redBall');
const blackBall = document.getElementById('blackBall');
const blueBall = document.getElementById('blueBall');
