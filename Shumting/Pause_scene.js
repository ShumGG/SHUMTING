class Pause_scene extends Phaser.Scene {
    constructor() {
        super("Pause");
    }
    create() {
        let positionX = globalThis.config.width/2;
        let positionY = globalThis.config.height/2;
        let width = 350;
        let height = 250;
        this.background = this.add.rectangle(positionX,positionY,width,height);
        this.background.setFillStyle(0x5F9EA0,50); //hexadecimal color (red), alpha (opacity)
        let config = {fontsize: "25px", fill: "white", fontFamily: "PressStart2P-Regular"};
        this.add.text(400,165,"PAUSED", {fontSize: config.fontsize, fill: config.fill, fontFamily: config.fontFamily}).setOrigin(0.5); 
        this.add.text(400,240,"RESUME GAME", {fontSize: config.fontsize, fill: config.fill, fontFamily: config.fontFamily}).setOrigin(0.5);
        this.add.text(400,320,"EXIT GAME", {fontSize: config.fontsize, fill: config.fill, fontFamily: config.fontFamily}).setOrigin(0.5);
        this.selector_positionX = [245,270];
        this.selector_positionY = [240,320];
        this.i = 0;
        this.selector = this.add.text(this.selector_positionX[this.i],this.selector_positionY[this.i],">",{fontSize: config.fontsize, fill: config.fill, fontFamily: config.fontFamily}).setOrigin(0.5);
        this.input.keyboard.on("keydown_W",this.goUp,this);
        this.input.keyboard.on("keydown_S",this.goDown,this);
        this.input.keyboard.on("keydown_ENTER",this.getSelectScene,this);
        this.sound_selector = this.sound.add("selector");
        this.selected = this.sound.add("selected");
    }
    goUp() {
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.W) {
            this.sound_selector.play();
            this.i -= 1;
            if (this.i < 0) {
                this.i = 1;
                this.selector.x = this.selector_positionX[this.i];
                this.selector.y = this.selector_positionY[this.i];
            }
            this.selector.x = this.selector_positionX[this.i];
            this.selector.y = this.selector_positionY[this.i];
        }
    }
    goDown() {
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.S) {
            this.sound_selector.play();
            this.i += 1;
            if (this.i > 1) {
                this.i = 0;
                this.selector.x = this.selector_positionX[this.i];
                this.selector.y = this.selector_positionY[this.i];
            }
            this.selector.x = this.selector_positionX[this.i];
            this.selector.y = this.selector_positionY[this.i];
        }
    }
    getSelectScene() {
        if (this.i === 0) {
            this.selected.play();
            this.scene.stop();
            this.scene.resume("Game_scene");
        }else {
            this.selected.play();
            this.scene.stop();
            this.scene.stop("Game_scene");
            this.scene.start("Menu_scene");
        }
    }
}
