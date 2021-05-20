let pic1
let back

let number = 17;

let posX = new Array()
let CposX = new Array()
let posY = new Array()
let CposY = new Array()
let rot = new Array()
let Crot = new Array()
let taille = new Array()


for (let i = 0 ; i < number ; i++){
    posX[i] = 0
    CposX[i] = 0
    posY[i] = 0
    CposY[i] = 0
    rot[i] = 0
    Crot[i] = 0
    taille[i] = 0
}


function preload() {
  pic1 = loadImage("../style/asset/virus.png")
  back = loadImage("../style/asset/backflou.jpg")

}


function setup() {
  createCanvas(displayWidth, displayHeight);

}

function draw() {


    background(back);


  for(let i = 0; i < number ; i++){
    if(Crot[i] == 0){
        Crot[i] = random(0.005,0.01);

        if(random(10) < 5){
            posY[i] = random(displayHeight)

            if (random(10) < 5){
                posX[i] = displayWidth+200
            }
            else{
                posX[i] = -200
            }
        }
        else{
            posX[i] = random(displayWidth)

            if(random(10) < 5){
                posY[i] = displayHeight+200;
            }
            else{
                posY[i] = -200
            }
        }

        taille[i] = random(50,300)
        CposX[i] = random(-2,2);
        CposY[i] = random(-2,2);
    }

    push()
    translate(posX[i], posY[i]);
    rotate(rot[i]);
    imageMode(CENTER)
    image(pic1, 0, 0, taille[i], taille[i])


    posX[i] += CposX[i]
    posY[i] += CposY[i]
    rot[i] += Crot[i]

    pop()


    if(posX[i] > (displayWidth+200) || posX[i] < -200 || posY[i] > (displayHeight+200) || posY[i] < -200){
        posX[i] = 0;
        CposX[i] = 0;
        posY[i] = 0;
        CposY[i] = 0;
        rot[i] = 0;
        Crot[i] = 0
        taille[i] = 0
    }
    }







}