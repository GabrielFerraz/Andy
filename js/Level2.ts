class Level2 extends Level {

    create() {
        super.create();
        this.background = this.add.sprite(0, -150, 'background');
        this.player = new Player(this.game, 450, 380);

        super.createCursor();
        
    }

    update() {
        super.update();
    }
}