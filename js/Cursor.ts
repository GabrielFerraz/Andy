class Cursor {

    sprite: Phaser.Sprite;
    cursorType: string;
    pointer: Phaser.Point;
    game: Phaser.State;

    constructor(game: Level) {
        this.pointer = game.input.position;
        this.cursorType = 'grab';
        //this.sprite = game.add.sprite(this.pointer.x, this.pointer.y, 'cursor', 0);
        this.sprite = game.cursorLayer.create(this.pointer.x, this.pointer.y, 'cursor', 0);
        this.sprite.anchor.setTo(0.5, 0.5);
        console.log(game.input.position);
        this.game = game;
    }

    update() {
        this.sprite.position = this.pointer;
    }

    changeTo(frame: number) {
        this.sprite.frame = frame;
    }

    changeToDefault() {
        this.changeTo(0);
    }

}