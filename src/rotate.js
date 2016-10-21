
import {getContext} from './common';

const LEN = 19;
/**
 * 旋转六边
 */

class Rotate {

    constructor(records){
        this.records = records;
        this.ctx = getContext();
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
        this.ctx.translate(this.width/2, this.height/2);
        this.step = Math.floor(records.length/3000);
        this._count = 0;
    }

    draw(){
        for (var i=1 ; i < LEN ; i++ ) { // Loop through rings (from inside to out)
            this.ctx.save();

            for (var j=0; j < i * LEN ; j++){ // draw individual dots
                this.ctx.fillStyle = this.count();
                this.ctx.rotate(Math.PI*2/(i*6));
                this.ctx.beginPath();
                this.ctx.arc(0, i*22.5, 10, 0, Math.PI*2, true);
                this.ctx.fill();
            }

            this.ctx.restore();
        }
    }

    count(){
        let i = this.step + this._count++;
        let color = null;
        if(i < this.records.length){
            color = this.records[i].color();
        }else{
            this._count = 0;
            color = this.records[this.step + this._count].color();
        }
        return color;
    }

}

Rotate.run = (records) => {
    let rotate = new Rotate(records);
    rotate.draw();
};

export default Rotate;