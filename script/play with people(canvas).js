// 退出按钮
const exit = document.getElementById('exit')
exit.addEventListener('touchstart', () => {
    exit.classList.add('touch');
})
exit.addEventListener('touchend', () => {
    window.location.href = '../pages/index.html'
    exit.classList.remove('touch')
})

// 积分
const redScore = document.getElementById('redScore');
const blueScore = document.getElementById('blueScore');

// 初始化一些变量
/** @type {HTMLCanvasElement} */
const cnv = document.getElementById('canvas')
const cxt = cnv.getContext('2d');
const cnvRect = cnv.getBoundingClientRect()

let redIsDragging = false;
let blueIsDragging = false;
let redWin = 0;
let blueWin = 0;
let final = false;


// 定义三个小球的参数

// 小红
const redBall = {
    x: cnv.width / 2,
    y: 3 * cnv.height / 4,
    radius: 40,
}

// 小蓝
const blueBall = {
    x: cnv.width / 2,
    y: cnv.height / 4,
    radius: 40,
}

// 小黑
const blackBall = {
    x: cnv.width / 2,
    y: cnv.height / 2,
    radius: 30,
    vx: 0,
    vy: 0
}


// 用来存放此时鼠标的位置

// 鼠标1
const mouse1 = {
    x: 0,
    y: 0,
}

// 鼠标2
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
    cxt.lineWidth = 20;
    cxt.strokeStyle = 'rgb(2, 172, 243)';
    cxt.moveTo(130, 0);
    cxt.lineTo(270, 0);
    cxt.stroke();

    cxt.beginPath();
    cxt.lineWidth = 20;
    cxt.strokeStyle = 'rgb(254, 95, 87)';
    cxt.moveTo(130, cnv.height);
    cxt.lineTo(270, cnv.height);
    cxt.stroke();

    cxt.beginPath();
    cxt.lineWidth = 15;
    cxt.strokeStyle = 'rgb(241, 53, 106)';
    cxt.moveTo(10, 350);
    cxt.lineTo(390, 350);
    cxt.stroke();

}


// 画球
function drawBall() {
    cxt.beginPath();
    cxt.arc(redBall.x, redBall.y, redBall.radius, 0, 2 * Math.PI);
    cxt.fillStyle = 'rgb(254, 95, 87)';
    cxt.fill();
    cxt.beginPath();
    cxt.strokeStyle = 'black';
    cxt.lineWidth = 10;
    cxt.arc(redBall.x, redBall.y, 35, 0, 2 * Math.PI);
    cxt.stroke();
    cxt.beginPath();
    cxt.arc(redBall.x, redBall.y, 15, 0, 2 * Math.PI);
    cxt.stroke();


    cxt.beginPath();
    cxt.arc(blueBall.x, blueBall.y, blueBall.radius, 0, 2 * Math.PI);
    cxt.fillStyle = 'rgb(2, 172, 243)';
    cxt.fill();
    cxt.beginPath();
    cxt.strokeStyle = 'black';
    cxt.lineWidth = 10;
    cxt.arc(blueBall.x, blueBall.y, 35, 0, 2 * Math.PI);
    cxt.stroke();
    cxt.beginPath();
    cxt.arc(blueBall.x, blueBall.y, 15, 0, 2 * Math.PI);
    cxt.stroke();

    cxt.beginPath();
    cxt.arc(blackBall.x, blackBall.y, blackBall.radius, 0, 2 * Math.PI);
    cxt.fillStyle = 'rgb(68, 75, 84)';
    cxt.fill();
    cxt.beginPath();
    cxt.strokeStyle = 'black';
    cxt.lineWidth = 10;
    cxt.arc(blackBall.x, blackBall.y, 25, 0, 2 * Math.PI);
    cxt.stroke();


}


// 边界检测

// 红球边界检测
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

// 蓝球边界检测
function checkBlueBorder() {
    if (blueBall.x < blueBall.radius) {
        blueBall.x = blueBall.radius + 10;
    }
    if (blueBall.x > cnv.width - blueBall.radius) {
        blueBall.x = cnv.width - blueBall.radius - 10;
    }
    if (blueBall.y < blueBall.radius) {
        blueBall.y = blueBall.radius + 10
    }
    if (blueBall.y > cnv.height / 2 - blueBall.radius) {
        blueBall.y = cnv.height / 2 - blueBall.radius
    }
}

// 碰撞检测

//红球碰撞检测
function redCheckCollision() {
    let rx = redBall.x - blackBall.x
    let ry = redBall.y - blackBall.y
    let distance = Math.sqrt(rx * rx + ry * ry);
    if (distance < redBall.radius + blackBall.radius) {
        blackBall.vx = -rx / 5;
        blackBall.vy = -ry / 5;
    }
}

//蓝球碰撞检测
function blueCheckCollision() {
    let bx = blueBall.x - blackBall.x
    let by = blueBall.y - blackBall.y
    let distance = Math.sqrt(bx * bx + by * by);
    if (distance < blueBall.radius + blackBall.radius) {
        blackBall.vx = -bx / 5;
        blackBall.vy = -by / 5;
    }
}


// 小球移动
function ballMove() {
    blackBall.x += blackBall.vx;
    blackBall.y += blackBall.vy;
}


// 小黑球的反弹
function blackBallBounce() {
    // 边界检测
    if (blackBall.x < blackBall.radius + 10) {
        blackBall.vx = -blackBall.vx
    }
    if (blackBall.x > cnv.width - blackBall.radius - 10) {
        blackBall.vx = -blackBall.vx
    }
    if (blackBall.y <= blackBall.radius + 10) {
        blackBall.vy = -blackBall.vy
    }
    if (blackBall.y > cnv.height - blackBall.radius - 10) {
        blackBall.vy = -blackBall.vy
    }

    redCheckCollision();
    blueCheckCollision();
}


// 红球拖拽
function dragRedBall() {
    cnv.addEventListener('touchstart', (e) => {
        // 检测是否捕获到小红球
        const touch = e.touches[0];
        mouse1.x = touch.pageX - cnvRect.left;
        mouse1.y = touch.pageY - cnvRect.top;


        let dx = mouse1.x - redBall.x
        let dy = mouse1.y - redBall.y
        let dsitance = Math.sqrt(dx * dx + dy * dy);
        if (dsitance < redBall.radius) {
            redIsDragging = true;
        }

    })

    cnv.addEventListener('touchmove', (e) => {

        if (!redIsDragging) {
            return;
        }
        const touch = e.touches[0];
        mouse1.x = touch.pageX - cnvRect.left;
        mouse1.y = touch.pageY - cnvRect.top;
        redBall.x = mouse1.x;
        redBall.y = mouse1.y;
        checkRedBorder();
        redCheckCollision();
    })

    cnv.addEventListener('touchend', () => {
        redIsDragging = false;
        return;
    })

}

// 蓝球的拖拽
function dragBlueBall() {
    cnv.addEventListener('touchstart', (e) => {
        // 检测是否捕获到小蓝球
        const touch = e.touches[0];
        mouse2.x = touch.pageX - cnvRect.left;
        mouse2.y = touch.pageY - cnvRect.top;


        let dx = mouse2.x - blueBall.x
        let dy = mouse2.y - blueBall.y
        let dsitance = Math.sqrt(dx * dx + dy * dy);
        if (dsitance < blueBall.radius) {
            blueIsDragging = true;
        }

    })

    cnv.addEventListener('touchmove', (e) => {

        if (!blueIsDragging) {
            return;
        }
        const touch = e.touches[0];
        mouse2.x = touch.pageX - cnvRect.left;
        mouse2.y = touch.pageY - cnvRect.top;
        blueBall.x = mouse2.x;
        blueBall.y = mouse2.y;
        checkBlueBorder();
        blueCheckCollision();
    })

    cnv.addEventListener('touchend', () => {
        blueIsDragging = false;
        return;
    })

}
// 得分计数
function score() {
    if (blackBall.x >= 130 && blackBall.x <= 270 && blackBall.y <= blackBall.radius + 10) {
        redWin++;
        console.log("blue");
        final = true;
    }
    if (blackBall.x >= 130 && blackBall.x <= 270 && blackBall.y >= cnv.height - blackBall.radius - 10) {
        blueWin++;
        console.log("red");
        final = true;
    }
    redScore.textContent = redWin;
    blueScore.textContent = blueWin;
    if (final) {
        blackBall.vx = 0;
        blackBall.vy = 0;
        blackBall.x = cnv.width / 2;
        blackBall.y = cnv.height / 2;
        redBall.x = cnv.width / 2;
        redBall.y = 3 * cnv.height / 4;
        blueBall.x = cnv.width / 2;
        blueBall.y = cnv.height / 4;
        final = false;
    }
}


// 拖拽
dragRedBall();
dragBlueBall();


(function drawFrame() {
    cxt.clearRect(0, 0, cnv.width, cnv.height);//清空画布
    ballMove();
    blackBallBounce();
    //画出棋盘
    drawDesk();
    drawBall();
    score();

    // 胜利结算画面
    if (redWin == 3) {
        const musk = document.createElement('div');
        musk.classList.add('musk');
        musk.textContent = 'RED WIN'
        musk.classList.add('red-musk')
        document.body.appendChild(musk);
        setTimeout(() => {
            window.location.href = '../pages/index.html'
        }, 3000);
    }
    if (blueWin == 3) {
        const musk = document.createElement('div');
        musk.classList.add('musk');
        musk.textContent = 'BLUE WIN'
        musk.classList.add('blue-musk')
        document.body.appendChild(musk);
        setTimeout(() => {
            window.location.href = '../pages/index.html'
        }, 3000);
    }
    window.requestAnimationFrame(drawFrame);
})()