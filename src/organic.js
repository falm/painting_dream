import {getContext} from './common'

function Organic(records){

    var self = this;
    window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

    self.records = records;

    self.init = function(){
        self.ctx = getContext();
        self.canvas = self.ctx.canvas ;
        self.ctx.lineWidth = .5;
        // self.ctx.strokeStyle = 'rgba(0,0,0,.75)';
        self.ctx.strokeStyle = self.color();
        self.count = Math.floor(self.canvas.width/3);
        self.rotation = 270*(Math.PI/180);
        self.speed = 6;
        self.canvasLoop();
    };

    self.color = () => {
        return _.sample(records).hslColor();
    };

    self.updateLoader = function(){
        self.rotation += self.speed/100;
    };

    self.renderLoader = function(){
        self.ctx.save();
        self.ctx.globalCompositeOperation = 'source-over';
        self.ctx.translate(self.canvas.width/2, self.canvas.height/2);
        self.ctx.rotate(self.rotation);
        var i = self.count;
        while(i--){
            self.ctx.beginPath();
            self.ctx.arc(0, 0, i+(Math.random()*35), Math.random(), Math.PI/3+(Math.random()/12), false);
            self.ctx.stroke();
        }
        self.ctx.restore();
    };

    self.canvasLoop = function(){
        requestAnimFrame(self.canvasLoop, self.canvas);
        self.ctx.globalCompositeOperation = 'destination-out';
        //self.ctx.fillStyle = 'rgba(0,0,0,.03)';
        self.ctx.fillStyle = self.color();
        self.ctx.fillRect(0,0, self.canvas.width,self.canvas.height);
        self.updateLoader();
        self.renderLoader();
    };

}

Organic.run = (records) => {
    let o = new Organic(records);
    o.init();
};

export default Organic