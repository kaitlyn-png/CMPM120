class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        this.rightArmX = this.bodyX + 100;
        this.rightArmY = this.bodyY + 50;
        this.leftArmX = this.bodyX - 100;
        this.leftArmY = this.bodyY + 50;
        this.rightLegX = this.bodyX + 65;   
        this.rightLegY = this.bodyY + 105;            
        this.leftLegX = this.bodyX - 65;   
        this.leftLegY = this.bodyY + 105;
        this.eyeX = this.bodyX;
        this.eyeY = this.bodyY - 10;
        this.mouthX = this.bodyX;
        this.mouthY = this.bodyY + 40;
        this.rightHornX = this.bodyX + 70;
        this.rightHornY = this.bodyY - 60;        
        this.leftHornX = this.bodyX - 70;
        this.leftHornY = this.bodyY - 60;

        let keyA;
        let keyD;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenD.png");
        my.sprite.armRight = this.add.sprite(this.rightArmX, this.rightArmY, "monsterParts", "arm_greenB.png");
        my.sprite.armLeft = this.add.sprite(this.leftArmX, this.leftArmY, "monsterParts", "arm_greenB.png");
        my.sprite.armLeft.flipX = true;
        my.sprite.legRight = this.add.sprite(this.rightLegX, this.rightLegY, "monsterParts", "leg_greenC.png");
        my.sprite.legLeft = this.add.sprite(this.leftLegX, this.leftLegY, "monsterParts", "leg_greenC.png");
        my.sprite.legLeft.flipX = true;
        my.sprite.eye = this.add.sprite(this.eyeX, this.eyeY, "monsterParts", "eye_human_green.png");
        my.sprite.mouthOpen = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouthE.png");
        my.sprite.mouthClosed = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouth_closed_happy.png");
        my.sprite.mouthClosed.visible = false;
        my.sprite.hornRight = this.add.sprite(this.rightHornX, this.rightHornY, "monsterParts", "detail_green_horn_large.png");
        my.sprite.hornLeft = this.add.sprite(this.leftHornX, this.leftHornY, "monsterParts", "detail_green_horn_large.png");
        my.sprite.hornLeft.flipX = true;    

        this.keys = this.input.keyboard.addKeys('S, F, A, D');
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability
        if(this.keys.S.isDown){
            my.sprite.mouthOpen.visible = false;
            my.sprite.mouthClosed.visible = true;
        }
        else if(this.keys.F.isDown){            
            my.sprite.mouthOpen.visible = true;
            my.sprite.mouthClosed.visible = false;
        }
        else if(this.keys.A.isDown){
            for(const i in my.sprite){
                my.sprite[i].x -= 2;
            }
        }
        else if(this.keys.D.isDown){
            for(const i in my.sprite){
                my.sprite[i].x += 2;
            }
        }
    }

}