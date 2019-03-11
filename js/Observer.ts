class Observer {

    sprite: Phaser.Sprite;
    state: Level;
    area: Phaser.Rectangle;

    constructor(state: Level, x: number, y: number, key: string) {
        //this.sprite = state.add.sprite(x, y, key);
        this.sprite = state.backgroundLayer.create(x, y, key);
        this.sprite.anchor.setTo(0.5, 0.5);
        var widthOffset = this.sprite.width / 2;
        var heightOffset = this.sprite.height / 2;
        this.area = new Phaser.Rectangle(x - widthOffset, y - heightOffset, this.sprite.width, this.sprite.height);
        this.state = state;
    }

    update(pointer, cb?: Function) {

    }

    isClickInArea(pointer) {
        return (this.state.game.physics.arcade.distanceBetween(this.sprite, this.state.player) < 200) && this.area.contains(pointer.x, pointer.y);
    }
}