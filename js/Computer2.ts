class Computer2 extends Computer {

    stage: Phaser.Sprite;
    sub: Phaser.Sprite;
    puzzle1: any;
    puzzle2: any;
    currentPuzzle: any;
    crash: Phaser.Sound;
    isFixed: boolean;

    constructor(state: Level, x: number, y: number, key: string) {
        super(state, x, y, key, 'block2', 800);
        this.isFixed = false;
        
    }

    clickExitButton() {
        this.closeBlocklyConsole();
    }

    openBlocklyConsole() {
        //if (this.tutorial) {
        //    var tutSprite = this.state.add.sprite(0, 0, 'tutorial1', 0, this.state.foregroundLayer);
        //    this.state.dialogBox.startDialog('first-challange-tutorial', () => {
        //        tutSprite.destroy();
        //        tutSprite = this.state.add.sprite(0, 0, 'tutorial2', 0, this.state.foregroundLayer);
        //        this.state.dialogBox.startDialog('second-challange-tutorial', () => {
        //            tutSprite.destroy();
        //            this.tutorial = false;
        //            this.openBlocklyConsole();
        //        })
        //    });
        //    return;
        //}
        super.openBlocklyConsole();
    }

    closeBlocklyConsole() {
        super.closeBlocklyConsole();
    }

    executeCommands() {
        console.log('executeCommands');
        if (this.commands.length <= 0) {
            this.running = false;
            return;
        }
        this.running = true;
        var command = this.commands.shift();

        switch (command) {
            case "up":
                break;
        }

    }

    checkVar(name: string, type: string) {
        console.log("naem ",name);
        console.log("tyoe ",type);
        if (name == "altura" && type == "num") {
            console.log('sadf');
            this.isFixed = true;
        }
    }

}