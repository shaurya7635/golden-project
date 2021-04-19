var Rival, wall, spikes, lava, Goku, Platform,platform1,platform2,platform3,platform4,platform5,blacked,Platform6;
 var RivalImg, WallImg, LavaImg, GokuImg,bgImg,PlatformImg,SpikesImg;
 var WallGroup, Damage,SpikesGroup;
 var GokuCrouch,gamestate;
 function preload() {
       RivalImg = loadImage("../tick-tock-t-main/g/Rival.png");
       WallImg = loadImage("../tick-tock-t-main/g/Wall.png");
       GokuStand = loadImage("../tick-tock-t-main/g/Goku.png");
       
       bgImg = loadImage("../tick-tock-t-main/g/bg.png");
       PlatformImg = loadImage("../tick-tock-t-main/g/pla.png")
       GokuCrouch = loadImage("../tick-tock-t-main/g/Goku crouching.png");
       LavaImg = loadImage("../tick-tock-t-main/g/Lava.png")
       SpikesImg = loadImage("../tick-tock-t-main/g/Spikes.png")

     } 
function setup() {
     createCanvas(1300,550) 
     gamestate = 0;
     

     
     fill("black")

     

     WallGroup = new Group()
     SpikesGroup = new Group()
     lavaGroup = new Group()

     

     Platform = createSprite(0,0,10,10)
     Platform.addImage("Plat",PlatformImg)

     platform1 = createSprite(500,0,10,10)
     platform1.addImage("plat",PlatformImg)

     platform2 = createSprite(1000,0,10,10)
     platform2.addImage("plat2",PlatformImg)

     platform3 = createSprite(0,550,10,10)
     platform3.addImage("plat3",PlatformImg)

     platform4 = createSprite(500,550,10,10)
     platform4.addImage("plat4", PlatformImg)
     
     platform5 = createSprite(1000,550,10,10)
     platform5.addImage("plat5", PlatformImg)

     Platform6 = createSprite(1500,0,10,10)
     Platform6.addImage("Plat",PlatformImg)
     

     Goku = createSprite(100,200,10,10)
     Goku.addAnimation("Imggoku",GokuStand)
     Goku.scale = 0.3
     Goku.addAnimation("crouch",GokuCrouch);

    // blacked = createSprite(0,0,1300,500)
    // blacked.scale = 15.0


     Damage = 100
     gamestate = 0;
      } 
 function draw() { 
    
    Goku.visible = false
   
    background(bgImg)
     if(gamestate === 0){
         fill("red")
         textSize(20)
         text("RULES OF THE GAME",100,100)
         text("PRESS V TO START",1000,400)
         if(keyDown("v")||keyDown("V")){
             gamestate = 1
         }
         
     }
     if(gamestate === 1){
         Goku.visible = true

    
      
    
     spawnWall();
     spawnSpikes();
     PlayerControl();
     spawnLava();
     if(Goku.isTouching(WallGroup)){
         Damage = Damage - 5
         WallGroup.destroyEach()
         background("red")
     }
     if(Goku.isTouching(SpikesGroup)) {
        SpikesGroup.destroyEach()
        Damage = Damage - 5
    background("red")}
    if(Goku.isTouching(lavaGroup)){
        Damage = Damage - 10
        background("red")
        lavaGroup.destroyEach();
        
    }

      
      
      
      if(Damage <= 0){
          gamestate = 2
      }
      if(Goku.position.x >3000){
          gamestate = 3
      }
    }
    if(gamestate === 2){
        fill("blue")
        textSize(30)
        text("game over",600,250)
    }
    if(gamestate === 3){
        fill("blue")
        textSize(30)
        text("Game Won",600,250)
    }
     drawSprites();
     fill("white")
     textSize(20)
     text("Damage ="+Damage,Goku.x,50)
     camera.position.x =Goku.x +500
     camera.position.y =  displayHeight/2.75;
 }
     

         
         
function spawnWall(){
     if(frameCount%80 === 0){
     x = Math.round(random(200,2550))
    
    wall = createSprite(x,200,300,50)
    wall.lifetime =  60
    wall.addImage("addWall",WallImg)
    wall.scale = 1.4
    wall.debug = true
    WallGroup.add(wall);
    wall.setCollider("rectangle",0,0,30,120)
    }
}

function PlayerControl(){
    Goku.changeAnimation("Imggoku", GokuStand)
    Goku.scale = 0.3
   // Goku.removeAnimation("crouch", GokuCrouch)
    if(keyDown("d")||keyDown("D") ){
        Goku.x = Goku.x+10
    }

    if(keyDown("a")||keyDown("A")) {
        Goku.x = Goku.x-10
    }

    if(keyDown("space")){ 
         Goku.velocityY = -10; }
    Goku.velocityY = Goku.velocityY+0.5

    if(keyDown("c")||keyDown("C")){
        Goku.changeAnimation("crouch", GokuCrouch)
        Goku.scale = 0.8}
    Goku.collide(platform3)
    Goku.collide(platform4)
    Goku.collide(platform5)
}

function spawnSpikes(){

    if (frameCount%80 === 0) {
        x = Math.round(random(300,2550))
    spikes = createSprite(x,500,10,10)
    spikes.lifetime =  60
    spikes.addImage("addSpikes",SpikesImg)
    spikes.scale = 1.0
    SpikesGroup.add(spikes);
    }
    
}

function spawnLava(){
    if (frameCount%80 === 0) {
        x = Math.round(random(200,500))
        lava = createSprite(x,500, 10,10)
        lava.lifetime = 50
        lava.addImage("addLava", LavaImg)
        lavaGroup.add(lava)
        lava.scale = 0.8
    }
}