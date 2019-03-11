class Computer extends Observer {

    graphics: Phaser.Graphics;
    graphicsWidth: number;
    run: Phaser.Button;
    exit: Phaser.Button;
    background: Phaser.Sprite;
    commands: string[];
    running: boolean;
    tutorial: boolean;
    workspaceId: string;
    active: boolean;

    constructor(state: Level, x: number, y: number, key: string, workspace: string, width: number) {
        super(state, x, y, key);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputOver.add(function () { this.state.cursor.changeTo(6); }, this);
        this.sprite.events.onInputOut.add(function () { this.state.cursor.changeToDefault(); }, this);
        this.commands = [];
        this.running = false;
        this.tutorial = true;
        this.workspaceId = workspace;
        this.graphicsWidth = width;
        this.active = false;
    }

    update(pointer) {

        if (this.isClickInArea(pointer)) {
            this.openBlocklyConsole();
            this.state.inDialog = true;
        }
    }

    clickRunButton() {
        if (this.running) return console.log('is running');;
        var code = Blockly.JavaScript.workspaceToCode(this.state.workspace);
        console.log(code);
        try {
            eval(code);
        } catch (e) {
            console.log(e);
        } finally {
            this.executeCommands();
        }
    }

    clickExitButton() {
        this.closeBlocklyConsole();
    }

    openBlocklyConsole() {
        this.graphics = this.state.add.graphics(0, 0);
        this.state.overlayLayer.add(this.graphics);
        this.graphics.lineStyle(0);
        this.graphics.beginFill(0xFFFFFF);
        this.graphics.drawRect(0, 550, this.graphicsWidth, 50);
        this.graphics.endFill();
        this.run = this.state.add.button(33, 555, "runButton", this.clickRunButton, this, 2, 1, 0, 0, this.state.overlayLayer);
        this.exit = this.state.add.button(216, 555, "exitButton", this.clickExitButton, this, 2, 1, 0, 0, this.state.overlayLayer);
        document.getElementById(this.workspaceId).style.zIndex = '9999';
        document.getElementById("game").style.zIndex = '2';
        this.state.cursor.changeTo(6);
        this.state.game.canvas.style.cursor = 'auto';
        this.active = true;
    }

    closeBlocklyConsole() {
        this.graphics.destroy();
        this.run.destroy();
        this.exit.destroy();
        document.getElementById(this.workspaceId).style.zIndex = '-1';
        document.getElementById("game").style.zIndex = '9999';
        this.state.game.canvas.style.cursor = 'inherit';
        if (this.background) {
            this.background.destroy();
        }
        this.active = false;
        this.state.inDialog = false;
        this.state.cursor.changeToDefault();
    }

    addCommand(command: string) {
        this.commands.push(command);
    }

    executeCommands() {
    }

}