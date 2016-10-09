
import {getContext, draw} from './common';
import _ from 'lodash';
/**
 * 波点
 */
function Circle(record) {
    var self = this;
    self.record = record;
    self.ctx = getContext();
    self.tx = _.random(0, self.ctx.canvas.width);
    self.ty = _.random(0, self.ctx.canvas.height);
    self.x = 0;
    self.y = 0;
    self.vx = 5;
    self.vy = 2;

    self.point = () => {
        let endAngle  = Math.PI * 2; // 结束点
        self.ctx.beginPath();
        self.ctx.arc(self.tx, self.ty, self.radius(), 0, endAngle, true);
        self.ctx.fillStyle = self.color();
        self.ctx.globalAlpha = self.record.volume;
        self.ctx.fill();
    }

    self.draw = () => {
        self.point();

    }

    self.clear = () => {
        self.ctx.clearRect(0,0, self.ctx.canvas.width, self.ctx.canvas.height);
    }

    self.checkExtrema = (func) => {
        if(self.x > self.target_x || self.y > self.target_y){
            //window.cancelAnimationFrame(self.raf);
            return;
        }else{
            func();
        }
    }

    self.color = () => {
        self._color = self._color || self.record.color();
        return self._color;
    }

    self.radius = () => {
        return self._radius = self._radius || self.record.h/20+ _.random(10);
    }

}

Circle.run = (records) => {
    draw(records, Circle.render);
}

Circle.render = (record) => {

    let circle = new Circle(record);
    circle.draw();
}

export default Circle;