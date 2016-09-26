
import $ from 'jquery';

function readRecords(fun){

    $('#json-file').change(() => {
        let file = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.addEventListener("load", () => {
            let result = JSON.parse(reader.result);
            console.log(result.length);
            fun(result);
        }, false);

    });

}

function draw(records, paintFunc){
    let i = 0;
    let time = Math.floor(10000/records.length);
    let run_int = setInterval(run, time);

    function run() {
        try{
            paintFunc(records[i++])
        }catch(e){
            clearInterval(run_int);
            throw(e);
        }
        if(records.length <= i){
            clearInterval(run_int);
        }
    }
}

function getContext(){
    let canvas = document.getElementById('canvas');

    return canvas.getContext('2d');
}

function CanvasInit(){
    let width = getParameterByName('width') ||  500;
    let height = getParameterByName('height') || 500;
    let canvas = getContext().canvas;
    canvas.width = width * 2;
    canvas.height = height * 2;
    let $canvas = $('canvas');
    $canvas.css('width', `${width}px`);
    $canvas.css('height', `${height}px`);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

CanvasInit();

export {readRecords, draw, getContext, CanvasInit};