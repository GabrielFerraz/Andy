class Computer1 extends Computer {

    stage: Phaser.Sprite;
    sub: Phaser.Sprite;
    puzzle1: any;
    puzzle2: any;
    currentPuzzle: any;
    crash: Phaser.Sound;

    constructor(state: Level, x: number, y: number, key: string) {
        super(state, x, y, key, 'block', 400);
        // Map cell types
        // R: Rock
        // P: Path
        // E: End (Next puzzle)
        // W: Win (Finish Puzzle)
        this.puzzle1 = {
            map: [
                [{ type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }],
                [{ type: 'E', offset: [3, 0] }, { type: 'P', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'P', offset: [0, -1] }, { type: 'P', offset: [0, -1] }, { type: 'P', offset: [0, 0] }],
                [{ type: 'R', offset: [0, 0] }, { type: 'P', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'P', offset: [5, 0] }, { type: 'P', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }],
                [{ type: 'R', offset: [0, 0] }, { type: 'P', offset: [3, 0] }, { type: 'P', offset: [7, 0] }, { type: 'P', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }],
                [{ type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }]
            ],
            startPosition: [1, 6],
            currentPosition: [1, 6],
            startCoords: { x: 715, y: 212 },
            sprite: 'map1'
        };
        this.puzzle2 = {
            map: [
                [{ type: 'R', offset: [0, 0] }, { type: 'P', offset: [-3, 3] }, { type: 'P', offset: [-3, 3] }, { type: 'P', offset: [0, 0] }, { type: 'P', offset: [0, -5] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }],
                [{ type: 'R', offset: [0, 0] }, { type: 'P', offset: [-2, -5] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'P', offset: [0, -5] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }],
                [{ type: 'W', offset: [0, -3] }, { type: 'P', offset: [-2, -6] }, { type: 'R', offset: [0, 0] }, { type: 'P', offset: [0, -5] }, { type: 'P', offset: [-1, 0] }, { type: 'R', offset: [0, 0] }, { type: 'P', offset: [-6, 0] }, { type: 'P', offset: [0, 0] }],
                [{ type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'P', offset: [0, -8] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'P', offset: [0, -5] }, { type: 'R', offset: [0, 0] }],
                [{ type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'P', offset: [-2, 2] }, { type: 'P', offset: [-2, 2] }, { type: 'P', offset: [-4, 2] }, { type: 'P', offset: [0, -10] }, { type: 'R', offset: [0, 0] }],
                [{ type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }, { type: 'R', offset: [0, 0] }]
            ],
            startPosition: [2, 7],
            currentPosition: [2, 7],
            startCoords: { x: 720, y: 237 },
            sprite: 'map2'
        };
        this.currentPuzzle = this.puzzle1;
        this.crash = this.state.add.audio('crash');

    }

    clickExitButton() {
        this.closeBlocklyConsole();
    }

    openBlocklyConsole() {
        if (this.tutorial) {
            var tutSprite = this.state.add.sprite(0, 0, 'tutorial1', 0, this.state.foregroundLayer);
            this.state.dialogBox.startDialog('first-challange-tutorial', () => {
                tutSprite.destroy();
                tutSprite = this.state.add.sprite(0, 0, 'tutorial2', 0, this.state.foregroundLayer);
                this.state.dialogBox.startDialog('second-challange-tutorial', () => {
                    tutSprite.destroy();
                    this.tutorial = false;
                    this.openBlocklyConsole();
                })
            });
            return;
        }
        super.openBlocklyConsole();
        this.background = this.state.add.sprite(400, 0, "closeupComputer", 0, this.state.overlayLayer);
        this.startPuzzle();
    }

    closeBlocklyConsole() {
        super.closeBlocklyConsole();
        this.endPuzzle();
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
                if (this.validPath(-1, 0)) {
                    var offsetX = this.currentPuzzle.map[this.currentPuzzle.currentPosition[0]][this.currentPuzzle.currentPosition[1]].offset[0];
                    var offsetY = this.currentPuzzle.map[this.currentPuzzle.currentPosition[0]][this.currentPuzzle.currentPosition[1]].offset[1];
                    var tween = this.state.add.tween(this.sub).to({ x: this.sub.x + offsetX, y: this.sub.y - 40 - offsetY }, 400, Phaser.Easing.Linear.None, false);
                    tween.onComplete.add(function () { this.executeCommands() }, this);
                    tween.start();
                }
                break;
            case "down":
                if (this.validPath(1, 0)) {
                    var offsetX = this.currentPuzzle.map[this.currentPuzzle.currentPosition[0]][this.currentPuzzle.currentPosition[1]].offset[0];
                    var offsetY = this.currentPuzzle.map[this.currentPuzzle.currentPosition[0]][this.currentPuzzle.currentPosition[1]].offset[1];
                    var tween = this.state.add.tween(this.sub).to({ x: this.sub.x + offsetX, y: this.sub.y + 40 + offsetY }, 400, Phaser.Easing.Linear.None, false);
                    tween.onComplete.add(function () { this.executeCommands() }, this);
                    tween.start();
                }
                break;
            case "left":
                if (this.validPath(0, -1)) {
                    var offsetX = this.currentPuzzle.map[this.currentPuzzle.currentPosition[0]][this.currentPuzzle.currentPosition[1]].offset[0];
                    var offsetY = this.currentPuzzle.map[this.currentPuzzle.currentPosition[0]][this.currentPuzzle.currentPosition[1]].offset[1];
                    console.log(this.currentPuzzle.map[this.currentPuzzle.currentPosition[0]][this.currentPuzzle.currentPosition[1]].offset);
                    var tween = this.state.add.tween(this.sub).to({ x: this.sub.x - 40 - offsetX, y: this.sub.y + offsetY }, 400, Phaser.Easing.Linear.None, false);
                    tween.onComplete.add(function () { this.executeCommands() }, this);
                    tween.start();
                }
                break;
            case "right":
                if (this.validPath(0, 1)) {
                    var offsetX = this.currentPuzzle.map[this.currentPuzzle.currentPosition[0]][this.currentPuzzle.currentPosition[1]].offset[0];
                    var offsetY = this.currentPuzzle.map[this.currentPuzzle.currentPosition[0]][this.currentPuzzle.currentPosition[1]].offset[1];
                    var tween = this.state.add.tween(this.sub).to({ x: this.sub.x + 40 + offsetX, y: this.sub.y + offsetY }, 400, Phaser.Easing.Linear.None, false);
                    tween.onComplete.add(function () { this.executeCommands() }, this);
                    tween.start();
                }
                break;
            case "next":
                this.currentPuzzle = this.puzzle2;
                this.endPuzzle();
                this.startPuzzle();
                if (Blockly.mainWorkspace !== null) {
                    Blockly.mainWorkspace.clear();
                }
                break;
            case "win":
                this.closeBlocklyConsole();
                this.state.dialogBox.startDialog('end-first-challange', () => {
                    this.state.game.state.start('InfoRoom');
                })
                break;
        }

    }

    validPath(linha: number, coluna: number) {
        var type: string;

        if (!this.currentPuzzle.map[this.currentPuzzle.currentPosition[0] + linha][this.currentPuzzle.currentPosition[1] + coluna]) {
            type = "R";
            console.log('não existe');
        } else {
            type = this.currentPuzzle.map[this.currentPuzzle.currentPosition[0] + linha][this.currentPuzzle.currentPosition[1] + coluna].type;

            console.log('existe');
        }
        console.log('current position', this.currentPuzzle);

        switch (type) {
            case "R":
                this.crash.play();
                this.sub.position.set(this.currentPuzzle.startCoords.x, this.currentPuzzle.startCoords.y);
                this.currentPuzzle.currentPosition[0] = this.currentPuzzle.startPosition[0];
                this.currentPuzzle.currentPosition[1] = this.currentPuzzle.startPosition[1];
                this.running = false;
                this.commands = [];
                return false;
            case "E":
                this.addCommand("next");
                return true;
            case "W":
                this.addCommand("win");
                return true;
            default:
                this.currentPuzzle.currentPosition[0] += linha;
                this.currentPuzzle.currentPosition[1] += coluna;
                return true;
        }
    }

    startPuzzle() {
        this.stage = this.state.add.sprite(460, 170, this.currentPuzzle.sprite, 0, this.state.overlayLayer);
        this.sub = this.state.add.sprite(this.currentPuzzle.startCoords.x, this.currentPuzzle.startCoords.y, "subIcon", 0, this.state.overlayLayer); //715, 212

    }

    endPuzzle() {
        if (this.stage) this.stage.destroy();
        if (this.sub) this.sub.destroy();
        this.currentPuzzle.currentPosition[0] = this.currentPuzzle.startPosition[0];
        this.currentPuzzle.currentPosition[1] = this.currentPuzzle.startPosition[1];
        this.commands = [];
        this.running = false;
    }

}