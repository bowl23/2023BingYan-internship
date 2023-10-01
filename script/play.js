window.onload = () => {
    /** @type {HTMLCanvasElement} */
    var desk = document.getElementById('desk');
    var cxt = desk.getContext('2d')

    cxt.moveTo(0, desk.height / 2);
    cxt.lineTo(desk.width, desk.height / 2);
    cxt.strokeStyle = "red"
    cxt.lineWidth = 4
    cxt.stroke()
}