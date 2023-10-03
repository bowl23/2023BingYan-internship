/** @type {HTMLCanvasElement} */
const cnv = document.getElementById('canvas')
const cxt = cnv.getContext('2d');
const cnvRect = cnv.getBoundingClientRect()

let isDragging = false;
let oldX = 0;
let oldY = 0;

// 定义三个小球的参数
const redBall = {
    x: cnv.width / 2,
    y: 3 * cnv.height / 4,
    radius: 40,
}

const blueBall = {
    x: cnv.width / 2,
    y: cnv.height / 4,
    radius: 40,
}

const blackBall = {
    x: cnv.width / 2,
    y: cnv.height / 2,
    radius: 30,
    vx: 0,
    vy: 0
}


// 用来存放此时鼠标的位置
const mouse1 = {
    x: 0,
    y: 0,
}
const mouse2 = {
    x: 0,
    y: 0,
}


// 画棋盘
function drawDesk() {
    cxt.beginPath();
    cxt.lineWidth = 20;
    cxt.rect(0, 0, cnv.width, cnv.height)
    cxt.strokeStyle = 'black'
    cxt.stroke();
    cxt.beginPath();
    cxt.lineWidth = 15;
    cxt.strokeStyle = 'red';
    cxt.moveTo(10, 350);
    cxt.lineTo(390, 350);
    cxt.stroke();
}


// 画球
function drawBall() {
    cxt.beginPath();
    cxt.arc(redBall.x, redBall.y, redBall.radius, 0, 2 * Math.PI);
    cxt.fillStyle = 'rgb(254, 95, 87)'
    cxt.fill()
    cxt.beginPath();
    cxt.arc(blueBall.x, blueBall.y, blueBall.radius, 0, 2 * Math.PI);
    cxt.fillStyle = 'rgb(2, 172, 243)'
    cxt.fill();

    cxt.beginPath();
    cxt.arc(blackBall.x, blackBall.y, blackBall.radius, 0, 2 * Math.PI);
    cxt.fillStyle = 'rgb(68, 75, 84)'
    cxt.fill()
}


// 边界检测
function checkRedBorder() {
    if (redBall.x < redBall.radius) {
        redBall.x = redBall.radius + 10;
    }
    if (redBall.x > cnv.width - redBall.radius) {
        redBall.x = cnv.width - redBall.radius - 10;
    }
    if (redBall.y < cnv.height / 2 + redBall.radius) {
        redBall.y = cnv.height / 2 + redBall.radius
    }
    if (redBall.y > cnv.height - redBall.radius) {
        redBall.y = cnv.height - redBall.radius - 10
    }
}


// 碰撞检测
function checkcollision() {
    let dx = redBall.x - blackBall.x
    let dy = redBall.y - blackBall.y
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < redBall.radius + blackBall.radius) {
        blackBall.vx = -(oldX - blackBall.x) / 10;//除十是发现速度太快了，目前还没找到更好的方法。
        blackBall.vy = -(oldY - blackBall.y) / 10;
        console.log('collision');
    }
}


function ballMove() {
    blackBall.x += blackBall.vx;
    blackBall.y += blackBall.vy;
}


// 小黑球的反弹
function blackBallBounce() {
    if (blackBall.x < blackBall.radius) {
        blackBall.vx = -blackBall.vx
    }
    if (blackBall.x > cnv.width - blackBall.radius) {
        blackBall.vx = -blackBall.vx
    }
    if (blackBall.y < blackBall.radius) {
        blackBall.vy = -blackBall.vy
    }
    if (blackBall.y > cnv.height - blackBall.radius) {
        blackBall.vy = -blackBall.vy
    }

    let dx = redBall.x - blackBall.x
    let dy = redBall.y - blackBall.y
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < redBall.radius + blackBall.radius) {
        blackBall.vx = -(oldX - blackBall.x) / 10;//除十是发现速度太快了，目前还没找到更好的方法。
        blackBall.vy = -(oldY - blackBall.y) / 10;
    }
}


// 红球拖拽
function dragRedBall() {
    cnv.addEventListener('touchstart', (e) => {
        // 检测是否捕获到小红球
        console.log('touchstart');
        const touch = e.touches[0];
        mouse1.x = touch.pageX - cnvRect.left;
        mouse1.y = touch.pageY - cnvRect.top;


        let dx = mouse1.x - redBall.x
        let dy = mouse1.y - redBall.y
        let dsitance = Math.sqrt(dx * dx + dy * dy);
        if (dsitance < redBall.radius) {
            isDragging = true;
            console.log('in');
        }

    })

    cnv.addEventListener('touchmove', (e) => {

        if (!isDragging) {
            return;
        }
        const touch = e.touches[0];
        mouse1.x = touch.pageX - cnvRect.left;
        mouse1.y = touch.pageY - cnvRect.top;
        redBall.x = mouse1.x;
        redBall.y = mouse1.y;
        oldX = mouse1.x;
        oldY = mouse1.y;
        checkRedBorder();
        checkcollision();
    })

    cnv.addEventListener('touchend', () => {
        isDragging = false;
        return;
    })

}

// 小蓝球的拖拽
function dragBlueBall() {
    cnv.addEventListener('touchstart', (e) => {
        // 检测是否捕获到小蓝球
        console.log('touchstart');
        const touch = e.touches[0];
        mouse2.x = touch.pageX - cnvRect.left;
        mouse2.y = touch.pageY - cnvRect.top;


        let dx = mouse2.x - blueBall.x
        let dy = mouse2.y - blueBall.y
        let dsitance = Math.sqrt(dx * dx + dy * dy);
        if (dsitance < blueBall.radius) {
            isDragging = true;
            console.log('in');
        }

    })

    cnv.addEventListener('touchmove', (e) => {

        if (!isDragging) {
            return;
        }
        const touch = e.touches[0];
        mouse2.x = touch.pageX - cnvRect.left;
        mouse2.y = touch.pageY - cnvRect.top;
        blueBall.x = mouse2.x;
        blueBall.y = mouse2.y;
        oldX = mouse2.x;
        oldY = mouse2.y;
        checkBorder();
        checkcollision();
    })

    cnv.addEventListener('touchend', () => {
        isDragging = false;
        return;
    })

}

// 拖拽
dragRedBall();
// dragBlueBall();


(function drawFrame() {
    window.requestAnimationFrame(drawFrame);
    cxt.clearRect(0, 0, cnv.width, cnv.height)
    ballMove();
    blackBallBounce();
    //画出棋盘
    drawDesk();
    drawBall();
})()