class Level1 extends Level {

    create() {
        super.create();
        super.injectBlockly('blockly');
        //this.background = this.add.sprite(0, -150, 'background');
        this.background = this.backgroundLayer.create(0, -150, 'background');
        this.observers.push(new Computer1(this, 300, 293, 'computer'));
        
        this.player = new Player(this.game, 450, 380);
        this.PlayerLayer.add(this.player);
        this.floor = new Phaser.Polygon([70, 380,
            750, 380,
            750, 381,
            70, 381]);
        this.floorPoints = new Phaser.Polygon([450, 380,
            750, 380,
            70, 380]);
        var string = '<xml>' +
            '<block type="cima"></block>' +
            '<block type="baixo"></block>' +
            '<block type="direita"></block>' +
            '<block type="esquerda"></block>' +
            '</xml>';
        Blockly.updateToolbox(string);
        //this.add.sprite(33, 364, 'commandTable');
        super.createCursor();
        // this.dialogBox.startDialog('introduction', () => {
        //     this.camera.shake(0.05, 500);
        //     this.dialogBox.startDialog('first-challange', () => { });
        // });
    }

    update() {
        super.update();
    }
}