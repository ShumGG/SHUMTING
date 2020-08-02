class Player_spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene,0,0,"player_spaceship");
        scene.player_spaceship = scene.physics.add.sprite(globalThis.config.width/2-50,globalThis.config.height/2,"player_spaceship");
        scene.player_spaceship.setSize(50,50);
        scene.player_spaceship.setCollideWorldBounds(true);
        scene.keys = this.scene.input.keyboard.addKeys("W,S,A,D,SPACE,SHIFT");
        this.animation();
        this.create();
    }
    create() {
        this.SPEED = 2;
        this.BACKGROUND_SPEED = 1;
        this.life = 100;
        this.points = 0;
        this.points_string = "";
        this.shield = false;
        this.double_points = false;
        this.spacebar;
        this.enemy1 = 0;
        this.enemy2 = 0;
        this.explosive_enemy = 0;
        this.scene.lifeText = this.scene.add.text(16,16, 'Life: ' + this.life, { fontSize: '20px', fill: 'red',fontFamily: "PressStart2P-Regular"});
        this.scene.pointsTextinteger = this.scene.add.text(695,16, this.points, { fontSize: '20px', fill: 'red', fontFamily: "PressStart2P-Regular"});
        this.player_spaceship_shot = this.scene.sound.add("player_spaceship_shot");
        this.player_spaceship_hurt = this.scene.sound.add("player_spaceship_hurt");
    }
    movePlayerspaceship() {
        if(this.scene.keys.W.isDown === true) {
            this.scene.player_spaceship.angle = 0;  
            this.scene.player_spaceship.y -= this.SPEED;
            this.scene.background.tilePositionY -= this.BACKGROUND_SPEED;
        }
        if(this.scene.keys.S.isDown === true) {
            this.scene.player_spaceship.y += this.SPEED;
            this.scene.movebackground(true);
            this.scene.background.tilePositionY += this.BACKGROUND_SPEED;
        }
        if(this.scene.keys.A.isDown === true) {
            this.scene.player_spaceship.x -= this.SPEED;
            this.scene.background.tilePositionX -= this.BACKGROUND_SPEED;
        }
        if(this.scene.keys.D.isDown === true) {
            this.scene.player_spaceship.x += this.SPEED;
            this.scene.background.tilePositionX += this.BACKGROUND_SPEED;
        }
        this.moveangle();
        let delta = new Date().getTime() - this.scene.delta;
    }
    sprint() {
        if (this.scene.keys.SHIFT.isDown) {
            this.SPEED = 3;
            this.BACKGROUND_SPEED = 2;
            this.scene.shot_object.sprint_shot(5)
        }else {
            this.SPEED = 2;
            this.BACKGROUND_SPEED = 1;
            this.scene.shot_object.sprint_shot(4);
        }
    }
    moveangle() {
        if(this.scene.keys.W.isDown === true && this.scene.keys.D.isDown === true) {
            this.scene.player_spaceship.angle = 45;
        }
        else if(this.scene.keys.W.isDown === true && this.scene.keys.A.isDown === true) {
            this.scene.player_spaceship.angle = -45;
        }
        else if(this.scene.keys.A.isDown === true && this.scene.keys.S.isDown === true) {
            this.scene.player_spaceship.angle = -135;
        }
        else if(this.scene.keys.D.isDown === true && this.scene.keys.S.isDown === true) {
            this.scene.player_spaceship.angle = 135;
        }
        else {
            this.scene.player_spaceship.angle = 0;
        }
    }
    animation() {
        this.scene.anims.create ({
            key: "player_spaceship", //name of the animation
            frames: this.scene.anims.generateFrameNumbers("player_spaceship"), //takes the spritesheet of the animation 
            frameRate:20, // frames per seconds
            repeat: -1 // repeat infinite
        });
        this.scene.anims.create ({
            key: "player_spaceship_shield",
            frames: this.scene.anims.generateFrameNumbers("player_spaceship_shield"), 
            frameRate:20,
            repeat: -1
        });
        this.scene.anims.create ({
            key: "explosion",
            frames: this.scene.anims.generateFrameNumbers("explosion"), 
            frameRate:20,
            repeat: 1
        });
        this.scene.anims.create ({
            key: "player_spaceship_life",
            frames: this.scene.anims.generateFrameNumbers("player_spaceship_life"), 
            frameRate:20,
            repeat: 1
        });
        this.scene.anims.create ({
            key: "player_spaceship_double_point",
            frames: this.scene.anims.generateFrameNumbers("player_spaceship_double_point"), 
            frameRate:20,
            repeat: -1
        });
        this.scene.player_spaceship.play("player_spaceship");
    }
    damage(damage) {
        if (this.shield === false) {
            this.life -= damage;
            if (this.life <= 0) {
                this.life = 0;
                this.scene.lifeText.setText(`Dead: ${this.life}`);
                this.scene.player_spaceship.play("explosion");
                this.scene.explosive_enemy_group.children.each(explosive_enemy =>{explosive_enemy.sound.stop()});
                this.scene.player_spaceship.once("animationcomplete",()=>{this.player_spaceship.visible = false;});
                this.scene.scene.stop();
                this.scene.scene.launch("Gameover", {enemy1: this.enemy1, enemy2: this.enemy2, explosive_enemy: this.explosive_enemy});
            }else {
                this.scene.lifeText.setText(`Life: ${this.life}`);
            }
        }
    }
    getPoints(enemy_spaceship) {
        if (this.double_points === true) {
            switch(enemy_spaceship.texture.key) {
                case "enemy_spaceship":
                    this.points += 2 * enemy_spaceship.point;
                    this.enemy1++;
                    break;
                case "enemy_spaceship2":
                    this.points += 2 * enemy_spaceship.point;
                    this.enemy2++;
                    break;
                case "explosive_enemy":
                    this.points += 2 * enemy_spaceship.point;
                    this.explosive_enemy++;
                    break;
            }
        }else {
            switch(enemy_spaceship.texture.key) {
                case "enemy_spaceship":
                    this.points += enemy_spaceship.point;
                    this.enemy1++;
                    break;
                case "enemy_spaceship2":
                    this.points += enemy_spaceship.point;
                    this.enemy2++;
                    break;
                case "explosive_enemy":
                    this.points += enemy_spaceship.point;
                    this.explosive_enemy++;
                    break;  
            }
        }
        this.points_string = this.points.toString();
        this.points_string = this.points_string.padStart(5,"0"); // first parameter indicates the lenght of the string, and the second is the character to fill with to get that lenght
        this.scene.pointsTextinteger.setText(this.points_string);
    }
    setpowerUp(type_power_up) {
        switch(type_power_up) {
            case "power_up": //add life
                this.addLife();
                break;
            case "power_up1": //create shield
                this.scene.time.addEvent({delay: 500, callback: this.createShield, callbackScope: this, repeat: 10});
                this.scene.time.addEvent({delay: 6000, callback: this.destroyShield, callbackScope: this, loop: false});
                break;
            case "power_up2": //double point each type of enemy
                this.double_points = true;
                this.scene.player_spaceship.play("player_spaceship_double_point");
                this.scene.time.addEvent({delay: 6000, callback: this.defaultPoints, callbackScope: this, loop: false});
                break;
        }
    }
    addLife() {
        if (this.life < 100) {
            this.life += 10;
            this.scene.player_spaceship.play("player_spaceship_life");
            this.scene.lifeText.setText(`Life: ${this.life}`);
            this.scene.player_spaceship.once("animationcomplete", ()=>{this.scene.player_spaceship.play("player_spaceship");});
        }else {
            this.life = this.life;
        }
    }
    createShield() {
        this.shield = true;
        this.scene.player_spaceship.play("player_spaceship_shield");
    }
    destroyShield() {
        this.shield = false;
        this.scene.player_spaceship.play("player_spaceship");
    }
    defaultPoints() {
        this.double_points = false;
        this.scene.player_spaceship.play("player_spaceship");
    }
    createShot() {
        let shot = this.scene.physics.add.sprite(this.scene.player_spaceship.x + 28, this.scene.player_spaceship.y + 28,"player_shot");
        shot.angle = this.scene.player_spaceship.angle;
        shot.setSize(35,30);
        shot.play("player_shot");
        this.scene.shot_group.add(shot);
    }
    shot() {
        let delta = new Date().getTime() - this.scene.delta;
        if (this.scene.keys.SPACE.isDown) {
            if (delta >= 350) {
                this.createShot();
                this.player_spaceship_shot.play(); // shot sound
                this.scene.delta = new Date().getTime();
            }
        }
    }
    hurt() {
        this.player_spaceship_hurt.play();
    }
    getEnemiesDefeated() {
        return [this.enemy1,this.enemy2,this.explosive_enemy];
    }
    update() {
        this.movePlayerspaceship();
        this.moveangle();
        this.shot();
        this.sprint();
    }
}