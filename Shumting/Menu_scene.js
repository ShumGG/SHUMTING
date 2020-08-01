class Menu_scene extends Phaser.Scene {
    constructor() {
        super("Menu_scene");  //constructor gives name to scene
    }
    preload() {
        this.load.image("space","./Shumting/img/space.png");
        this.load.spritesheet("power_up","./Shumting/img/power_up.png",{frameWidth:64,frameHight:64});
        this.load.spritesheet("power_up1","./Shumting/img/power_up1.png",{frameWidth:64,frameHight:64});
        this.load.spritesheet("power_up2","./Shumting/img/power_up2.png",{frameWidth:64,frameHight:64});
        this.load.spritesheet("player_spaceship","./Shumting/img/player_spaceship.png",{frameWidth:64,frameHight:64});
        this.load.spritesheet("player_spaceship_life","./Shumting/img/player_spaceship_life.png",{frameWidth:64,frameHight:64});
        this.load.spritesheet("player_spaceship_shield","./Shumting/img/player_spaceship_shield.png",{frameWidth:64,frameHight:64});
        this.load.spritesheet("player_spaceship_double_point","./Shumting/img/player_spaceship_double_point.png",{frameWidth:64,frameHight:64});
        this.load.spritesheet("player_shot","./Shumting/img/player_shot.png",{frameWidth:64,frameHight:64});
        this.load.spritesheet("enemy_spaceship","./Shumting/img/enemy_spaceship1.png",{frameWidth:64,frameHight:64});
        this.load.spritesheet("enemy_spaceship2","./Shumting/img/enemy_spaceship2.png",{frameWidth:64,frameHight:64});
        this.load.spritesheet("explosive_enemy","./Shumting/img/explosive_enemy.png",{frameWidth:64,frameHight:64});
        this.load.spritesheet("enemy_shot","./Shumting/img/enemy_shot.png",{frameWidth:64,frameHight:64});
        this.load.spritesheet("mini_shot","./Shumting/img/mini_shot.png",{frameWidth:64,frameHight:64});
        this.load.spritesheet("explosion","./Shumting/img/explosion.png",{frameWidth:64,frameHight:64,Scale:100});
        this.load.audio("player_spaceship_shot",["./Shumting/sounds/player_spaceship_shot.mp3","./Shumting/sounds/player_spaceship_shot.ogg"]);
        this.load.audio("explosive_enemy",["./Shumting/sounds/explosive_enemy.mp3","./Shumting/sounds/explosive_enemy.ogg"]);
        this.load.audio("enemy_spaceship_shot",["./Shumting/sounds/enemy_spaceship_shot.mp3","./Shumting/sounds/enemy_spaceship_shot.ogg"]);
        this.load.audio("enemy_spaceship2_shot",["./Shumting/sounds/enemy_spaceship2_shot.mp3","./Shumting/sounds/enemy_spaceship2_shot.ogg"]);
        this.load.audio("selector",["./Shumting/sounds/selector.mp3","./Shumting/sounds/selector.ogg"]);
        this.load.audio("selected",["./Shumting/sounds/selected.mp3","./Shumting/sounds/selected.ogg"]);
        this.load.audio("explosion",["./Shumting/sounds/explosion.mp3","./Shumting/sounds/explosion.ogg"]);
        this.load.audio("get_power_up",["./Shumting/sounds/get_power_up.mp3","./Shumting/sounds/get_power_up.ogg"]);
        this.load.audio("player_spaceship_hurt",["./Shumting/sounds/player_spaceship_hurt.mp3","./Shumting/sounds/player_spaceship_hurt.ogg"]);
    }
    create() {
        this.add.text(globalThis.config.width/2,globalThis.config.height/2 - 50,"SHUMTING", {fontFamily: 'PressStart2P-Regular', fontSize:"50px"}).setOrigin(0.5);
        this.add.text(globalThis.config.width/2,globalThis.config.height/2 + 50,"PLAY", {fontFamily:"PressStart2P-Regular",fontSize:"40px",fill:"yellow"}).setOrigin(0.5),
        this.selector = this.add.text(globalThis.config.width/2 - 100,globalThis.config.height/2 + 50, ">", {fontSize:"40px", fontFamily: "PressStart2P-Regular"}).setOrigin(0.5);
        this.input.keyboard.on("keydown_ENTER",this.playGame,this);
        this.selected = this.sound.add("selected");
    }    
    playGame() {
        this.selected.play();
        this.scene.start("Game_scene");
    }
}