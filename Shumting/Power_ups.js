class Power_ups extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene,0,0,"power_up");
        this.arraypowerUp = ["power_up","power_up1","power_up2"];
        this.create_powerUp = false;
        this.get_power_up_sound = this.scene.sound.add("get_power_up");
        this.animation();
    }
    showpowerUp() {
        if (this.create_powerUp === false) {
            this.scene.time.addEvent({ delay: 5000, callback: this.createpowerUp, callbackScope: this, repeat: 0});
            this.create_powerUp = true;
        }
        this.addCollider();
    }
    createpowerUp() {
        let positionX = Phaser.Math.Between(50,748);
        let positionY = Phaser.Math.Between(50,458);
        let power_up_type = Phaser.Math.Between(0,2);
        this.scene.power_up = this.scene.physics.add.sprite(positionX,positionY,this.arraypowerUp[power_up_type]);
        this.scene.power_up.setSize(35,35); 
        switch(power_up_type) {
            case 0:
                this.scene.power_up.play("health");
                break;
            case 1:
                this.scene.power_up.play("shield");
                break;
            case 2:
                this.scene.power_up.play("double_point");
                break;
        }
    }
    animation() {
        this.scene.anims.create( {
            key: "health",
            frames: this.scene.anims.generateFrameNumbers("power_up"),
            frameRate: 10,
            repeat: -1
        })
        this.scene.anims.create({
            key: "shield",
            frames: this.scene.anims.generateFrameNumbers("power_up1"),
            frameRate: 10,
            repeat: -1

        })
        this.scene.anims.create({
            key: "double_point",
            frames: this.scene.anims.generateFrameNumbers("power_up2"),
            frameRate: 10,
            repeat: -1,
        })
    }
    addCollider() {
        this.scene.physics.add.collider(this.scene.player_spaceship,this.scene.power_up,this.getpowerUp,null,this);
    }
    getpowerUp() {
        this.get_power_up_sound.play();
        this.scene.player_spaceship_object.setpowerUp(this.scene.power_up.texture.key);
        this.scene.power_up.destroy();
        this.create_powerUp = false;
    }
    update() {
        this.showpowerUp();
    }
}