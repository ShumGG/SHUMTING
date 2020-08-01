const MAX_ENEMIES = 6;

class Enemy_spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene){
        super(scene,0,0,"");
        scene.enemy_spaceship_group = scene.physics.add.group();
        scene.enemy_spaceship_group2 = scene.physics.add.group();
        scene.explosive_enemy_group = scene.physics.add.group();
        scene.enemy_shot_group = scene.physics.add.group(); 
        scene.enemy_shot_group2 = scene.physics.add.group();
        this.animation();
        this.createEnemyship();
        this.create_explosive_enemy = false;
        this.explosive_sound = this.scene.sound.add("explosion");
    }
    createEnemyship() {
        for (var i = 0 ; i < 1 ; i++) {
            let enemies1 = this.scene.physics.add.sprite(Phaser.Math.Between(0,400),0,"enemy_spaceship");
            enemies1.setRandomPosition(0,0,Phaser.Math.Between(33,310),Phaser.Math.Between(0,200));
            enemies1.delta_enemy_spaceship = new Date().getTime(); // delta time for each enemy_spaceship
            enemies1.create_shot_enemy_spaceship = new Date().getTime(); //delta time for each enemy_spaceship to create its own shot
            enemies1.shots = 0; // counter of shoots for each enemy_spaceship
            enemies1.sound = this.scene.sound.add("enemy_spaceship_shot", {volume: 0.3}); // name of the sound
            enemies1.point = 5;
            enemies1.key = "enemy_spaceship";
            enemies1.setSize(50,50); //size of collider box
            enemies1.play("enemy"); // name of the animation
            this.scene.enemy_spaceship_group.add(enemies1);
        }
        
        for (var i = 0 ; i < MAX_ENEMIES ; i++) {
            let enemies2 = this.scene.physics.add.sprite(Phaser.Math.Between(420,760),0,"enemy_spaceship2");
            enemies2.setRandomPosition(0,0,Phaser.Math.Between(33,310,),Phaser.Math.Between(0,200));
            enemies2.setSize(50,50);
            enemies2.play("enemy2");
            enemies2.delta_enemy_spaceship2 = new Date().getTime();
            enemies2.create_shot_enemy_spaceship2 = new Date().getTime(); 
            enemies2.shots = 0; 
            enemies2.sound = this.scene.sound.add("enemy_spaceship2_shot")
            enemies2.point = 8;
            enemies2.quantity_shot = Phaser.Math.Between(1,3);
            enemies2.key = "enemy_spaceship2";
            this.scene.enemy_spaceship_group2.add(enemies2);
        }
    }
    callexplosiveEnemy() {
        if (this.create_explosive_enemy === false) {
            this.scene.time.addEvent({ delay: 5000, callback: this.createexplosiveEnemy, callbackScope: this, repeat: 0});
            this.create_explosive_enemy = true;
        }
    }
    createexplosiveEnemy() {
        let origin = Phaser.Math.Between(1,4);
        let positionX;
        let positionY;
        let explosive_enemy;
        
        switch(origin) {
            case 1: //create from border top
                this.positionX = Phaser.Math.Between(0,globalThis.config.width);
                this.positionY = 2;
                this.explosive_enemy = this.scene.physics.add.sprite(this.positionX,this.positionY,"explosive_enemy");
                this.explosive_enemy.play("explosive_enemy");
                this.explosive_enemy.setSize(30,30); //size of the collider box
                this.scene.explosive_enemy_group.add(this.explosive_enemy);
                this.explosive_enemy.sound =  this.scene.sound.add("explosive_enemy");
                this.explosive_enemy.sound.play(); //explosive enemy sound
                this.explosive_enemy.point = 11;
                this.explosive_enemy.key = "explosive_enemy";
                break;
            case 2: //create from border bottom
                this.positionX = Phaser.Math.Between(0,globalThis.config.width);
                this.positionY = 470;
                this.explosive_enemy = this.scene.physics.add.sprite(this.positionX,this.positionY,"explosive_enemy");
                this.explosive_enemy.play("explosive_enemy");
                this.explosive_enemy.setSize(30,30);
                this.scene.explosive_enemy_group.add(this.explosive_enemy);
                this.explosive_enemy.sound =  this.scene.sound.add("explosive_enemy");
                this.explosive_enemy.sound.play();
                this.explosive_enemy.point = 11;
                this.explosive_enemy.key = "explosive_enemy";
                break;
            case 3: //create from border left
                this.positionX = 2;
                this.positionY = Phaser.Math.Between(70,globalThis.config.height);
                this.explosive_enemy = this.scene.physics.add.sprite(this.positionX,this.positionY,"explosive_enemy");
                this.explosive_enemy.play("explosive_enemy");
                this.explosive_enemy.setSize(30,30);
                this.scene.explosive_enemy_group.add(this.explosive_enemy);
                this.explosive_enemy.sound =  this.scene.sound.add("explosive_enemy");
                this.explosive_enemy.sound.play();
                this.explosive_enemy.point = 11;
                this.explosive_enemy.key = "explosive_enemy";
                break;
            case 4: //create from border right
                this.positionX = 770;
                this.positionY = Phaser.Math.Between(70,globalThis.config.height);
                this.explosive_enemy = this.scene.physics.add.sprite(this.positionX,this.positionY,"explosive_enemy");
                this.explosive_enemy.play("explosive_enemy");
                this.explosive_enemy.setSize(30,30);
                this.scene.explosive_enemy_group.add(this.explosive_enemy);
                this.explosive_enemy.sound =  this.scene.sound.add("explosive_enemy");
                this.explosive_enemy.sound.play();
                this.explosive_enemy.point = 11;
                this.explosive_enemy.key = "explosive_enemy";
                break;
        }
    }
    moveSpaceship_and_explosiveEnemy() {
        this.scene.enemy_spaceship_group.children.each(enemy_spaceship =>{
            enemy_spaceship.y += 3;
            this.enemy_shoot(enemy_spaceship);
            if (enemy_spaceship.y > globalThis.config.height) {
                this.resetShip(enemy_spaceship); 
            }
        },this);

        this.scene.enemy_spaceship_group2.children.each(enemy_spaceship2 =>{
            enemy_spaceship2.y += 2;
            this.enemy_shoot(enemy_spaceship2);
            if (enemy_spaceship2.y > globalThis.config.height) {
                this.resetShip(enemy_spaceship2); 
            }
        },this);

        this.scene.explosive_enemy_group.children.each(enemy_spaceship =>{
            let x = this.scene.player_spaceship.x - enemy_spaceship.x;
            let y = this.scene.player_spaceship.y - enemy_spaceship.y;
            enemy_spaceship.angle = Math.atan2(y - 30,x + 30) * 180 / Math.PI; //radians to degrees 
            enemy_spaceship.x += 4 * Math.cos(enemy_spaceship.rotation);
            enemy_spaceship.y += 4 * Math.sin(enemy_spaceship.rotation);
            let delta = new Date().getTime() - this.scene.delta_enemy;
                if (delta >= 10000) {
                    enemy_spaceship.sound.stop();
                    enemy_spaceship.destroy();
                    this.create_explosive_enemy = false;
                    this.scene.delta_enemy = new Date().getTime();
                }
        },this);
    }
    resetShip(enemy_spaceship) {
        switch(enemy_spaceship.texture.key) {
            case "enemy_spaceship":
                enemy_spaceship.y = 0;
                enemy_spaceship.x = Phaser.Math.Between(33,760);
                enemy_spaceship.delta_enemy_spaceship = new Date().getTime();
                enemy_spaceship.create_shot_enemy_spaceship = new Date().getTime();
            break;
            case "enemy_spaceship2":
                enemy_spaceship.y = 0;
                enemy_spaceship.x = Phaser.Math.Between(33,760);
                enemy_spaceship.delta_enemy_spaceship2 = new Date().getTime();
                enemy_spaceship.create_shot_enemy_spaceship2 = new Date().getTime();
            break;
        }
    }   
    destroyEnemy(enemy_spaceship) {
        switch(enemy_spaceship.texture.key) {
            case "enemy_spaceship":
                let enemy_spaceship_explosion = this.scene.add.sprite(enemy_spaceship.x,enemy_spaceship.y,"explosion");
                enemy_spaceship_explosion.play("explosion");
                enemy_spaceship_explosion.once("animationcomplete",()=>{enemy_spaceship_explosion.destroy();});  //anonymous function that will execute once the animation of explosion ends;
                this.explosive_sound.play();
                this.resetShip(enemy_spaceship);
                break;
            case "enemy_spaceship2":
                let enemy_spaceship2_explosion = this.scene.add.sprite(enemy_spaceship.x,enemy_spaceship.y);
                enemy_spaceship2_explosion.play("explosion");
                enemy_spaceship2_explosion.once("animationcomplete",()=>{enemy_spaceship2_explosion.destroy();});    
                this.explosive_sound.play();
                this.resetShip(enemy_spaceship);
                break;
            case "explosive_enemy":
                let explosive_enemy_explosion = this.scene.add.sprite(enemy_spaceship.x, enemy_spaceship.y,"explosion");
                explosive_enemy_explosion.play("explosion");
                explosive_enemy_explosion.once("animationcomplete",()=>{explosive_enemy_explosion.destroy();});
                this.explosive_sound.play();
                enemy_spaceship.destroy();
                enemy_spaceship.sound.stop(); 
                this.scene.delta_enemy = new Date().getTime();
                this.create_explosive_enemy = false;
                break;
        }
    }
    avoidOverlapping(enemy_spaceship) {
        switch(enemy_spaceship.texture.key) {
            case "enemy_spaceship":
                let reset = function(ene) {

                };
                break;
            case "enemy_spaceship2":
                this.resetShip(enemy_spaceship);
                break;
        }
    }
    getenemyDamage(enemy_spaceship) {
        switch(enemy_spaceship.key) {
            case "enemy_spaceship":
                return 10;
            break;
            case "enemy_spaceship2":
                return 10;
            break;
            case "explosive_enemy":
                return 20;
            break;
        }
    }
    enemy_shoot(enemy_spaceship) {
        switch(enemy_spaceship.texture.key) {
            case "enemy_spaceship":
                let delta_enemy_spaceship = new Date().getTime() - enemy_spaceship.create_shot_enemy_spaceship;
                if (delta_enemy_spaceship >= 1500) {
                    this.scene.shot_object.create_enemy_spaceship_shot(enemy_spaceship);
                    enemy_spaceship.sound.play(); 
                }
            break;
            case "enemy_spaceship2":
                let delta_enemy_spaceship2 = new Date().getTime() - enemy_spaceship.create_shot_enemy_spaceship2;
                if (delta_enemy_spaceship2 >= 1600) {
                    this.scene.shot_object.create_enemy_spaceship2_shot(enemy_spaceship);
                    enemy_spaceship.sound.play();
                }
            break;
        }
    }
    animation() {
        this.scene.anims.create ({
            key: "enemy",
            frames: this.scene.anims.generateFrameNumbers("enemy_spaceship"), 
            frameRate:20,
            repeat: -1 
        });
        this.scene.anims.create ({
            key: "enemy2",
            frames: this.scene.anims.generateFrameNumbers("enemy_spaceship2"), 
            frameRate:20,
            repeat: -1 
        });
        this.scene.anims.create ({
            key: "explosive_enemy",
            frames: this.scene.anims.generateFrameNumbers("explosive_enemy"), 
            frameRate:20, 
            repeat: -1 
        });
        this.scene.anims.create ({
            key: "explosion",
            frames: this.scene.anims.generateFrameNumbers("explosion"), 
            frameRate:20,
            repeat: 1
        });
    }
    update() {
        this.moveSpaceship_and_explosiveEnemy();
        this.callexplosiveEnemy();
    }
}
