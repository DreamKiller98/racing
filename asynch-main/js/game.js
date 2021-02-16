class Game{
    constructor(){

    }

    getstate(){
    var gameStateref=database.ref("gameState")
    gameStateref.on("value",function(data){
        gameState=data.val()
    })
    }

update(state){
    database.ref("/").update({
        gameState:state
    })
}

async start(){
   if(gameState===0){
    player=new Player();
    var playercountref=await database.ref("playerCount").once("value")
    if(playercountref.exists()){
    playerCount=playercountref.val()
    player.getCount()

    }
    form=new Form()
    form.display()
   } 
   car1= createSprite(100,200)
   car2= createSprite(300,200)
   car3= createSprite(500,200)
   car4= createSprite(700,200)

   car1.addImage(carimg1)
   car2.addImage(carimg2)
   car3.addImage(carimg3)
   car4.addImage(carimg4)
   cars = [car1,car2,car3,car4]
}

play(){
    form.hide()
    text("gamestart",120,100)
    Player.getPlayerInfo()
    if(allPlayers !== undefined){
       background("brown")
        image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5)

       var index = 0 
       var x=175
       var y
        for(var plr in allPlayers){
           index=index+1
           x=x+200
           y=displayHeight-allPlayers[plr].distance
           cars[index-1].x=x
           cars[index-1].y=y

           if(index === player.index){
               fill("neon")
             //  ellipse(x,y,80,80);
            // text(player.name,x,y+60)
               cars[index-1].shapeColor = "red";
               camera.position.x = displayWidth/2;
               camera.position.y = cars[index-1].y;
           }

            textAlign(CENTER)
           text(allPlayers[plr].name , cars[index-1].x , cars[index-1].y +70)
        }
    }

    if(keyIsDown(UP_ARROW)&& player.index !== null){
        player.distance +=50;
        player.update();
    }

    if(player.distance > 2000){
        gameState = 2
    }
    drawSprites();
}


end(){
camera.position.x = 0 ;
camera.position.y = 0 ;
text("GAMEOVER",-100,20)
console.log("game over")
}
}


//