var Clock = function() {

    var stage;
    var layerClock;
    var layerHour;
    var layerMinute;
    var imageClock = new Image();
    var imageHour = new Image();
    var imageMinute = new Image();

    this.init = function() {

        stage = new Kinetic.Stage({
            container: "clock",
            width: 300,
            height: 300
        });

        layerClock = new Kinetic.Layer({
            x: 0,
            y: 0,
            width: 300,
            height: 300
        });
        layerHour = new Kinetic.Layer({
            x: 149.5,
            y: 145,
            width: 6,
            height: 55
        });
        layerMinute = new Kinetic.Layer({
            x: 149.5,
            y: 145,
            width: 6,
            height: 75
        });

        imageClock.onload = function() {
            var clock = new Kinetic.Image({
                image: imageClock,
                width: 300,
                height: 300
            });
            layerClock.add(clock);
            layerClock.draw();
        };

        imageHour.onload = function() {
            var hour = new Kinetic.Image({
                image: imageHour,
                x: -3,
                y: -55,
                width: 6,
                height: 55
            });
            layerHour.add(hour);
            layerHour.draw();
        };

        imageMinute.onload = function() {
            var minute = new Kinetic.Image({
                image: imageMinute,
                x: -3,
                y: -75,
                width: 6,
                height: 75
            });
            layerMinute.add(minute);
            layerMinute.draw();
        };

        imageClock.src = './src/img/clock1.png';
        imageHour.src = './src/img/secondHand.png';
        imageMinute.src = './src/img/firstHand.png';
        stage.add(layerClock, layerHour, layerMinute);
    };
    this.onChangeClock = function(clock) {
        imageClock.src = './src/img/' + clock + '.png';
    };
    this.setTime = function(hour, minute) {
        var tmpHour = hour > 12 ? hour - 12 : hour + minute / 60;
        var degHour = tmpHour * 360 / 12;
        var degMinute = minute * 360 / 60;
        this.onRotateHour(degHour);
        this.onRotateMinute(degMinute);
    };
    this.onRotateHour = function(deg) {
        layerHour.rotation(deg);
        layerHour.draw();
    };

    this.onRotateMinute = function(deg) {
        layerMinute.rotation(deg);
        layerMinute.draw();
    };

    this.init();
};