
import {getContext} from './common';
import _ from 'lodash';
/**
 * 菱形
 */
class D{
    constructor(records){
        this.records = records;
        this.ctx = getContext();
        this.offset = 300;

        this.width = this.ctx.canvas.width + this.offset;
        this.height  = this.ctx.canvas.height + this.offset;
        this.lineWidth = _.random(5, true);
        this.denseness = 80;
        this.recordItercount = 0;
        this.points = [];
    }

    getColor() {

        let color = this.recordItercount >= this.records.length ? 'red' : this.records[this.recordItercount].color();
        this.increase();
        return color;
    }

    increase() {
        this.step = this.step ||
            Math.floor(this.records.length / ((this.width * this.height) / (this.denseness * this.denseness)))
        this.recordItercount += this.step;

    }


    start(){

        for(let height = 0; height < this.height; height += this.denseness){
            for(let width = 0; width < this.width; width += this.denseness){
                this.push(width, height);
            }
        }

        this.draw();
    }

    push(x, y) {
        this.points.push({x: x, y: y, c: this.getColor()});
    }

    draw(){
        // this.ctx.translate((this.width-this.offset)/2, - this.offset);
        _.reduce(this.points, (tx, point) => {
            this.ctx.save();
            // this.ctx.rotate(Math.PI*2/9);
            this.ctx.fillStyle = point.c;
            this.ctx.globalAlpha = 0.5;
            this.ctx.fillRect(point.x, point.y, this.denseness, this.denseness);
            this.ctx.strokeRect(point.x, point.y, this.denseness, this.denseness);
            this.ctx.restore();
        }, 0);
    }

    static run(records){
        (new D(records)).start();
    }

}

export default D;