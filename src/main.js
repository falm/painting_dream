
import $ from 'jquery';

import _ from 'lodash';

import './style.css';

import Record from './record';

import {getQueryString} from './common';
import Config from './config';

import Circle from './circle';
import Arc from './arc';
import {triangle, rectangle} from './graph';
import BrushPainter from './brush';
import Rotate from './rotate';
import D from './d';
import Particle from './particle';
import TriangleStone from './triangle_stone'
import Organic from './organic'

const GraphList = {
    // 'circle': [Circle, Arc, Rotate, Particle, Organic],
    'circle': [Circle, Arc, Rotate, Particle],
    // 'rectangle' : [rectangle, BrushPainter, D],
    'rectangle' : [BrushPainter, D],
    // 'triangle': [triangle, TriangleStone]
    'triangle': [TriangleStone]
};


window.Painter = {};

Painter.draw = (filename, graph, index) => {

    $.getJSON(filename, (data) => {
        let records = _.map(data, Record.factory);
        if(graph && index){
            GraphList[graph][index].run(records);
        }else{
            const graph = _.flowRight(_.sample, _.flatten, _.values);
            graph(GraphList).run(records);
        }
    })
};


(() => {

    if(process.env.NODE_ENV == 'development') {
        Painter.draw(Config.testFile, getQueryString('g'), getQueryString('i'));
    }

})();

