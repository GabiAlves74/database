var hypnoticBall, database;
var position;


function setup(){
  // chamada do banco de dados
  database = firebase.database();

  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,15,15);
  hypnoticBall.shapeColor = "blue";

  //metodo REF é usado para referencia da localização do valor e/ou chave do BD
  var hypnoticBallPosition = database.ref('ball/position');
  // metodo ON é usado para acompanhar as mudanças feitas no BD
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

//função para enviar dados para o DB
function writePosition(x,y){
  // instrução usada para definir valores que serão enviados para o banco de dados (SET)
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

// função para leitura de dados do DB
function readPosition(data){
  // variável lê a posição do valor no BD e atribui as posições do objeto exibido
  position = data.val();
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

// função chamada caso ocorram erros na leitura do BD
function showError(){
  console.log("Error in writing to the database");
}
