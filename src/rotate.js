
import {getContext} from './common';

/**
 * 旋转六边
 */
function Rotate(records) {
    let ctx = getContext();
    let width = ctx.canvas.width;
    let height = ctx.canvas.height;
    ctx.translate(width/2, height/2);
    let len = 19;
    let step = Math.floor(records.length/3000);
    let count = 0;
    for (var i=1;i<len;i++){ // Loop through rings (from inside to out)
        ctx.save();

        for (var j=0;j<i*len;j++){ // draw individual dots
            ctx.fillStyle = records[step + count++].color();
            ctx.rotate(Math.PI*2/(i*6));
            ctx.beginPath();
            ctx.arc(0, i*22.5, 10, 0, Math.PI*2, true);
            ctx.fill();
        }

        ctx.restore();
    }
}

Rotate.run = (records) => {
    Rotate(records);
};

export default Rotate;