var Clock = function() {

    var stage;
    var clockLayer;
    var hourLayer;
    var minuteLayer;
    var clockImage = new Image();
    var hourImage = new Image();
    var minuteImage = new Image();

    this.init = function() {

        stage = new Kinetic.Stage({
            container: "clock",
            width: 300,
            height: 300
        });

        clockLayer = new Kinetic.Layer({
            x: 0,
            y: 0,
            width: 300,
            height: 300
        });
        hourLayer = new Kinetic.Layer({
            x: 149.5,
            y: 145,
            width: 6,
            height: 55
        });
        minuteLayer = new Kinetic.Layer({
            x: 149.5,
            y: 145,
            width: 6,
            height: 75
        });

        clockImage.onload = function() {
            var clock = new Kinetic.Image({
                image: clockImage,
                width: 300,
                height: 300
            });
            clockLayer.add(clock);
            clockLayer.draw();
        };

        hourImage.onload = function() {
            var hour = new Kinetic.Image({
                image: hourImage,
                x: -3,
                y: -55,
                width: 6,
                height: 55
            });
            hourLayer.add(hour);
            hourLayer.draw();
        };

        minuteImage.onload = function() {
            var minute = new Kinetic.Image({
                image: minuteImage,
                x: -3,
                y: -75,
                width: 6,
                height: 75
            });
            minuteLayer.add(minute);
            minuteLayer.draw();
        };

        clockImage.src = './src/img/clock1.png';
        hourImage.src = './src/img/secondHand.png';
        minuteImage.src = './src/img/firstHand.png';
        stage.add(clockLayer, hourLayer, minuteLayer);
    };
    this.changeClockColor = function(clock) {
        clockImage.src = './src/img/' + clock + '.png';
    };
    this.setTime = function(hour, minute) {
        var degHour = hour * 360 / 12;
        var degMinute = minute * 360 / 60;
        this.rotateHourLayer(degHour);
        this.rotateMinuteLayer(degMinute);
    };
    this.rotateHourLayer = function(deg) {
        hourLayer.rotation(deg);
        hourLayer.draw();
    };

    this.rotateMinuteLayer = function(deg) {
        minuteLayer.rotation(deg);
        minuteLayer.draw();
    };

    this.init();
};