
import {getContext, draw} from './common';
import _ from 'lodash';

/**
 * 矩形
 */
function rectangle(record){
    let ctx = getContext();
    let x = _.random(0, ctx.canvas.width);
    let y = _.random(0, ctx.canvas.height);
    ctx.fillStyle = record.color();
    ctx.globalAlpha = record.volume/2;
    ctx.fillRect(x, y, record.x, record.y)

}

/**
 * 三角
 */
function triangle(record){
    let ctx = getContext();
    let x = _.random(0, ctx.canvas.width);
    let y = _.random(0, ctx.canvas.height);

    // ctx.beginPath();
    // ctx.fillStyle = record.color();
    // ctx.globalAlpha = record.volume/2;
    // ctx.moveTo(x, y);
    // let x2 = x + record.x * Math.cos(Math.PI / _.random(180));
    // let y2 = y + record.x * Math.sin(Math.PI / _.random(270));
    // ctx.lineTo(x2, y2);
    // let x3 = x + record.y * Math.cos(Math.PI / _.random(360));
    // let y3 = y + record.y * Math.sin(Math.PI / _.random(360));
    // ctx.lineTo(x3, y3);
    // ctx.fill();
    ctx.globalAlpha = record.volume/2;
    drawTriangle(ctx, x, y, record.x, record.y, record.color());

}

triangle.run = (records) => {
    draw(records, triangle);
};

rectangle.run = (records) => {
    draw(records, rectangle);
};

function drawTriangle(context, x, y, triangleWidth, triangleHeight, fillStyle){
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + triangleWidth / 2, y + triangleHeight);
    context.lineTo(x - triangleWidth / 2, y + triangleHeight);
    context.closePath();
    context.fillStyle = fillStyle;
    context.fill();
}

export {rectangle, triangle};