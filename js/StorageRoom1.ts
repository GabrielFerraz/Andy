class StorageRoom1 extends Level {

    elevator: Phaser.Sprite;
    computer: Computer2;
    inFrontElevator: boolean;
    isUp: boolean;

    create() {
        super.create();
        console.log('lskdjfldskj');
        super.injectBlockly('blockly2');
        this.background = this.add.sprite(0, 0, 'storageRoom1', 0, this.backgroundLayer);
        this.computer = new Computer2(this, 607, 360, 'computer2')
        this.observers.push(this.computer);
        this.player = new Player(this.game, 702, 513);
        this.PlayerLayer.add(this.player);
        this.floor = new Phaser.Polygon([702, 513, 599, 513, 595, 494, 424, 553, 202, 526, 100, 526, 490, 465]);
        super.createCursor();
        this.elevator = this.backgroundLayer.create(439, 380, 'elevator');
        this.inFrontElevator = true;
        this.elevator.inputEnabled = true;
        this.isUp = false;

        var string = '<xml>' +
            '<block type="s2_var_declaration"></block>' +
            '</xml>';
        Blockly.updateToolbox(string);
        string = '<xml> ' +
            '<block type="s2_func_1" id="~CTKD5W{gvz46}~scp{T" x="180" y="80">' +
            '<next>' +
            '<block type="s2_func_2" id=";A}F+d=MMBV416I+ZG4e"></block>' +
            '</next>' +
            '</block>' +
            '</xml>';
        var xml = Blockly.Xml.textToDom(string);
        Blockly.Xml.domToWorkspace(this.workspace, xml);

        this.elevator.events.onInputOver.add(function () { this.cursor.changeTo(6); }, this);
        this.elevator.events.onInputOut.add(function () { this.cursor.changeToDefault(); }, this);
        this.elevator.events.onInputDown.add(() => {
            console.log(this.player.position);
            this.inventory.addItem('subIcon');
            if ((this.player.x !== 490 && this.player.y !== 465) || !this.computer.isFixed) return;
            var elevatorTween, playerTween;
            if (this.isUp) {
                elevatorTween = this.add.tween(this.elevator).to({ y: this.elevator.y + 150 }, 1000, Phaser.Easing.Linear.None, false);
                playerTween = this.add.tween(this.player).to({ y: this.player.y + 150 }, 1000, Phaser.Easing.Linear.None, false);
                playerTween.onComplete.add(() => { this.isUp = false; this.player.static = false });

            } else {
                this.player.static = true;
                elevatorTween = this.add.tween(this.elevator).to({ y: this.elevator.y - 150 }, 1000, Phaser.Easing.Linear.None, false);
                playerTween = this.add.tween(this.player).to({ y: this.player.y - 150 }, 1000, Phaser.Easing.Linear.None, false);
                playerTween.onComplete.add(() => { this.isUp = true; });
            }
            elevatorTween.start();
            playerTween.start();
        }, this);

        this.foregroundLayer.create(666, 302, "storageRoomDoorR");
        this.foregroundLayer.create(16, 321, "storageRoomDoorL");


    }

    update() {
        super.update();

        if (this.player.y <= 490 && this.inFrontElevator) {
            this.backgroundLayer.remove(this.elevator);
            this.foregroundLayer.add(this.elevator);
            this.inFrontElevator = false;
        }
        if (this.player.y >= 490 && !this.inFrontElevator) {
            this.foregroundLayer.remove(this.elevator);
            this.backgroundLayer.add(this.elevator);
            this.inFrontElevator = true;
        }
    }
}