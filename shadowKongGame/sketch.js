// Tableau mur(sol) + Déco
var TabMur = [];
var TabDecoMur = [];

// Tableau Echelle
var TabEchelle = [];

// Tableau Tonneau
var TabTonneau = [];

//////////////
var time = 0;






function setup() {
    var size = 500;
    createCanvas(size - 200, size);
    frameRate(100);

    // ### INSTANCIATION ### //
        // Obj PLayer
    Player = new Player();

    // Obj Mur //////////////
        var hauteurEntrePlateforme = 30;

        var mY = height - 5;
        var nbLigne = 0;
        
        for (var ligne = 0; ligne < height/100 + 1; ligne++) {
            
            // Ligne de GAUCHE à DROITE
            if (nbLigne % 2 == 0) { 
                // On replace le curseur au début +50
                var mX = 50;

                for (var i = 0; i < height / 50; i++) {
                    for(var j = 0; j < 10 ; j++) {
                        TabMur.push(new Mur(mX, mY));
                        mX += 5;
                    }
                    mY -= 5;
                }
                mY -= hauteurEntrePlateforme;
                nbLigne++;
            }
            // Ligne de DROITE à GAUCHE
            else {
                // On replace le curseur à la fin -50
                var mX = width - 50;

                for (var i = 0; i < height / 50; i++) {
                    for(var j = 0; j < 10 ; j++) {
                        TabMur.push(new Mur(mX, mY));
                        mX -= 5;
                    }
                    mY -= 5;
                }
                mY -= hauteurEntrePlateforme;
                nbLigne++; 
            }
        }
    /////////////////////////

    // Obj DECOMUR //////////////
        var mY = height+ 5;
        var nbLigne = 0;

        
        for (var ligne = 0; ligne < height/100 + 1; ligne++) {
            
            // Ligne de GAUCHE à DROITE
            if (nbLigne % 2 == 0) { 
                // On replace le curseur au début +50
                var mX = 50;

                for (var i = 0; i < height / 50; i++) {
                    for(var j = 0; j < 10 ; j++) {
                        TabDecoMur.push(new DecoMur(mX, mY, 5, 2));
                        TabDecoMur.push(new DecoMur(mX+1, mY-3, 2, 3));
                        TabDecoMur.push(new DecoMur(mX+3, mY-5, 2, 3));
                        mX += 5;
                    }
                    mY -= 5;
                }
                mY -= hauteurEntrePlateforme;
                nbLigne++;
            }
            // Ligne de DROITE à GAUCHE
            else {
                // On replace le curseur à la fin -50
                var mX = width - 50;

                for (var i = 0; i < height / 50; i++) {
                    for(var j = 0; j < 10 ; j++) {
                        TabDecoMur.push(new DecoMur(mX, mY, 5, 2));
                        TabDecoMur.push(new DecoMur(mX+1, mY-3, 2, 3));
                        TabDecoMur.push(new DecoMur(mX+3, mY-5, 2, 3));
                        mX -= 5;
                    }
                    mY -= 5;
                }
                mY -= hauteurEntrePlateforme;
                nbLigne++; 
            }
        }
    /////////////////////////

    // Obj Echelle //////////
        // ECHELLE PRINCIPAL de ↓ en ↑ en suivant le jeu//
            TabEchelle.push(new Echelle(width - 40 ,height - 94 , 68));     //1
            TabEchelle.push(new Echelle(30 ,310, 85));                      //2

            TabEchelle.push(new Echelle(width - 40 ,235, 80));              //3
            TabEchelle.push(new Echelle(30 ,171, 63));                      //4

            TabEchelle.push(new Echelle(width - 40 ,63, 92));               //5

        // ECHELLE SECONDAIRE //
            TabEchelle.push(new Echelle(width/2 + 5 ,height - 80, 18));     //6     X
            
            TabEchelle.push(new Echelle(width/2 + 70, 325, 45));            //7     X

            TabEchelle.push(new Echelle(width/2 - 70, 310, 25));            //8
            TabEchelle.push(new Echelle(width/2 - 70, 245, 25));            //9     X

            TabEchelle.push(new Echelle(width/2 + 25, 170, 80));            //10    X

            TabEchelle.push(new Echelle(width/2 - 30, 95, 33));             //11    X
    /////////////////////////

    // Obj Tonneau //////////
       for (var i = 0; i < 1; i++) {
           TabTonneau.push(new Tonneau());
       }
    /////////////////////////
}










function draw() {
    time++;
    background(80,70,70);

    afficherFond();
    codeValidation(); //triche

    if(time%100 == 0) {
        TabTonneau.push(new Tonneau());
        time = 0;
    }
    

    // Tonneau
        for (var i = 0; i < TabTonneau.length; i++) {
            
           if(CollisionTnPlayer(Player, TabTonneau[i])) {
                fill(200,50,50);
                rect(50,15, width/3 * 2, 50);

                fill(80,0,0);

                    rect(50,15,10,5);
                    rect(50,15,5,10);

                    rect(50,60,10,5);
                    rect(50,55,5,10);

                    rect(50+ width/3 * 2 -10 ,15,10,5);
                    rect(50+ width/3 * 2 -5 ,15,5,10);

                    rect(50+ width/3 * 2 -10 ,60,10,5);
                    rect(50+ width/3 * 2 -5 ,55,5,10);

                textAlign(CENTER);
                textSize(32);
                fill(200);
                text("PERDU", width / 2, 50);
                textSize(12);
                text("Entrée pour relancer", width / 2, 60);
                noLoop();

                

           }
           
            var gravity = false;
            // Collision avec le sol
            for (var j = 0; j < TabMur.length; j = j+2) {
                if(CollisionTnSol(TabMur[j] , TabTonneau[i])) {
                   gravity = true; 
                }
            }

            // Collision avec les échelle
            for (var k = 0; k < TabEchelle.length; k++) {
                if(CollisionTnEchelle(TabEchelle[k], TabTonneau[i]) && 
                    ( k >= 5 && k <= 11 && k != 7 )){
    
                    var nbRandom = random(5);

                    if (nbRandom > 3.5) {
                        TabTonneau[i].y += 20;
                        if (TabTonneau[i].sens ==  true) {
                            TabTonneau[i].sens = false;
                        }
                        else {
                            TabTonneau[i].sens = true;
                        }
                    }
                }
            }
            
            TabTonneau[i].gravity(gravity);
            TabTonneau[i].display();

            // Supp le tonneau si il est hors champ //
            if (TabTonneau[i].y > height + 20) {
                TabTonneau.splice(i, 1);
            }
        }

    // Mur Action
        var nbMurToucher = 0;

        for (var i = 0 ; i < TabMur.length; i++) {
            TabMur[i].display();

            if (Collision(TabMur[i], Player)) {
                var tchHorizontal = Collision(TabMur[i], Player);
            }

            var distance = int(dist(Player.getXpied(), Player.getYpied(), 
                                    TabMur[i].x, TabMur[i].y ));

            if (distance < 3) {
                var dis = distance;
            }

        }
    /////////////

    // Echelle
        var EchelleCollision = false;
        var EchelleCollisionHaut = false;

        for (var i = 0 ; i < TabEchelle.length; i++) {
            TabEchelle[i].display();
            if (CollisionEchelle(TabEchelle[i], Player)) {
                EchelleCollision = true;
            }
            if (CollisionHautEchelle(TabEchelle[i], Player)) {
                EchelleCollisionHaut = true;
            }
        }
    ///////////


    // PLayer Action
        Player.gravity(tchHorizontal, dis);
        Player.display();    
        Player.move(EchelleCollision, EchelleCollisionHaut);
    ////////////////

    // Deco Mur display
        for (var i = 0 ; i < TabDecoMur.length; i++) {
            TabDecoMur[i].display();
        }
    // ##### //

    finish();
}













//////////////////// FONCTION /////////////////////

// Fonction Collider //

    function Collision(Mur, Player) {
        if (Mur.x < Player.x + Player.lg  && Mur.x + Mur.d  > Player.x &&
            Mur.y < Player.y + Player.ht  && Mur.y + Mur.d  > Player.y)
        {
            return true;
        }
        else {
            return false;
        }
    }

    function CollisionEchelle(Echelle, Player) {
        if (Echelle.x < Player.x + Player.lg  && Echelle.x + Echelle.lg  > Player.x &&
            Echelle.y < Player.y + Player.ht  && Echelle.y + Echelle.ht  > Player.y)
        {
            return true;

        }
        else {
            return false;
        }
    }

    function CollisionHautEchelle(Echelle, Player) {
        if (Echelle.x    < Player.x + Player.lg  && Echelle.x    + Echelle.lg  > Player.x &&
            Echelle.y-20 < Player.y + Player.ht  && Echelle.y-20 + 25          > Player.y)
        {
            return true;

        }
        else {
            return false;
        }
    }

    function CollisionTnEchelle(Echelle, Tonneau) {
        if (Echelle.x+ 12    < Tonneau.xCol + Tonneau.d  && Echelle.x    + 6   > Tonneau.xCol &&
            Echelle.y- 20    < Tonneau.yCol + Tonneau.d  && Echelle.y-20 + 6  > Tonneau.yCol)
        {
            return true;

        }
        else {
            return false;
        }
    }

    function CollisionTnSol(Mur, Tonneau) {
        if (Mur.x < Tonneau.x + Tonneau.d  && Mur.x + Mur.d  > Tonneau.x &&
            Mur.y < Tonneau.y + Tonneau.d  && Mur.y + Mur.d  > Tonneau.y)
        {
            return true;
        }
        else {
            return false;
        }
    }

    function CollisionTnPlayer(Player, Tonneau) {
        if (Player.x < Tonneau.xCol + Tonneau.d  && Player.x + Player.lg  > Tonneau.xCol &&
            Player.y < Tonneau.yCol + Tonneau.d  && Player.y + Player.ht  > Tonneau.yCol)
        {
            
            return true;

        }
        else {
            return false;
        }
    }
//



// Fonction affichage
    function finish() {
        fill(255,255,0);
        rect(5,75,30,5);

        if (Player.x < 5  + 30  && Player.x + Player.lg  > 30 &&
            Player.y < 75 + 5   && Player.y + Player.ht  > 5)
        {
            fill(200,200,50);
            rect(50,15, width/3 * 2, 130);
            
            textAlign(CENTER);
            textSize(32);
            fill(30);
            text("Bravo !", width / 2, 50);

            textSize(15);
            text("votre temps est de :", width / 2, 80);

            textSize(25);
            text(m + "m : " + s + "s : " + ms + "ms" , width / 2, 110);
            textSize(12);
            text("Cliker pour relancer", width / 2, 135);
            clearInterval(idInter);


            /// tweet

            tweet = "%23ShadowRoadStage+Mon+temps+sur+%23ShadowKong+est+de+"+ m + "m+%3a+" + s +"s+%3a+"+ ms +"ms";
            
            style = 'padding: 1em;' +
                    'background-color: #1DA1F2;' +
                    'border: 1px solid #1da1f2;' +
                    'color: #fff;' + 
                    'font-family: roboto;' +
                    'border-radius: 100px;' +
                    'text-align: center;' +
                    'text-decoration: none;' +
                    'margin: 5px;' +
                    'display: list-item;';

            obj = document.getElementById('finish');
            obj.innerHTML = '<a target="_blank" style="'+ style +'" rel="nofollow" href="http://twitter.com/home?status='+ tweet +'">Partager votre temps</a>';








            noLoop();
        }
    }




    function afficherFond() {
        //Sorti des Tonneau
            fill(40);
            rect(8 ,10,28,3);
            fill(20);
            rect(9,13,26,2);
            fill(0);
            rect(11,15,22,1);

            fill(100);
            rect(8 ,10,28,1);
            fill(80);
            rect(8 ,11,1,2);
            rect(35 ,11,1,2);
            fill(50);
            rect(11,16,22,1);

            strokeWeight(1);
            stroke(35);
            fill(20)      
            rect(6 ,-2,32,11);



        // panneau shadow //
            strokeWeight(4);
            stroke(51);
            fill(20);
            rect(70,35-9, 155, 20);

            noStroke();
            textSize(14);
            fill(200);
            textAlign(LEFT);
            text("<- DataCenter Shadow", 75, 50-9);
            
            fill(150);

            // anneaux //
                var x = 72;
                var y = 20;

                rect(x   ,y+1 ,1,4);
                rect(x+3 ,y+1 ,1,4);
                rect(x+1 ,y   ,2,1);
                rect(x+1 ,y+5 ,2,1);

                var x = 72;
                var y = 24-9;

                rect(x   ,y+1 ,1,4);
                rect(x+3 ,y+1 ,1,4);
                rect(x+1 ,y   ,2,1);
                rect(x+1 ,y+5 ,2,1);

                // // //

                var x = 220;
                var y = 20;

                rect(x   ,y+1 ,1,4);
                rect(x+3 ,y+1 ,1,4);
                rect(x+1 ,y   ,2,1);
                rect(x+1 ,y+5 ,2,1);

                var x = 220;
                var y = 24-9;

                rect(x   ,y+1 ,1,4);
                rect(x+3 ,y+1 ,1,4);
                rect(x+1 ,y   ,2,1);
                rect(x+1 ,y+5 ,2,1);
            ///
        //

        // panneau donné //
            strokeWeight(2);
            stroke(0);
            fill(50);
            rect(20,420, 120, 30);
            noStroke();

            textAlign(CENTER);
            textSize(14);
            fill(255,100,0);
            text("ATTENTION !", 80, 435);
            textSize(12);
            text("chute  de  donnees", 80, 445);
    }
//


//// CODE DE TRICHE //// ↑↑↓↓←→←→ba
var TabKey = [];
var code = ["up", "up", "down", "down", "left", "right", "left", "right", "B", "A"];

var OnOff = false;
function codeValidation() {
    var resultat = true;

    if (TabKey.length == code.length) {
        for (var i = 0; i < code.length; i++) {
            if (! (code[i] === TabKey[i])) {
                resultat = false;
            }
        }
        if (resultat || OnOff) {
            window.open("https://leekspin.com/#tricherCestMal", "#ShadowRoadStage", "width=1,height=1");
            OnOff = true
        }
    }
    
}
        
function keyPressed() {
    if (keyCode === UP_ARROW && TabKey.length + 1 <= 10 ) {
        if (TabKey.length + 1 <= 10) {
            TabKey.push("up");
        }
        else {
            TabKey.splice(0, 1);
            TabKey.push("up");
        }
    }

    else if (keyCode === DOWN_ARROW && TabKey.length + 1 <= 10) {
        if (TabKey.length + 1 <= 10) {
            TabKey.push("down");
        }
        else {
            TabKey.splice(0, 1);
            TabKey.push("down");
        }
    }

    else if (keyCode === LEFT_ARROW && TabKey.length + 1 <= 10) {
        if (TabKey.length + 1 <= 10) {
            TabKey.push("left");
        }
        else {
            TabKey.splice(0, 1);
            TabKey.push("left");
        }
    }

    else if (keyCode === RIGHT_ARROW && TabKey.length + 1 <= 10) {
        if (TabKey.length + 1 <= 10) {
            TabKey.push("right");
        }
        else {
            TabKey.splice(0, 1);
            TabKey.push("right");
        }
    }

    else if (TabKey.length + 1 <= 10) {
        TabKey.push(key);

        if (keyCode === 13) {
             document.location.reload();
        }

    }
    else {
        TabKey.splice(0, 1);
        TabKey.push(key);

        if (keyCode === 13) {
             document.location.reload();
        }
    }
    //console.log(TabKey);
    return false; // prevent default
}


