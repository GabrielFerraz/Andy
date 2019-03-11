class Inventory {
    items: any[];
    sprite: Phaser.Sprite;
    state: Level;
    invGroup: Phaser.Group;


    constructor(state: Level) {
        this.state = state;
        this.items = [];
    }

    create() {
        this.invGroup = this.state.overlayLayer.add.
        this.sprite = this.state.overlayLayer.create(100, 10, 'inventory');
        this.sprite.inputEnabled = true;
        // this.sprite.events.onInputOver.add(() => { this.openInventory() }, this);
        //this.sprite.events.onInputOut.add(() => { this.closeInventory() }, this);

        // this.state.overlayLayer.add(this.invGroup);
    }

    addItem(item: string) {
        var nextPosition = this.items.length;
        console.log(item);
        var itemSprite = this.state.overlayLayer.create(130 + (60 * nextPosition), -25, item);
        itemSprite.anchor.setTo(0.5, 0.5);
        this.items.push(itemSprite);
        itemSprite.inputEnabled = true;
        itemSprite.events.onInputDown.add(() => { this.state.selectItem(itemSprite.key) }, this)
    }
}