class Game_scene extends Phaser.Scene {
    constructor() {
        super("Game_scene");
    }
    create() {
        this.delta = new Date().getTime();
        this.delta_enemy = new Date().getTime();
        this.delta_enemy_shot = new Date().getTime();
        this.background = this.add.tileSprite(0,0,globalThis.config.width,globalThis.config.height,"space");
        this.background.setOrigin(0,0);
        this.input.keyboard.on("keydown_ESC",this.pauseGame,this);
        
        this.power_up_object = new Power_ups(this);
        this.player_spaceship_object = new Player_spaceship(this);
        this.enemy_spaceship_object = new Enemy_spaceship(this);
        this.shot_object = new Shot(this);
        
        this.physics.add.collider(this.player_spaceship,this.enemy_spaceship_group,this.collision_player_enemy,null,this);
        this.physics.add.collider(this.player_spaceship,this.enemy_spaceship_group2,this.collision_player_enemy2,null,this);
        this.physics.add.collider(this.shot_group,this.enemy_spaceship_group,this.collision_shot_enemy,null,this);
        this.physics.add.collider(this.explosive_enemy_group,this.player_spaceship,this.collision_explosive_enemy_player,null,this);
        this.physics.add.collider(this.shot_group,this.explosive_enemy_group,this.collision_shot_explosive_enemy,null,this);
        this.physics.add.collider(this.shot_group,this.enemy_spaceship_group2,this.collision_shot_enemy2,null,this);
        this.physics.add.collider(this.enemy_spaceship_group, this.enemy_spaceship_group, this.avoid_overlapping_enemy_group,null, this);
        this.physics.add.collider(this.enemy_spaceship_group2, this.enemy_spaceship_group2, this.avoid_overlapping_enemy_group2,null, this);
        this.physics.add.collider(this.player_spaceship, this.enemy_shot_group, this.collision_player_enemy_shot_group,null, this);
        this.physics.add.collider(this.player_spaceship, this.enemy_shot_group2, this.collision_player_enemy_shot_group2,null, this);
    }
    pauseGame() {
        this.scene.pause();
        this.scene.launch("Pause");
    }
    collision_player_enemy(player_spaceship, enemy_spaceship) { //parameters tells the function the objects that will collide
        this.player_spaceship_object.damage(this.enemy_spaceship_object.getenemyDamage(enemy_spaceship));
        this.enemy_spaceship_object.destroyEnemy(enemy_spaceship);
        this.enemy_spaceship_object.resetShip(enemy_spaceship); //collision between enemy_spaceship 1 and player
    }
    collision_player_enemy2(player_spaceship, enemy_spaceship) {
        this.player_spaceship_object.damage(this.enemy_spaceship_object.getenemyDamage(enemy_spaceship));
        this.enemy_spaceship_object.destroyEnemy(enemy_spaceship);
        this.enemy_spaceship_object.resetShip(enemy_spaceship); //collsion between enemy_spaceship 2 and player
    }
    collision_explosive_enemy_player(player_spaceship,explosive_enemy) {
        this.player_spaceship_object.damage(this.enemy_spaceship_object.getenemyDamage(explosive_enemy));
        this.enemy_spaceship_object.destroyEnemy(explosive_enemy); //collision between explosive_enemy and player
    }
    collision_shot_enemy(shot_group, enemy_spaceship) {
        this.shot_object.destroyShot(shot_group); //collision between the player shot and the enemy_spaceship 1
        this.enemy_spaceship_object.destroyEnemy(enemy_spaceship);
        this.player_spaceship_object.getPoints(enemy_spaceship);
    }
    collision_shot_enemy2(shot_group, enemy_spaceship) {
        this.shot_object.destroyShot(shot_group); //collision between the players shot and the enenmy_spaceship 2
        this.enemy_spaceship_object.destroyEnemy(enemy_spaceship);
        this.player_spaceship_object.getPoints(enemy_spaceship);
    }
    collision_shot_explosive_enemy(shot_group, explosive_enemy) {
        this.shot_object.destroyShot(shot_group); //collision between the players shot and the explosive_enemy
        this.enemy_spaceship_object.destroyEnemy(explosive_enemy);
        this.player_spaceship_object.getPoints(explosive_enemy);
    }
    collision_player_enemy_shot_group(player_spaceship, enemy_shot){
        this.player_spaceship_object.hurt(); //collision between the enemy 1 shot and the player
        this.player_spaceship_object.damage(this.enemy_spaceship_object.getenemyDamage(enemy_shot));
        enemy_shot.destroy();
    }
    collision_player_enemy_shot_group2(player_spaceship, enemy_shot) {
        this.player_spaceship_object.hurt(); //collision between the enemy 2 shot and the player
        this.player_spaceship_object.damage(this.enemy_spaceship_object.getenemyDamage(enemy_shot));
        enemy_shot.destroy();
    }
    avoid_overlapping_enemy_group(enemy_spaceship,enemy_spaceship2) {
        let distance = Phaser.Math.Distance.Between(enemy_spaceship.x,enemy_spaceship.y,enemy_spaceship2.x,enemy_spaceship2.y);
        if (distance < 100) { //avoid overlapping of enemies 1
            this.enemy_spaceship_object.avoidOverlapping(enemy_spaceship);
        }
    }
    avoid_overlapping_enemy_group2(enemy_spaceship,enemy_spaceship2) {
        let distance = Phaser.Math.Distance.Between(enemy_spaceship.x,enemy_spaceship.y,enemy_spaceship2.x,enemy_spaceship2.y);
        if (distance < 100) { //avoid overlapping of enemies 2
           this.enemy_spaceship_object.avoidOverlapping(enemy_spaceship);
        }
    }
    movebackground(bool = "") {
        this.background.tilePositionY = (bool === true) ? this.background.tilePositionY += 1 : this.background.tilePositionY -= 1;
    }
    update() {
        this.player_spaceship_object.update();
        this.player_spaceship_object.shot();    
        this.enemy_spaceship_object.update();
        this.power_up_object.update();
        this.shot_object.update();
        this.movebackground();
    }
}
