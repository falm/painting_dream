
import {getContext, draw} from './common';
import _ from 'lodash';

/**
 * 圆弧
 */
class Arc{
    constructor(record){
        this.record = record;
        this.ctx = getContext();
        this.x = this.ctx.canvas.width / 2 + 50;
        this.y = this.ctx.canvas.height - 40;
        this.radius         = _.random(700);                    // 圆弧半径
        this.startAngle     = _.random(record.x) ;                     // 开始点
        this.endAngle       = Math.PI * 2 + record.y;
        this.lineWidth = _.random(5, true);
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, true);
        this.ctx.strokeStyle = this.record.color();
        this.ctx.globalAlpha = this.record.volume;
        this.ctx.stroke();
    }

    static render(record){
        (new Arc(record)).draw();
    }

    static run(records){
        draw(records, Arc.render);
    }
}

export default Arc;