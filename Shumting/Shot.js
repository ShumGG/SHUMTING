class Shot extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene,0,0,"shot");
        this.animation();
        scene.shot_group = scene.physics.add.group();
        this.SPEED_SHOT = 4;

    }
    moveShot() { //moves player shot
        this.scene.shot_group.children.each(shot =>{
            if (shot.angle == "") {
                shot.y -= this.SPEED_SHOT;
            }else {
                if (shot.angle == -135 || shot.angle == 45) {
                    shot.x += this.SPEED_SHOT * Math.cos(shot.rotation);
                    shot.y -= this.SPEED_SHOT * Math.sin(shot.rotation);
                }else {
                    shot.x -= this.SPEED_SHOT * Math.cos(shot.rotation);
                    shot.y += this.SPEED_SHOT * Math.sin(shot.rotation);
                }
            }
            if (shot.y <= 0 || shot.y >= 500) {
                this.destroyShot(shot);
            }
        },this);
    }
    animation() {
        this.scene.anims.create ({
            key: "player_shot",
            frames: this.scene.anims.generateFrameNumbers("player_shot"), 
            frameRate:20, 
            repeat: -1 
        });
        
        this.scene.anims.create({
            key: "enemy_shot",
            frames: this.scene.anims.generateFrameNumbers("enemy_shot"),
            frameRate:20,
            repeat:-1
        });

        this.scene.anims.create({
            key: "mini_shot",
            frames: this.scene.anims.generateFrameNumbers("mini_shot"),
            frameRate:10,
            repeat:-1
        });
    }
    create_enemy_spaceship_shot(enemy_spaceship) { //create enemy_spaceship shot
        let delta = new Date().getTime() - enemy_spaceship.delta_enemy_spaceship;
        if (delta >= 1500) {
            let enemy_shot;
            this.enemy_shot = this.scene.physics.add.sprite(enemy_spaceship.x + 35,enemy_spaceship.y + 35, "mini_shot");
            this.enemy_shot.positionX = this.scene.player_spaceship.x - enemy_spaceship.x;
            this.enemy_shot.positionY = this.scene.player_spaceship.y - enemy_spaceship.y;
            this.enemy_shot.angle =  Math.atan2(this.enemy_shot.positionY,this.enemy_shot.positionX) * 180 / Math.PI;
            this.enemy_shot.key = "enemy_spaceship";
            this.enemy_shot.play("mini_shot");
            this.enemy_shot.setSize(35,30);
            this.scene.enemy_shot_group.add(this.enemy_shot);
            enemy_spaceship.shots += 1;
            enemy_spaceship.delta_enemy_spaceship = new Date().getTime();
        if (enemy_spaceship.shots >= 1) {
            enemy_spaceship.create_shot_enemy_spaceship = new Date().getTime();
            enemy_spaceship.shots = 0;
            }
        }
    }
    create_enemy_spaceship2_shot(enemy_spaceship2) { //crete enemy_spaceship2 shot
        let delta = new Date().getTime() - enemy_spaceship2.delta_enemy_spaceship2;
        if (delta >= 500) {
            let enemy_shot;
            this.enemy_shot = this.scene.physics.add.sprite(enemy_spaceship2.x + 35,enemy_spaceship2.y + 80, "enemy_shot");
            this.enemy_shot.setSize(35,30);
            this.enemy_shot.play("enemy_shot");
            this.enemy_shot.key = "enemy_spaceship2";
            this.scene.enemy_shot_group2.add(this.enemy_shot);
            enemy_spaceship2.shots += 1;
            enemy_spaceship2.delta_enemy_spaceship2 = new Date().getTime();
        if (enemy_spaceship2.shots >= enemy_spaceship2.quantity_shot) {
            enemy_spaceship2.create_shot_enemy_spaceship2 = new Date().getTime();
            enemy_spaceship2.shots = 0;
            }
        }
    }
    move_enemy_shot() {
        this.scene.enemy_shot_group.children.each(enemy_spaceship_shot => { //enemy_spaceship shot
            enemy_spaceship_shot.x += 2 * Math.cos(enemy_spaceship_shot.rotation);
            enemy_spaceship_shot.y += 2 * Math.sin(enemy_spaceship_shot.rotation);
            if (enemy_spaceship_shot.x >= globalThis.config.width || enemy_spaceship_shot.x <= 0 
            || enemy_spaceship_shot.y >= globalThis.config.height || enemy_spaceship_shot.y <= 0 ) {
                this.destroyShot(enemy_spaceship_shot);
            }
       },this);

        this.scene.enemy_shot_group2.children.each(enemy_spaceship_shot2 => { //enemy_spaceship shot 2
            enemy_spaceship_shot2.y += 3;
            if (enemy_spaceship_shot2.y > globalThis.config.height) {
                this.destroyShot(enemy_spaceship_shot2);
            }
        },this);
    }
    destroyShot(shot) {
        shot.destroy();
    }
    sprint_shot(velocity) {
        this.SPEED_SHOT = velocity;
    }
    update() {
        this.moveShot();
        this.move_enemy_shot();
    }
}