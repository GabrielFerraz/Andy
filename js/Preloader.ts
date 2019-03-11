class Preloader extends Phaser.State {

    preloadBar: Phaser.Sprite;

    preload() {
        this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('background', 'assets/submarine-map-small.png');
        this.load.spritesheet('runButton', 'assets/botoes-executar.png', 150, 40);
        this.load.spritesheet('exitButton', 'assets/botoes-sair.png', 150, 40);
        this.load.image('inventory', 'assets/inventory.png');
        this.load.image('dialogBox', 'assets/textbox3.png');
        this.load.image('commandTable', 'assets/lateralMesaComando.png');
        this.load.image('computer', 'assets/computer-small.png');
        this.load.image('map1', 'assets/mapa-1.png');
        this.load.image('map2', 'assets/mapa-2.png');
        this.load.image('tutorial1', 'assets/tutorial-1.png');
        this.load.image('tutorial2', 'assets/tutorial-2.png');
        this.load.image('subIcon', 'assets/sub-icon.png');
        this.load.image('closeupComputer', 'assets/close-up-computer.png');
        this.load.spritesheet('cursor', 'assets/cursor.png', 50, 50, 8);
        this.load.json('dialogs', 'assets/dialogs.json');
        this.load.spritesheet('player', 'assets/playerSprite.png', 102, 166);
        this.load.audio('crash', 'assets/Crash-sound-effect.mp3');
        this.load.image('infoRoom', 'assets/info-room.png');
        this.load.image('infoRoomDoorR', 'assets/info-room-door-right.png');
        this.load.image('infoRoomDoorL', 'assets/info-room-door-left.png');
        this.load.image('storageRoom1', 'assets/storage-room-1.png');
        this.load.image('storageRoomDoorR', 'assets/storage-room-door-right.png');
        this.load.image('storageRoomDoorL', 'assets/storage-room-door-left.png');
        this.load.image('storageRoom2', 'assets/storage-room-2.png');
        this.load.image('elevator', 'assets/Elevator.png');
        this.load.image('computer2', 'assets/computer-2.png');
        this.load.image('turnedOff', 'assets/turned-off.png');
    }

    create() {

        var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(this.startMainMenu, this);

    }

    startMainMenu() {
        console.log('slkdjflskdjf');
        this.game.state.start('InfoRoom');
    }
}