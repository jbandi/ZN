import Raphael from '/vendor/raphael-min';
import textConstants from './textConstants';
import { Greeter } from 'greeter';
import backend from './backend'

console.log('Hello from TS & JSPM!');

export function main(el: HTMLElement): void {
    let greeter = new Greeter(el);
    greeter.start();
}

const paper: RaphaelPaper = new Raphael('network', 500, 500);
paper.setViewBox(0, 0, 200, 300, false);
let _data = {};

backend().getData()
    .then(data => {
        _data = data;
        createModel();
        draw(data);
        run(data);
    })

function createModel() {
    _data.labels.map(label => label.draw = drawLabel);

    _data.tracks.map(track => {
        track.draw = drawTrack;
        if (track.name) {
            track.drawTrain = drawTrain;
            track.reserve = reserve;
            track.reset = reset;
            return track;
        }
        else {
            track.reset = function() { };
        }
    });


    _data.trains.map(train => {
        train.move = move;
    })
}

function draw(data) {
    data.labels.forEach(label => { label.draw(); });
    data.tracks.forEach(track => { track.draw(); track.reset() });
}

function run(data) {
    setInterval(((train) => (() => train.move()))(data.trains[0]), 5000);
    setInterval(((train) => (() => train.move()))(data.trains[1]), 3000);
}

function drawLabel() {
    let label = paper.text(this.x, this.y, this.text);
    label.attr(textConstants[this.type]);
}

function findTrack(number) {
    for (let trackDef of _data.tracks) {
        if (trackDef.name && trackDef.name == number) {
            return trackDef;
        }
    }
}

function drawTrack() {
    let track = paper.path(["M", this.start.x, this.start.y, "L", this.end.x, this.end.y].toString());
    track.attr({ 'stroke-width': 2, 'stroke': 'grey' });
}

function reset() {
    if (this.label) {
        this.label.attr({ text: this.name });
        this.label.attr(textConstants.track);
        this.rect.hide();
    }
    else {
        let x = this.start.x + (this.end.x - this.start.x) / 2;
        let y = this.start.y - 7;
        let label = paper.text(x, y, '00000');
        label.attr({ text: this.name })
        label.attr(textConstants['track']);
        let box = label.getBBox();
        let rect = paper.rect(box.x, box.y, box.width, box.height);
        rect.attr({ 'stroke-width': '0' });
        this.label = label;
        this.rect = rect;
    }
}

function drawTrain(train) {
    this.label.attr({ text: train.name });
    this.label.attr(textConstants['train']);
    this.rect.attr({ 'fill': train.color, 'stroke': train.color });
    let box = this.label.getBBox();
    this.rect.attr({ x: box.x, y: box.y, width: box.width, heigth: box.heigth });
    this.rect.show();
    this.label.toFront();
}

function reserve(train) {
    this.label.attr({ text: train.name });
    this.label.attr({ fill: train.color });
}

function move() {
    let previousStep = this.currentStep;
    this.currentStep = this.currentStep === undefined ? 0 : (this.currentStep + 1) % this.path.length;

    if (previousStep !== undefined) {
        findTrack(this.path[previousStep]).reset();
    }

    findTrack(this.path[this.currentStep]).drawTrain(this);
    let nextTrack = findTrack(this.path[this.currentStep + 1]);
    if (nextTrack !== undefined) {
        nextTrack.reserve(this);
    }
}