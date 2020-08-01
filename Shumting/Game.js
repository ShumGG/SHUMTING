var config;
window.onload = function() {
    config = {
        type: Phaser.AUTO,
        width: 800,
        height: 500,
        scene: [Menu_scene,Game_scene,Pause_scene,Gameover_scene],
        physics: {
            default: 'arcade',
            arcade: {debug: false,}
        }
    }
    var game = new Phaser.Game(config);
}