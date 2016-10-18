
import {getContext} from './common';

function Brush(x,y,size,jitt,maxHeight,color,invert) {
    this.x = x;
    this.y = y;
    this.height = 0;
    this.size = size;
    this.jitt = jitt;
    this.maxHeight = maxHeight;
    this.color = color;
    this.invert = invert;
}

Brush.prototype.grow = function() {
    if( this.height ++ > this.maxHeight ) {
        return;
    }
    let context = getContext();
    requestAnimationFrame(this.grow.bind(this));
    var y = this.invert ? this.maxHeight - this.height : this.height;
    context.beginPath();
    context.moveTo(this.x - this.size/2, y);
    context.lineTo(this.x + this.size/2, y);
    context.strokeStyle = this.color;
    context.stroke();
    context.closePath();
    this.x += Math.random() * this.jitt - (this.jitt / 2);
}


function BrushPainter(records) {
    let self = this;
    self.num = 16;
    self.records = records;
    self.step = 1 || Math.floor(records.length / self.num);

    self.draw = () => {
        setTimeout(self.init, 10);
    }

    self.iterate = () => {
        for( var i = 0; i < 16; i++ ) {
            if( self.count++ >= self.limit ) return;

            var x = Math.random() * self.width,
                y = self.height,
                size = Math.random() * 15 + 15,
                jitt = Math.random() + 0.6,
                maxHeight = self.height;
            new Brush(x,y,size,jitt,maxHeight, self.color(), Math.random()>0.5).grow();
        }
        setTimeout(self.iterate, Math.random() * 300);
    }

    self.color = () => {
        self.count += self.step;
        return self.records[self.count].color();
    }

    self.init = () => {
        self.context = getContext();
        self.canvas = self.context.canvas;
        self.height = self.canvas.height;
        self.width = self.canvas.width;
        self.count = 0;
        self.recordCount = 0;
        self.limit = 1024;
        self.context.globalAlpha = 0.88;
        self.iterate();
    }

}

BrushPainter.run = (records) => {
    (new BrushPainter(records)).draw();
};

export default BrushPainter;