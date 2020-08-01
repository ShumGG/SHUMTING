class Gameover_scene extends Phaser.Scene {
    constructor() {
        super("Gameover");
    }
    preload() {
        this.load.spritesheet("enemy_spaceship","./Shumting/img/enemy_spaceship.png",{frameWidth:64,frameHight:64});
        this.load.spritesheet("enemy_spaceship2","./Shumting/img/enemy_spaceship2.png",{frameWidth:64,frameHight:64});
        this.load.spritesheet("explosive_enemy","./Shumting/img/explosive_enemy.png",{frameWidth:64,frameHight:64});
    }
    create(data) {
        let positionX = globalThis.config.width/2;
        let positionY = globalThis.config.height/2;
        let width = 500;
        let height = 350;
        this.background = this.add.rectangle(positionX,positionY,width,height);
        this.background.setFillStyle(0x5F9EA0,50); //hexadecimal color (red), alpha (opacity)
        this.add.text(400,120,"GAME OVER", { fontSize:"25px", fill:"red", fontFamily: "PressStart2P-Regular"}).setOrigin(0.5); 
        this.add.text(300,385,"RESTART", { fontSize:"20px", fill:"white", fontFamily: "PressStart2P-Regular"}).setOrigin(0.5);
        this.add.text(530,385,"EXIT", {fontSize:"20px", fill:"white", fontFamily: "PressStart2P-Regular"}).setOrigin(0.5);
        this.selector_positionX = [215,475];
        this.selector_positionY = 385;
        this.i = 0;
        this.selector = this.add.text(this.selector_positionX[this.i],this.selector_positionY,">",{fontSize:"20px", fontFamily: "PressStart2P-Regular"}).setOrigin(0.5);
        this.sound_selector = this.sound.add("selector");
        this.selected = this.sound.add("selected");
        this.input.keyboard.on("keydown_A",this.goleft,this);
        this.input.keyboard.on("keydown_D",this.goright,this);
        this.input.keyboard.on("keydown_ENTER",this.getSelectScene,this);
        this.score(data);
    }
    goleft() {
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.A) {
            this.sound_selector.play();
            this.i -=1;
            if (this.i < 0) {
                this.i = 1;
                this.selector.x = this.selector_positionX[this.i];
            }else {
                this.i = 0;
                this.selector.x = this.selector_positionX[this.i];
            }
        }
    }
    goright() {
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.D) {
            this.sound_selector.play();
            this.i += 1;
            if (this.i > 1) {
                this.i = 0;
                this.selector.x = this.selector_positionX[this.i];
            }else {
                this.i = 1;
                this.selector.x = this.selector_positionX[this.i];
            }
        }
    }
    getSelectScene() {
        if (this.i === 0) {
            this.selected.play();
            this.scene.stop();
            this.scene.start("Game_scene");
        }else {
            this.selected.play();
            this.scene.stop();
            this.scene.stop("Game_scene");
            this.scene.start("Menu_scene");
        }
    }
    animation() {
        this.anims.create ({
            key: "enemy",
            frames: this.anims.generateFrameNumbers("enemy_spaceship"), 
            frameRate:20,
            repeat: -1 
        });
        this.scene.anims.create ({
            key: "enemy2",
            frames: this.anims.generateFrameNumbers("enemy_spaceship2"), 
            frameRate:20,
            repeat: -1 
        });
        this.anims.create ({
            key: "explosive_enemy",
            frames: this.anims.generateFrameNumbers("explosive_enemy"), 
            frameRate:20, 
            repeat: -1 
        });
    }
    score(data) {
        let enemy = this.add.sprite(310,190,"enemy_spaceship",);
        let enemy2 = this.add.sprite(310,260,"enemy_spaceship2",);
        let explosive_enemy = this.add.sprite(310,330,"explosive_enemy",);
        enemy.play("enemy");
        enemy2.play("enemy2");
        explosive_enemy.play("explosive_enemy");
        let config = {fontsize: "30px", fill: "red", fontFamily: "PressStart2P-Regular"};
        let enemy_quantity = this.add.text(400,190,"X", {fontSize: config.fontsize, fill: config.fill, fontFamily: config.fontFamily}).setOrigin(0.5);
        let enemy2_quantity = this.add.text(400,260,"X", {fontSize: config.fontsize, fill: config.fill, fontFamily: config.fontFamily}).setOrigin(0.5);
        let explosive_enemy_quantity = this.add.text(400,330,"X", {fontSize: config.fontsize, fill: config.fill, fontFamily: config.fontFamily}).setOrigin(0.5);
        let data_enemy = this.add.text(500,190,data.enemy1, {fontSize: config.fontsize, fill: config.fill, fontFamily: config.fontFamily}).setOrigin(0.5);
        let data_enemy2 = this.add.text(500,260,data.enemy2, {fontSize: config.fontsize, fill: config.fill, fontFamily: config.fontFamily}).setOrigin(0.5);
        let data_explosive_enemy = this.add.text(500,330,data.explosive_enemy, {fontSize: config.fontsize, fill: config.fill, fontFamily: config.fontFamily}).setOrigin(0.5);
    }
}
