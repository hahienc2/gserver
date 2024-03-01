// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        currentAnimation : "run",
        characterright : true,
        runSpeed : 0.3,
        diemdung    : 90,
        damage : 10,
        hp:1000,
        speed : 100,
        _maxhp : 1000,
        label: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.animation = this.node.getChildByName("animation");

     },

    start () {
        glbvar.thisnode = this;
        this.animation = this.node.getChildByName("animation");

    },

     update (dt) {
        if(this.node.x < -1*this.diemdung) {
            this.node.x += this.runSpeed;
            this.characterright = false;
            this.walkAnimation();    

        }else{
            if(this.node.x >= - 1*this.diemdung && this.characterright == false) {
                this.attackAnimation();
                
            }
        }

        if(this.node.x > 1*this.diemdung) {
            this.node.x -= this.runSpeed;
            this.characterright = true;
            this.walkAnimation();
        }else{
          if(this.node.x <= 1*this.diemdung && this.characterright == true) {
                this.attackAnimation();
            }
        }

        this.updatelabel();
     },
     updatelabel(){
        this.label.string = "HP : " + this.hp + "Speed : "+ this.speed + "Damage : " + this.damage;
     },
     walkAnimation() {
        let animationClipRun = this.animation.getComponent(cc.Animation).currentClip;
        if(animationClipRun == null || animationClipRun.name != "sword_walk") {
            this.animation.getComponent(cc.Animation).play("sword_walk");
        }
     },
     attackAnimation() {
        let animationClipRun = this.animation.getComponent(cc.Animation).currentClip;
        if(animationClipRun == null || animationClipRun.name != "sword_attack") {
            this.animation.getComponent(cc.Animation).play("sword_attack");
        }
     },
     setAttackSpeed(){
        var attackanimation = this.animation.getComponent(cc.Animation).play("sword_attack");
        attackanimation.speed = 0.1 + 0.01;

     }
     
});
