
//VARIABLES GLOBALES
var tRexSprite, groundSprite, groundImg, invisibleGroundSprite, cloudSprite, gameOverSprite, restartSprite, enemySprite, craneoSprite;         //Sprites                                          
var snack1Sprite, snack2Sprite, snack3Sprite, snack4Sprite, snack5Sprite, snack6Sprite, velocimetroSprite;
var cloudImg, tRexRunningImg, tRexCollideImg, tRexCollideImg, obstacle1Img,obstacle2Img,obstacle3Img,obstacle4Img,obstacle5Img, enemyImg, craneoImg, velocimetroImg1, velocimetroImg2, velocimetroImg3, velocimetroImg4, obstacle6Img, gameOverImg, restartImg;                                  //Imágenes
var red, green, blue, score=0, velocityTrex;                                          //Variables distintas
var gameState = "PLAY";                                                 //Estado del juego
var cloudsGroup, bigCloudsGroup, obstaclesGroup, snacksGroup, enemiesGroup, craneosGround;                        //Grupos de nubes, obstáculos
var dieSound, jumpSound, checkPointSound, superComboSound;
var scoreSnack1 =0, scoreSnack2 =0, scoreSnack3 =0, scoreSnack4 =0, scoreSnack5 =0, scoreSnack6 =0;               //Marcadores para los snaks acumulados

//FUNCIÓN PARA CARGAR IMÁGENES A LOS SPRITES
function preload(){
  tRexRunningImg = loadAnimation("Images/trex1.png", "Images/trex2.png", "Images/trex3.png");   //Carga imágenes para el trex corriendo
  tRexCollideImg = loadImage("Images/trex_collided.png");                         //Carga imagen para tRex cuando choca
  groundImg = loadImage("Images/ground.png");                                     //Carga imágen para el piso
  cloudImg = loadImage("Images/cloud.png");                                       //Carga imágen de la nube

  obstacle1Img = loadImage("Images/obstacle1.png");                                //Carga imágen del obstáculo1
  obstacle2Img = loadImage("Images/obstacle2.png");                                //Carga imágen del obstáculo
  obstacle3Img = loadImage("Images/obstacle3.png");                                //Carga imágen del obstáculo
  obstacle4Img = loadImage("Images/obstacle4.png");                                //Carga imágen del obstáculo
  obstacle5Img = loadImage("Images/obstacle5.png");                                //Carga imágen del obstáculo
  obstacle6Img = loadImage("Images/obstacle6.png");                                //Carga imágen del obstáculo

  gameOverImg = loadImage("Images/gameOver.png");                                  //Carga imágen de juego terminado stiker
  restartImg = loadImage("Images/restart.png");                                    //Carga imágen de reiniciar

  snackImg1 = loadImage("Images/snack1.png");
  snackImg2 = loadImage("Images/snack2.png");
  snackImg3 = loadImage("Images/snack3.png");
  snackImg4 = loadImage("Images/snack4.png");
  snackImg5 = loadImage("Images/snack5.png");
  snackImg6 = loadImage("Images/snack6.png");

  velocimetroImg1 = loadImage("Images/velocimetro1.png");
  velocimetroImg2 = loadImage("Images/velocimetro2.png");
  velocimetroImg3 = loadImage("Images/velocimetro3.png");
  velocimetroImg4 = loadImage("Images/velocimetro4.png");

  enemyImg = loadImage("Images/enemyTrex.png");
  craneoImg = loadImage("Images/craneo.png");

  dieSound = loadSound("Sounds/dieSound.mp3");
  jumpSound = loadSound("Sounds/jumpSound.mp3");
  checkPointSound = loadSound("Sounds/checkPointSound.mp3");
  superComboSound = loadSound("Sounds/superCombo.mp3");
}//Fin function preaload()


//FUNCIÓN PARA LA CONFIGURACIÓN INICIAL DEL JUEGO
function setup(){                                               
  createCanvas(600,200);                                        //Canvas o área de juego
  
  groundSprite = createSprite(70,180,170,30);                   //Sprite del suelo
  groundSprite.scale = 3;
  groundSprite.addImage("groundImage", groundImg);              //Agrega la imágen del piso al sprite del piso
  
  invisibleGroundSprite = createSprite(70,180,170,10);          //Sprite del piso invisible
  invisibleGroundSprite.visible = false;                        //Hace el sprite invisible
  
  cloudsGroup = new Group();                                    //Grupo para almacenar nubes pequeñas
  bigCloudsGroup = new Group();                                 //Grupo para almacenar nubes grandes
  obstaclesGroup = new Group();  
  snacksGroup = new Group();                                    //Grupo para los snacks del Trex
  enemiesGroup = new Group();                                   //Grupo para los enemigos del Trex
  craneosGroup = new Group();                                  //Grupo para los craneos

  tRexSprite = createSprite(50,170,70,70);                      //Sprite del tRex
  tRexSprite.addAnimation("tRexRunning", tRexRunningImg);       //Agrega la animación del tRex corriendo al sprite del tRex
  tRexSprite.addImage("tRexCollided", tRexCollideImg);          //Agrega la imágen del tRex cuando choca al sprite del rRex
  tRexSprite.scale = 0.5;                                       //Reduce la escala del tRex
  //tRexSprite.debug = true;                                    //Activa la imagen del colisionador del tRex
  tRexSprite.setCollider("circle",0,0,30) ;                     //Ajusta el tamaño del colisionador del tRex (hitBox)

  snack1Sprite = createSprite(420,20,10,10);
  snack1Sprite.addImage(snackImg1);
  snack1Sprite.scale = 0.1;

  snack2Sprite = createSprite(450,20,10,10);
  snack2Sprite.addImage(snackImg2);
  snack2Sprite.scale = 0.1;

  snack3Sprite = createSprite(485,20,10,10);
  snack3Sprite.addImage(snackImg3);
  snack3Sprite.scale = 0.1;

  snack4Sprite = createSprite(520,20,10,10);
  snack4Sprite.addImage(snackImg4);
  snack4Sprite.scale = 0.1;

  snack5Sprite = createSprite(550,20,10,10);
  snack5Sprite.addImage(snackImg5);
  snack5Sprite.scale = 0.1;

  snack6Sprite = createSprite(580,20,10,10);
  snack6Sprite.addImage(snackImg6);
  snack6Sprite.scale = 0.1;

  velocimetroSprite = createSprite(570, 70,10,10);
  velocimetroSprite.addImage(velocimetroImg1);
  velocimetroSprite.addImage(velocimetroImg2);
  velocimetroSprite.addImage(velocimetroImg3);
  velocimetroSprite.addImage(velocimetroImg4);
  velocimetroSprite.scale = 0.4;

  gameOverSprite = createSprite(270,70,10,10);                  //Sprite para gameOver
  gameOverSprite.addImage("gameOverImage", gameOverImg);        //Agrega la imágen del gameOver al sprite del gameOver
  gameOverSprite.visible = false;                               //Hace el gameOver invisible al inicio del juego
  gameOverSprite.scale = 0.17;
  
  restartSprite = createSprite(270,150,10,10);                  //Sprite para restart
  restartSprite.addImage("restarButton", restartImg);           //Agrega la imágen para el botón de reiniciar
  restartSprite.visible = false;                                //Hace el restart invisible al inicio del juego
  restartSprite.scale = 0.7;

}//Fin function setup()


//FUNCIÓN PRINCIPAL, PARA DIBUJAR EN EL CANVAS
function draw(){                                                
  velocityTrex = Math.round(groundSprite.velocityX * -1) //Variable

  background(rgb(red,green,blue));                              //Cambia aleatoriamente el color del fondo
  drawSprites();                                                //Dibuja los sprites en el canvas

  textSize(17);                                                 //Tamaño del texto
  fill(rgb(255,255,255));
  text("Score: " + score, 10,20);                              //Mostrar texto para la puntuación del marcador
  scoreStacks();
  displayVelocityTrex();
  
  tRexSprite.collide(invisibleGroundSprite);                    //Hace que el tRex se detenga al tocar el piso invisible

  gameOverSprite.depth = cloudsGroup.depth;                     //Iguala las profundidades del gameOver y las nubes
  gameOverSprite.depth = bigCloudsGroup.depth;                  //Iguala las profundidades del gameOver y las nubes
  gameOverSprite.depth += 5;                                    //Saca una capa la profundidad del gameOver en el canvas

  restartSprite.depth = cloudsGroup.depth;                     //Iguala las profundidades del restart y las nubes
  restartSprite.depth += 1;                                    //Saca una capa la profundidad del restart en el canvas
  
  if(groundSprite.x <= 0){                                      //Si el piso sale del canvas del lado izquierdo
    groundSprite.x = 70;                                        //Lo vuelve a colocar en su posición original en las X
  }//Fin if grounsSpritex

  if(gameState === "PLAY"){
    //console.log("Posición Y del tRex: " + tRexSprite.y);      //Validar posición del dinosaurio en el suelo
    //console.log("Estado del juego: " + gameState);            //Salida a consola para validar estado actual del juego
    groundSprite.velocityX = -(7 + 1.5 * score/100);            //Velocidad del piso a la izquierda
    infiniteClouds();                                           //Invoca la función de las nubes infinitas
    infiniteObstacles();                                        //Invoca la función de los obstáculos infinitos
    snacksTrex();
    enemyTrexDie();
    craneosGround();

    if(frameCount % 100 === 0){                                 //Cada 100 frames, aumenta 10 puntos al marcador
      score += 10;
    }
    
    if(keyDown("space") && tRexSprite.y >= 159){                //Si se presiona la barra espaciadora del teclado
      tRexSprite.velocityY = -17;                               //Hace que el tRex brinque hacia arriba
      jumpSound.play();
    }//Fin if keyDown("space")
    tRexSprite.velocityY += 1.4;                                //Hace que el dinosaurio regrese al piso después de soltar la barra espaciadora

    if(tRexSprite.isTouching(snacksGroup)){
      randomColor();                                          //Invoca función para cambiar color aleatorio
      score += Math.round(random(20,30));                      //Incrementa aleatorio de 30-70 al marcador
      checkPointSound.play();
    }

    if(tRexSprite.isTouching(snack1Sprite)){                  //Si el snack1 toca al tRex
      scoreSnack1 += 1;                                       //Incrementa el score del snack
        if(scoreSnack1 % 10 == 0 && scoreSnack1 > 0){                             //Cada 2 nuevos toques
          scoreSnack1 +=100                                  //Incrementa el score del snack en 1000
          superComboSound.play();                             //Reproduce sonido de superCombo
        }
    }
    if(tRexSprite.isTouching(snack2Sprite)){
      scoreSnack2 += 1;
      if(scoreSnack2 % 10 === 0 && scoreSnack2 > 0){                             //Cada 2 nuevos toques
        scoreSnack2 +=100                                  //Incrementa el score del snack en 1000
        superComboSound.play();                             //Reproduce sonido de superCombo
      }
    }
    if(tRexSprite.isTouching(snack3Sprite)){
      scoreSnack3 += 1;
      if(scoreSnack3 % 10 === 0 && scoreSnack3 > 0){                             //Cada 2 nuevos toques
        scoreSnack3 +=100                                  //Incrementa el score del snack en 1000
        superComboSound.play();                             //Reproduce sonido de superCombo
      }
    }
    if(tRexSprite.isTouching(snack4Sprite)){
      scoreSnack4 += 1;
      if(scoreSnack4 % 10 === 0 && scoreSnack4 > 0){                             //Cada 2 nuevos toques
        scoreSnack4 +=100                                  //Incrementa el score del snack en 1000
        superComboSound.play();                             //Reproduce sonido de superCombo
      }
    }
    if(tRexSprite.isTouching(snack5Sprite)){
      scoreSnack5 += 1;
      if(scoreSnack5 % 10 === 0 && scoreSnack5 > 0){                             //Cada 2 nuevos toques
        scoreSnack5 +=100                                  //Incrementa el score del snack en 1000
        superComboSound.play();                             //Reproduce sonido de superCombo
      }
    }
    if(tRexSprite.isTouching(snack6Sprite)){
      scoreSnack6 += 1;
      if(scoreSnack6 % 10 === 0 && scoreSnack6 > 0){                             //Cada 2 nuevos toques
        scoreSnack6 +=100                                  //Incrementa el score del snack en 1000
        superComboSound.play();                             //Reproduce sonido de superCombo
      }
    }

    if(obstaclesGroup.isTouching(tRexSprite)){                  //Si el grupo de obstáculos toca al tRex o si el tRex sale del lado izquierdo del canvas
      dieSound.play();
      cloudsGroup.destroyEach();                               //Destruye grupo de nubes
      bigCloudsGroup.destroyEach();                            //Destruye grupo de nubes grandes
      
      gameState = "RETRY";                                      //Cambia el estado del juego para reiniciar la partida
    }//Fin if isTouching(tRexSprite)

    if(keyDown("x") && enemiesGroup.bounceOff(tRexSprite)){                    //Si los enemigos tocan al tRex
      score += 10;                                              //Resta puntos al score
      dieSound.play();
    }//Fin if enemiesGroup.isTouching
     
  }//Fin gameState PLAY

  else if(gameState === "RETRY"){
    //console.log("Estado del juego: " + gameState);              //Salida a consola para validar estado actual del juego
    retryGame();                                                //Invoca la función para reiniciar el juego
  }//Fin gameState END
}//Fin function draw()

//FUNCIÓN PARA MOSTRAR SCORE DE LOS SNAKS
function scoreStacks(){
  textSize(11);
  fill(rgb(255,255,255));
  text(scoreSnack1, 410,40); 
  text(scoreSnack2, 440,40); 
  text(scoreSnack3, 470,40); 
  text(scoreSnack4, 510,40); 
  text(scoreSnack5, 540,40); 
  text(scoreSnack6, 570,40); 
}

//FUNCIÓN PARA MOSTRAR VELOCIDAD DEL REX
function displayVelocityTrex(){
  text(velocityTrex + " Km/m", 550,90); 
}

//FUNCIÓN PARA CREAR NUBES INFINITAS
function infiniteClouds(){                                    
  if(frameCount % 150 === 0){                                 //Dibuja una nube cada 70 frames
    cloudSprite = createSprite(570,30,20,20);                 //Sprite para las nubes
    cloudSprite.scale = 1.7;                                  //Aumenta la escala de las nubes
    cloudSprite.velocityX = -(8.7 + 1.5 * score/100);        //Velocidad a la izquierda de las nubes
    cloudSprite.addImage(cloudImg);                           //Agrega la imagen de la nube al sprite de la nube
    cloudSprite.y = Math.round(random(20,40));                //Hace que las nubes se vena a distintas alturas
    cloudSprite.lifetime = 150;                               //Da 15 segundos de vida a la nube antes de destruirla

    bigCloudsGroup.add(cloudSprite);                          //Agrega las nubes creadas al grupo de nubes
    //bigCloudsGroup.setDepthEach(0);
   // tRexSprite.depth +=1;
  }//Fin if frameCount % 100

  if(frameCount % 70 === 0){                                  //Dibuja una nube cada 100 frames
    var cloudSprite = createSprite(530,30,20,20);             //Sprite para las nubes
    cloudSprite.velocityX = -(7 + 1.5 * score/100);          //Velocidad a la izquierda de las nubes
    cloudSprite.addImage(cloudImg);                           //Agrega la imagen de la nube al sprite de la nube
    cloudSprite.y = Math.round(random(50,110));               //Hace que las nubes se vena a distintas alturas
    cloudSprite.lifetime = 150;                               //Da 15 segundos de vida a la nube antes de destruirla


    cloudsGroup.add(cloudSprite);                             //Agrega las nubes al grupo de nubes
    //bigCloudsGroup.setDepthEach(0);
    //tRexSprite.depth +=1;
    }//Fin if frameCount % 100
}//Fin function infiniteCloudes()


//FUNCIÓN PARA CREAR OBSTÁCULOS INFINITOS
function infiniteObstacles(){                                
  if(frameCount % 100 === 0){                                 //Cada 100 frames generará una nueva nube
    var obstacleSprite = createSprite(600,170,20,20);         //Sprite para las nubes
    obstacleSprite.velocityX = -(7 + 1.5 * score/100);       //Velocidad a la izquierda de las nubes
    obstacleSprite.scale = 0.6;                               //Reduce la escala de los obstáculos
    obstacleSprite.lifetime = 150;                            //Da 15 segundos de vida a los obstáculos antes de destruirlos
  
    var randomNum = Math.round(random(1,6));                  //Crea un número aleatorio del 1-7

    switch(randomNum){                                        //Lee el número aleatorio de arriba para saber que imagen cargar a continuación
      case 1: obstacleSprite.addImage(obstacle1Img);          //Agrega la imagen del obstáculo 1 al sprite de la obstáculo
      break;                                                  //Termina el ciclo si se carga la imagen 1
      case 2: obstacleSprite.addImage(obstacle2Img);          //Agrega la imagen del obstáculo 2 al sprite de la obstáculo
      break;                                                  //Termina el ciclo si se carga la imagen 2 
      case 3: obstacleSprite.addImage(obstacle3Img);          //Agrega la imagen del obstáculo 3 al sprite de la obstáculo
      break;                                                  //Termina el ciclo si se carga la imagen 3
      case 4: obstacleSprite.addImage(obstacle4Img);          //Agrega la imagen del obstáculo 4 al sprite de la obstáculo
      break;                                                  //Termina el ciclo si se carga la imagen 4
      case 5: obstacleSprite.addImage(obstacle5Img);          //Agrega la imagen del obstáculo 5 al sprite de la obstáculo
      break;                                                  //Termina el ciclo si se carga la imagen 5
      case 6: obstacleSprite.addImage(obstacle6Img);          //Agrega la imagen del obstáculo 6 al sprite de la obstáculo
      break;                                                  //Termina el ciclo si se carga la imagen 6
      default: break;                                         //Termina el ciclo si alguno de los casos anteriores no se puede ejecutar
    }
 

    obstaclesGroup.add(obstacleSprite);                       //Agrega obstáculo creado al grupo de obstáculos
  }//Fin if frameCount % 100
}//Fin function infiniteObstacles()

function snacksTrex(){
  if(frameCount % 150 === 0){
    var snackSprite = createSprite (670,60,20,20);
    snackSprite.scale = 0.2
    snackSprite.y = Math.round(random(70,130));                  //Altura random de los snacks
    var velocidadAleatoria = Math.round(random(7,27));           //Agrega velocidad a los snacks
    snackSprite.velocityX = -velocidadAleatoria;
    snackSprite.lifetime = 150;                                  //Tiempo de vida de los snacks

    var randomNum = Math.round(random(1,6));                  //Crea un número aleatorio del 1-7

    switch(randomNum){                                        //Lee el número aleatorio de arriba para saber que imagen cargar a continuación
      case 1: snackSprite.addImage(snackImg1);               //Agrega la imagen del snack 1 al sprite de la snack
              snack1Sprite = snackSprite;                     //Guarda el sprite para actualizar contador al tocar
      break;                                                  //Termina el ciclo si se carga la imagen 1
      case 2: snackSprite.addImage(snackImg2);               //Agrega la imagen del snack 2 al sprite de la snack
              snack2Sprite = snackSprite;                     //Guarda el sprite para actualizar contador al tocar
      break;                                                  //Termina el ciclo si se carga la imagen 2 
      case 3: snackSprite.addImage(snackImg3);               //Agrega la imagen del snack 3 al sprite de la snack
              snack3Sprite = snackSprite;                     //Guarda el sprite para actualizar contador al tocar
      break;                                                  //Termina el ciclo si se carga la imagen 3
      case 4: snackSprite.addImage(snackImg4);               //Agrega la imagen del snack 4 al sprite de la snack
              snack4Sprite = snackSprite;                     //Guarda el sprite para actualizar contador al tocar
      break;                                                  //Termina el ciclo si se carga la imagen 4
      case 5: snackSprite.addImage(snackImg5);               //Agrega la imagen del snack 5 al sprite de la snack
              snack5Sprite = snackSprite;                     //Guarda el sprite para actualizar contador al tocar
      break;                                                  //Termina el ciclo si se carga la imagen 5
      case 6: snackSprite.addImage(snackImg6);               //Agrega la imagen del snack 6 al sprite de la snack
              snack6Sprite = snackSprite;                     //Guarda el sprite para actualizar contador al tocar
      break;                                                  //Termina el ciclo si se carga la imagen 6
      default: break;                                         //Termina el ciclo si alguno de los casos anteriores no se puede ejecutar
    }
    tRexSprite.depth = snackSprite.depth;                     //Iguala las profundidades del tRex y los snaks
    tRexSprite.depth += 1; 

    snacksGroup.add(snackSprite);                                //Agrega los snacks al grupo de Snacks
  }
}

function enemyTrexDie(){
  if(frameCount % 170 === 0 || frameCount % 230 === 0){
    enemySprite = createSprite(700,165,10,10);                    //Sprite enemy Trex
    enemySprite.addImage("enemyRex", enemyImg);                   //Agrega la imagen al sprite del enemigo
    enemySprite.velocityX = -(7 + 1.5 * score/100);
    enemySprite.scale = 0.22;
    enemySprite.lifetime = 150;
    tRexSprite.depth = enemySprite.depth;                     //Iguala las profundidades del tRex y los enemigos
    tRexSprite.depth += 1; 

    enemiesGroup.add(enemySprite);
  }
}//Fin enemyTrexDie()

function craneosGround(){
  if(frameCount % 210 === 0){
    craneoSprite = createSprite(670,170,10,10);
    craneoSprite.scale = 0.15;
    craneoSprite.velocityX = -(6 + 1.5 * score/100);
    craneoSprite.y = Math.round(random(170,190));
    craneoSprite.addImage("craneo", craneoImg);                   //Agrega imagen del craneo al sprite 
    craneoSprite.lifetime = 150;
    tRexSprite.depth = craneoSprite.depth;                      //Iguala las profundidades del tRex y los craneos
    tRexSprite.depth += 1; 

    craneosGroup.add(craneoSprite);
  }//Fin if
}//Fin craneosGround()

//FUNCIÓN PARA CREAR COLORES ALEATORIOS EN CÓDIGO RGB
function randomColor(){   
                                     
  red = Math.round(random(0,255));                           //Crea un número aleatorio del 0-255 para formamar el color rojo
  green = Math.round(random(0,255));                         //Crea un número aleatorio del 0-255 para formamar el color verde
  blue = Math.round(random(0,255));                          //Crea un número aleatorio del 0-255 para formamar el color azul
  console.log("Color RGB: " + red + "," + green + "," + blue);    //Salida a consola para validar color rgb creado

 
}//Fin funcion randomColor()


//FUNCIÓN PARA REINICIAR LA PARTIDA
function retryGame(){
  tRexSprite.changeImage("tRexCollided", tRexCollideImg);     //Cambia la imagen del tRex para cuando choca
  gameOverSprite.visible = true;                              //Hace visible el gameOver después de chocar con los obstáculos
  restartSprite.visible = true;                               //Hace visible el restart después de chocar con los obstáculos
  
  cloudsGroup.setVelocityXEach(0);                            //Detiene la velocidad del grupo de nubes chicas en X
  bigCloudsGroup.setVelocityXEach(0);                         //Detiene la velocidad del grupo de nubes grandes en X
  cloudsGroup.setVelocityYEach(0);                            //Detiene la velocidad del grupo de nubes chicas en Y
  bigCloudsGroup.setVelocityYEach(0);                         //Detiene la velocidad del grupo de nubes grandes en Y
  snacksGroup.setVelocityXEach(0);
  snacksGroup.setVelocityYEach(0);
  enemiesGroup.setVelocityXEach(0);
  craneosGroup.setVelocityXEach(0);

  cloudsGroup.setLifetimeEach(-1);                            //Evita que desaparezcan las nubes por su tiempo de vida
  bigCloudsGroup.setLifetimeEach(-1);                         //Evita que desaparezcan las nubes grandes por su tiempo de vida
  snacksGroup.setLifetimeEach(-1);

  obstaclesGroup.setVelocityXEach(0);                         //Detiene la velocidad del grupo de obstáculos en X
  obstaclesGroup.setLifetimeEach(-1);                         //Evita que desaparezcan los ostáculos por su tiempo de vida  
  enemiesGroup.setLifetimeEach(-1);
  enemiesGroup.setLifetimeEach(-1);
  craneosGroup.setLifetimeEach(-1);


  if(mousePressedOver(restartSprite)){                        //Si se da clic sobre el sprite de restart
    gameState = "PLAY";                                       //Cambia el estado del juego a PLAY
    
    gameOverSprite.visible = false;                           //Hace invisible el gameOver
    restartSprite.visible = false;                            //Hace invisible el restart
    
    tRexSprite.changeImage("tRexRunning", tRexRunningImg);    //Cambia la imágen del tRex a corriendo
    tRexSprite.x = 50;                                        //Coloca al tRex en su posición original en X
   
    obstaclesGroup.destroyEach();                             //Destruye el grupo de ostáculos
   
    cloudsGroup.destroyEach();                                //Destruye el grupo de nubes chicas
    bigCloudsGroup.destroyEach();                             //Destruye el grupo de nubes grandes
    snacksGroup.destroyEach();                                //Destruye el grupo de los snaks
    enemiesGroup.destroyEach();                               //Destruye el grupo de los enemigos
    craneosGroup.destroyEach();                               //Destruye el grupo de los craneos
    groundSprite.velocityX = -7;                              //Da velocidad al piso hacia la izquierda

    score = 0;  
    scoreSnack1 = 0;
    scoreSnack2 = 0;
    scoreSnack3 = 0;
    scoreSnack4 = 0;
    scoreSnack5 = 0;
    scoreSnack6 = 0;

    tRexSprite.velocityX = 0;                                   //Detiene la velocidad de tRex en X
    tRexSprite.velocityY = 0;                                   //Detiene la velocidad del tRex en Y
    groundSprite.velocityX = 0;                                 //Detiene la velociad del piso en X

  
  }//Fin if mousePressedOver
}//Fin if retyGame()

