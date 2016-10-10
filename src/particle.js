

import {getContext} from './common';

// const context = getContext();
// const canvas = context.canvas;
//     width = canvas.width,
//     height = canvas.height,
//     densityX = 100,
//     densityY = 100,
//     devideX = Math.floor(width / densityX),
//     devideY = Math.floor(height / densityY),
//     largeSize = [24, 18, 16],
//     middleSize = [14, 13],
//     smallSize = [12, 8],
//     originSpeed = .2,
//     speed2 = 2.8;

// var largeParticles = [],
//     middleParticles = [],
//     smallParticles = [],
//     collision = false;

class Particle{

    constructor(x, y, size, color){
        this.x = x;
        this.y = y;
        this.r = size;
        this.angle = Math.random() * Math.PI * 2;
        this.vx = Particle.originSpeed * Math.cos(this.angle);
        this.vy = Particle.originSpeed * Math.sin(this.angle);
        this.color = color;
    }

    update(){
        if(this.x - this.r < 0 || this.x + this.r > Particle.width){
            this.vx *= -1;
        } else if (this.y - this.r < 0 || this.y + this.r > Particle.height){
            this.vy *= -1;
        }

        if(!Particle.collision){
            //current velocity
            var cv = {s: this.currentSpeed(), a: this.currentAngle()};

            //easing
            if(Particle.originSpeed < cv.s){
                this.vx -= Math.cos(cv.a) * (cv.s - Particle.originSpeed) * .1;
                this.vy -= Math.sin(cv.a) * (cv.s - Particle.originSpeed) * .1;
            }
        }

        this.x += this.vx;
        this.y += this.vy;
    }

    currentSpeed(){
        return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    }

    currentAngle(){
        return Math.atan2(this.vy, this.vx);
    }

    static setParticles(records){

        for(var h = 0; h < this.devideY; h += 1){
            for(var w = 0; w < this.devideX; w += 1){
                //avoid collision
                var x = this.densityX * w + 80 + (this.densityX - 160) * Math.random(),
                    y = this.densityY * h + 80 + (this.densityY - 160) * Math.random(),
                    randomNum = Math.floor(Math.random() * 3.5);
                if(randomNum === 0 || randomNum === 2){
                    this.largeParticles.push(
                        new Particle(x, y, this.largeSize[Math.floor(Math.random() * this.largeSize.length)],
                            _.sample(records.awake).color())
                    );
                }

                if(randomNum === 0 || randomNum === 1){
                    this.middleParticles.push(
                        new Particle(x, y, this.middleSize[Math.floor(Math.random() * this.middleSize.length)],
                            _.sample(records.light).color())
                    );
                }
                if(randomNum === 1 || randomNum === 2){
                    this.smallParticles.push(
                        new Particle(x, y, this.smallSize[Math.floor(Math.random() * this.smallSize.length)],
                            _.sample(records.deep).color())
                    );
                }
            }
        }

    }

    static checkDistance(array){
        for(var i = 0, len = array.length; i < len - 1; i++){
            for(var j = i + 1; j < len; j++){
                var p0 = array[i],
                    p1 = array[j],
                    pDistance = (p1.x - p0.x) * (p1.x - p0.x) + (p1.y - p0.y) * (p1.y - p0.y),
                    pAngle = Math.atan2(p1.y - p0.y, p1.x - p0.x);

                if((pDistance < 20000 && array === this.largeParticles) ||
                    (pDistance < 15000 && array === this.middleParticles) ||
                    (pDistance < 9000 && array === this.smallParticles)
                ){
                    this.context.globalAlpha = .6;

                    if(array === this.largeParticles){
                        this.context.strokeStyle = "#fff";
                    } else if(array === this.middleParticles){
                        this.context.strokeStyle = "#666";
                    } else if(array === this.smallParticles){
                        this.context.strokeStyle = "#333";
                    }


                    this.context.beginPath();
                    this.context.moveTo(p0.x, p0.y);
                    this.context.lineTo(p1.x, p1.y);
                    this.context.stroke();
                }

                if(pDistance < (p0.r + p1.r) * (p0.r + p1.r)){
                    this.collision = true;
                    p1.vx = Math.cos(pAngle) * this.speed2;
                    p1.vy = Math.sin(pAngle) * this.speed2;
                    p0.vx = -Math.cos(pAngle) * this.speed2;
                    p0.vy = -Math.sin(pAngle) * this.speed2;
                } else {
                    this.collision = false;
                }
            }
        }
    }

    static draw(array){
        this.checkDistance(array);
        for(var i = 0, len = array.length; i < len; i++){
            var p = array[i];
            p.update();
            Particle.context.globalAlpha = 1;
            Particle.context.fillStyle = p.color;
            Particle.context.beginPath();
            Particle.context.arc(p.x, p.y, p.r, 0, Math.PI  * 2, false);
            Particle.context.fill();
        }
    }

    static render(){
        this.context.clearRect(0, 0, this.width, this.height);
        Particle.draw(this.smallParticles);
        Particle.draw(this.middleParticles);
        Particle.draw(this.largeParticles);
        requestAnimationFrame(Particle.render.bind(this));
    }

    static run(records){
        let recordHash = {
            deep: _.filter(records, (r) => r.isDeep()),
            light: _.filter(records, (r) => r.isLight()),
            awake: _.filter(records, (r) => r.isAwake()),
        };
        this.setParticles(recordHash);
        this.render();
    }
}


Particle.context = getContext();
Particle.canvas = getContext().canvas;
Particle.width = Particle.canvas.width;
Particle.height = Particle.canvas.height;
Particle.densityX = 100;
Particle.densityY = 100;
Particle.devideX = Math.floor(Particle.width / Particle.densityX);
Particle.devideY = Math.floor(Particle.height / Particle.densityY);
Particle.largeSize = [24, 18, 16];
Particle.middleSize = [14, 13];
Particle.smallSize = [12, 8];
Particle.originSpeed = .2;
Particle.speed2 = 2.8;

Particle.largeParticles = [];
Particle.middleParticles = [];
Particle.smallParticles = [];
Particle.collision = false;

export default Particle;