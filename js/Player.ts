class Player extends Phaser.Sprite {

    walking: boolean;
    animation: string;
    destination: Phaser.Point;
    movement: Phaser.Tween;
    static: boolean;

    constructor(game: Phaser.Game, x: number, y: number) {

        super(game, x, y, 'player', 0);

        this.anchor.setTo(0.5, 1);

        this.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 12, true);
        this.animations.add('left', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 12, true);
        this.animations.add('down', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 12, true);
        this.animations.add('up', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 12, true);
        this.animations.add('stopped', [41]);
        this.animations.play('stopped');

        this.walking = false;
        this.destination = new Phaser.Point(x, y);

        game.add.existing(this);

    }

    update() {
        //console.log('this.x', this.x, 'this.y', this.y);
        //console.log('this.x', this.destination.x, 'this.y', this.destination.y);
        if ((this.x != this.destination.x || this.y != this.destination.y) && !this.static) {
            this.walking = true;

        } else {
            this.walking = false;
        }

        if (this.walking) {
            this.animations.play(this.animation);
        } else {
            this.animations.play('stopped');
        }
    }

    setDestination(destination) {
        var duration = (this.game.physics.arcade.distanceToXY(this, destination.x, destination.y) / 200) * 1000,
            angle = this.game.physics.arcade.angleToXY(this, destination.x, destination.y);


        this.destination = new Phaser.Point(destination.x, destination.y);

        if (angle > -0.79 && angle < 0.79) {
            this.animation = 'right';
        } else if (angle > -2.36 && angle < -0.79) {
            this.animation = 'up';
        } else if (angle > 0.79 && angle < 2.36) {
            this.animation = 'down';
        } else {
            this.animation = 'left';
        }

        if (this.movement) {
            this.movement.stop();
        }

        this.movement = this.game.add.tween(this).to({ x: destination.x, y: destination.y }, duration, Phaser.Easing.Linear.None, true);
    }
}