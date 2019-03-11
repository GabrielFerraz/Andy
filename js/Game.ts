class Game extends Phaser.Game {

    inventory: Inventory;

    constructor() {
        super(800, 600, Phaser.AUTO, 'game', null);

        this.state.add('Boot', Boot, false);
        this.state.add('Preloader', Preloader, false);
        this.state.add('Level1', Level1, false);
        this.state.add('Level2', Level2, false);
        this.state.add('InfoRoom', InfoRoom, false);
        this.state.add('StorageRoom1', StorageRoom1, false);

        this.state.start('Boot');
    }
}