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

let isDragging = false;
let offsetX = 0;
let offsetY = 0;
// 拖拽
redBall.addEventListener('touchstart', (e) => {
    // console.log("red");
    const touch = e.touches[0];
    isDragging = true;
    offsetX = touch.clientX - redBall.getBoundingClientRect().left;
    offsetY = touch.clientY - redBall.getBoundingClientRect().top;//这个偏移量的问题处在哪里目前还没解决。
    console.log(offsetX, offsetY);
})

redBall.addEventListener('touchmove', (e) => {
    // console.log('move');
    if (!isDragging) return;
    const touch = e.touches[0];
    let x = touch.clientX - offsetX;
    let y = touch.clientY - offsetY;

    redBall.style.left = x + 'px'
    redBall.style.top = y + 'px'
    check();
    checkCollision();
});
redBall.addEventListener('touchend', () => {
    isDragging = false;
});


// 边界检测
const desk = document.getElementById('desk');

function check() {
    const ballLeft = redBall.offsetLeft - desk.offsetLeft - desk.clientLeft;//距desk左边框的距离
    const ballRight = desk.clientWidth - ballLeft - redBall.offsetWidth;//距desk右边框的距离
    const ballTop = redBall.offsetTop - desk.offsetTop - desk.clientTop;
    const ballBottom = desk.clientHeight - ballTop - redBall.offsetHeight;
    // console.log(ballLeft);
    if (ballLeft <= 0) {
        redBall.style.left = `0px`;
    }
    if (ballRight <= 0) {
        1
        redBall.style.left = `${desk.clientWidth - redBall.offsetWidth}px`
    }
    if (ballTop <= 0) {
        redBall.style.top = `${desk.offsetTop}px`
    }
    if (ballBottom < 0) {
        redBall.style.top = `${desk.clientHeight - redBall.offsetHeight}px`
    }
}
// 碰撞
function checkCollision() {
    const redLeft = redBall.getBoundingClientRect().left;
    const redRight = redBall.getBoundingClientRect().right;
    const redTop = redBall.getBoundingClientRect().top
    const redBottom = redBall.getBoundingClientRect().bottom;
    const blackLeft = blackBall.getBoundingClientRect().left;
    const blackRight = blackBall.getBoundingClientRect().right;
    const blackTop = blackBall.getBoundingClientRect().top;
    const blackBottom = blackBall.getBoundingClientRect().bottom;

    if (!(redLeft > blackRight || redRight < blackLeft || redTop > blackBottom || redBottom < blackTop)) {
        console.log("yes");
    }
    else {
        console.log('no');
    }
}