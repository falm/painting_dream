
import {getContext} from './common';

class TriangleStone {
    constructor(records){
        this.records = records;
        this.ctx = getContext();
        this.canvas = this.ctx.canvas;
        this.canvasWidth = this.ctx.canvas.width;
        this.canvasHeight = this.ctx.canvas.height;
        this.heightScale = 0.866;
        this.ctx.lineWidth = 1;
        this.count = 0;
        this.step = 1;
    }

    rnd(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    render(){
        this.ctx.fillStyle = 'rgb(0,0,0)';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        let ctx = this.ctx;
        let hueStart = this.rnd(0, 360);
        let triSide = 40;
        let halfSide = triSide / 2;
        let rowHeight = Math.floor(triSide * this.heightScale);
        let columns = Math.ceil(this.canvasWidth / triSide) + 1;
        let rows = Math.ceil(this.canvasHeight / rowHeight);

        var col, row;
        for (row = 0; row < rows; row++) {
            var hue = hueStart + (row * 3);

            for (col = 0; col < columns; col++) {

                var x = col * triSide;
                var y = row * rowHeight;
                var clr;

                if (row % 2 != 0) {
                    x -= halfSide;
                }

                // upward pointing triangle
                //clr = 'hsl(' + hue + ', 50%, ' + this.rnd(0, 60) + '%)';
                clr = this.records[this.count++].hslColor();
                ctx.fillStyle = clr;
                ctx.strokeStyle = clr;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + halfSide, y + rowHeight);
                ctx.lineTo(x - halfSide, y + rowHeight);
                ctx.closePath();
                ctx.fill();
                ctx.stroke(); // needed to fill antialiased gaps on edges

                // downward pointing triangle
                clr = 'hsl(' + hue + ', 50%, ' + this.rnd(0, 60) + '%)';
                //clr = this.records[col].hslColor();
                ctx.fillStyle = clr;
                ctx.strokeStyle = clr;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + triSide, y);
                ctx.lineTo(x + halfSide, y + rowHeight);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

            }
        }
    }

    static run(records){
        (new TriangleStone(records)).render();
    }
}

export default TriangleStone;