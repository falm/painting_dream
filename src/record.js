
class Record{
    constructor(y, status, volume, x, h){
        this.x = x;
        this.y = y;
        this.h = h;
        this.volume = volume;
        this.status = status;
    }

    color() {
        return _.sample(Record.colorMap[this.status]);
    }

    hslColor(){
        return _.sample(Record.hslMap[this.status]);
    }

    isLight(){
        return this.status == '1';
    }

    isAwake(){
        return this.status == '2';
    }

    isDeep(){
        return this.status == '0';
    }

    get volume() {
        return _.random(1, true);
    }

    set volume(value){
        this._volume = value;
    }

    static factory(record){
        return new Record(..._.values(record));
    }

}

Record.colorMap = {
    '0' : ['#00BCD4', '#03A9F4', '#2196F3'],
    '1' : ['#CDDC39', '#8BC34A', '#4CAF50'],
    '2' : ['#FF5722', '#FF9800', '#FFC107']
};

Record.hslMap = {
    '0' : ['HSL(187, 75%, 47%)', 'HSL(200, 88%, 53%)', 'HSL(207, 87%, 55%)'],
    '1' : ['HSL(123, 37%, 50%)', 'HSL(123, 37%, 50%)', 'HSL(65, 66%, 57%)'],
    '2' : ['HSL(42, 98%, 59%)', 'HSL(31, 98%, 57%)', 'HSL(12, 97%, 59%)']
};


export default Record;
