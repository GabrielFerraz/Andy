declare var Blockly: any;

class Level extends Phaser.State {
    player: Player;
    observers: Observer[];
    background: Phaser.Sprite;
    floor: Phaser.Polygon;
    floorPoints: Phaser.Polygon;
    workspace: any;
    dialogBox: DialogBox;
    inDialog: boolean;
    cursor: Cursor;
    backgroundLayer: Phaser.Group;
    PlayerLayer: Phaser.Group;
    foregroundLayer: Phaser.Group;
    overlayLayer: Phaser.Group;
    cursorLayer: Phaser.Group;
    blocklyWorkspace: any;
    inventory: Inventory;

    init(inventory) {
        if (inventory) {
            this.inventory = inventory;
            return;
        }

        this.inventory = new Inventory(this);
    }

    create() {
        this.dialogBox = new DialogBox(this);
        this.backgroundLayer = this.add.group();
        this.PlayerLayer = this.add.group();
        this.foregroundLayer = this.add.group();
        this.overlayLayer = this.add.group();
        this.cursorLayer = this.add.group();
        this.observers = [];
        this.inventory.create();
    }

    update() {
        this.cursor.update();
        if (this.dialogBox.isRunning) return;
        this.input.onDown.add(this.notifyObservers, this);
        this.player.update();
    }

    notifyObservers(pointer) {

        if (this.inDialog) {
            console.log('in dialog');
            return;
        }

        if (this.observers && this.observers.length > 0) {
            for (let i = 0; i < this.observers.length; i++) {
                this.observers[i].update(pointer);
            }
        }

        this.movePlayer(pointer);
    }

    startDialog(dialogId) {
        this.inDialog = true;
        this.dialogBox.startDialog(dialogId, this.endDialog);
    }

    endDialog(context) {
        context.inDialog = false;
    }

    createCursor() {
        this.cursor = new Cursor(this);
    }

    movePlayer(pointer) {

        //if (this.floor.contains(pointer.x, pointer.y)) {
        //    this.player.setDestination(pointer);
        //    return;
        //}
        //let point = new Phaser.Point;

        //if (pointer.x >= this.floor.points[0]['x'] && pointer.x <= this.floor.points[2]['x']) {
        //    point.x = pointer.x;
        //}else if (pointer.x < this.floor.points[0]['x']) {
        //    point.x = this.floor.points[0]['x'];
        //}else if (pointer.x > this.floor.points[2]['x']) {
        //    point.x = this.floor.points[2]['x'];
        //}

        //if (pointer.y >= this.floor.points[0]['y'] && pointer.y <= this.floor.points[2]['y']) {
        //    point.y = pointer.y;
        //} else if (pointer.y < this.floor.points[0]['y']) {
        //    point.y = this.floor.points[0]['y'];
        //}else if (pointer.y > this.floor.points[2]['y']) {
        //    point.y = this.floor.points[2]['y'];
        //}
        // console.log(pointer); 
        if (this.player.static) return;
        var point, closestPoint, minDistance = 10000000, distance = 0;
        for (var i = 0; i < this.floor.points.length; i++) {
            point = this.floor.points[i];
            distance = this.game.physics.arcade.distanceToXY(pointer, point.x, point.y);
            if (distance < minDistance) {
                minDistance = distance;
                closestPoint = point;
            }
        }

        // console.log(closestPoint);        
        this.player.setDestination(closestPoint);
    }

    injectBlockly(workspace: string) {

        if (!Blockly.mainWorkspace) {
            this.workspace = Blockly.inject(document.getElementById(workspace),
                { toolbox: document.getElementById('toolbox'), trashcan: true });
        } else {
            this.workspace = Blockly.mainWorkspace;
        }
    }

    selectItem(itemName: string) {

        switch (itemName) {
            case 'subIcon':
                this.cursor.changeTo(2);
                break;
        }

    }
}