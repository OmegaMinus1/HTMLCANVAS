
var Time = new function () {

    this.Clock = new THREE.Clock();

    this.getTime = function () {
        return this.Clock.Time();
    };
}
