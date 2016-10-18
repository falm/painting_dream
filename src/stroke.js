import {getContext, draw} from './common'


class Stroke {

    constructor(record){
        this.ctx = getContext();
        this.canvas = getContext().canvas;
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.record = record;
    }

    draw(){

    }

    static render(record){
        let self = new Stroke(record);
        return self.draw();
    }

    static run(records){
        draw(records, Stroke.render)
    }
}

export default Stroke