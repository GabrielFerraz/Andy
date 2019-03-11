class InfoRoom extends Level {

    whily: Phaser.Sprite;

    create() {
        super.create();
        this.background = this.add.sprite(0, 0, 'infoRoom', 0, this.backgroundLayer);
        this.player = new Player(this.game, 537, 424);
        this.PlayerLayer.add(this.player);
        this.whily = this.backgroundLayer.create(329, 333, 'turnedOff');
        this.foregroundLayer.create(566, 218, 'infoRoomDoorR');
        this.foregroundLayer.create(110, 235, 'infoRoomDoorL');
        this.floor = new Phaser.Polygon([537, 424, 344, 457, 267, 440, 620, 424, 200, 440]);
        super.createCursor();

    }

    update() {
        super.update();

        if (this.player.x == 200 && this.player.y == 440) {
            this.game.state.start('StorageRoom1', false);
        }
    }
}