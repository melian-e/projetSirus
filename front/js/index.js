class France{
    constructor(imageRegions, imagePropa) {
        this.imageRegions = imageRegions;
        this.imagePropa = imagePropa;
    }
    display(img){
        const canvas = document.getElementById('canvas1');
        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 400;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let scannedImg = ctx.getImageData(0, 0, canvas.width, canvas.height);
        return this.matrice(scannedImg.data);
    }

//%*r/255*pop/surf

    matrice(img){
        let matrice = []

        for (let i = 0; i < 400*400*4; i+=4){
            let data = new Object();

            data.pop = 0;
            data.infectes = 0;
            data.morts = 0;
            data.gueris = 0;
            
            if(img[i] == 0 && img[i+1] == 162 && img[i+2] == 217){
                data.region = "Hauts-de-France";
            }
            else if(img[i] == 135 && img[i+1] == 68 && img[i+2] == 255){
                data.region = "Grand Est";
            }
            else if(img[i] == 232 && img[i+1] == 55 && img[i+2] == 121){
                data.region = "Île-de-France";
            }
            else if(img[i] == 255 && img[i+1] == 200 && img[i+2] == 0){
                data.region = "Bourgogne-Franche-Comté";
            }
            else if(img[i] == 255 && img[i+1] == 254 && img[i+2] == 32){
                data.region = "Centre-Val de Loire";
            }
            else if(img[i] == 117 && img[i+1] == 189 && img[i+2] == 55){
                data.region = "Pays de la Loire";
            }
            else if(img[i] == 0 && img[i+1] == 91 && img[i+2] == 255){
                data.region = "Bretagne";
            }
            else if(img[i] == 255 && img[i+1] == 106 && img[i+2] == 0){
                data.region = "Normandie";
            }
            else if(img[i] == 192 && img[i+1] == 40 && img[i+2] == 246){
                data.region = "Nouvelle-Aquitaine";
            }
            else if(img[i] == 255 && img[i+1] == 62 && img[i+2] == 0){
                data.region = "Auvergne-Rhône-Alpes";
            }
            else if(img[i] == 255 && img[i+1] == 199 && img[i+2] == 112){
                data.region = "Occitanie";
            }
            else if(img[i] == 217 && img[i+1] == 237 && img[i+2] == 20){
                data.region = "Provence-Alpes-Côte d'Azur";
            }
            else if(img[i] == 255 && img[i+1] == 165 && img[i+2] == 121){
                data.region = "Corse";
            }
            else{
                data.region = "";
            }

            matrice.push(data);
        }

        return matrice;
    }
}

class Region extends France{
    constructor(name, color, mecontentement, contamines, morts, population, populationMax, recovered){
        super();
        this.name = name;
        this.color = color;
        this.mecontentement = mecontentement;
        this.contamines = contamines;
        this.morts = morts;
        this.population = population;
        this.populationMax = populationMax;
        this.recovered = recovered;
    }

}

class Ville extends Region{
    constructor(rayon, densite, x, y, population){
        this.rayon = rayon;
        this.densite = densite;
        this.x = x;
        this.y = y;
        this.population = population;
    }
    
}


let imgRegions = new Image();
{
imgRegions.src = 'data:image/png;base64,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';
}

let imgPropa = new Image();
{
imgPropa.src = 'data:image/png;base64,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';
}

let ascko = new France(imgRegions, imgPropa);
let matpxl = ascko.display(imgRegions);
console.log(matpxl);

let matriceRegions = [];
matriceRegions.push(new Region("Hauts-de-France", "rgb(0, 162, 217)", 0, 0, 0, 0, 5975757, 0));
matriceRegions.push(new Region("Grand Est", "rgb(135, 68, 255)", 0, 0, 0, 0, 5522476, 0));
matriceRegions.push(new Region("Île-de-France", "rgb(232, 55, 121)", 0, 0, 0, 0, 12324261, 0));
matriceRegions.push(new Region("Bourgogne-Franche-Comté", "rgb(255, 200, 0)", 0, 0, 0, 0, 2784858, 0));
matriceRegions.push(new Region("Centre-Val de Loire", "rgb(255, 254, 32)", 0, 0, 0, 0, 2561451, 0));
matriceRegions.push(new Region("Pays de la Loire", "rgb(117, 189, 55)", 0, 0, 0, 0, 3837166, 0));
matriceRegions.push(new Region("Bretagne", "rgb(0, 91, 255)", 0, 0, 0, 0, 3371158, 0));
matriceRegions.push(new Region("Normandie", "rgb(255, 106, 0)", 0, 0, 0, 0, 3305218, 0));
matriceRegions.push(new Region("Nouvelle-Aquitaine", "rgb(192, 40, 246)", 0, 0, 0, 0, 6039092, 0));
matriceRegions.push(new Region("Auvergne-Rhône-Alpes", "rgb(255, 62, 0)", 0, 0, 0, 0, 8090442, 0));
matriceRegions.push(new Region("Occitanie", "rgb(255, 199, 112)", 0, 0, 0, 0, 5985697, 0));
matriceRegions.push(new Region("Provence-Alpes-Côte d'Azur", "rgb(217, 237, 20)", 0, 0, 0, 0, 5088998, 0));
matriceRegions.push(new Region("Corse", "rgb(255, 165, 121)", 0, 0, 0, 0, 349269, 0));


const canvas = document.getElementById('canvas1');
const getClickCoords = (elem, event) => { //renvoie les coords de l'event dans l'élément passé en paramètre
    const { top, left } = elem.getBoundingClientRect();
    const { clientX, clientY} = event;

    return {
        x: clientX - left,
        y: clientY - top
    };
};

const onClick = (e) => { 
    let { x, y } = getClickCoords(canvas, e);
    x = Math.floor(x);
    y = Math.floor(y);
    matriceRegions.forEach(region => {
        if(region.name == matpxl[x + y * 400].region){
            console.log("Informations sur " + region.name + " :");
            console.log("   | Population maximum = " + region.populationMax);
            console.log("   | Population placée = " + region.population);
            console.log("   | Contaminés = " + region.contamines);
            console.log("   | Morts = " + region.morts);
            console.log("   | Recovered = " + region.recovered);
        }
    });
    console.log("Coordonnées  = " + x + ' ' + y);
};

canvas.addEventListener('click', onClick);





/*

fs.readFile("./players.json", (err, data) => { //lecture du JSON
            if(err) throw err;
            const players = JSON.parse(data);

            let match = 0;
            for(let i = 0; i < players.players.length; i++){ //check si le joueur existe déjà
                if(players.players[i].name == sock.handshake.session.username){
                    match += i + 1;
                }
            }
            
            if(match == 0){ //s'il n'existe pas création d'un joueur
                let newPlayer = {
                    "name": sock.handshake.session.username,
                    "gamesNb": 1,
                    "nbTry": score
                }
                players.players.push(newPlayer); //push du nouveau joueur dans le tableau
                let mydatas = JSON.stringify(players, null, 2);
    
                fs.writeFile("./players.json", mydatas, (err) => { //on overwrite le JSON avec le nouveau tableau
                    if (err) throw err;
                    console.log('Data written to file');
                });
            } else { //s'il existe modification du tableau
                players.players[match-1].gamesNb += 1;
                players.players[match-1].nbTry += score;

                let mydatas = JSON.stringify(players, null, 2);
    
                fs.writeFile("./players.json", mydatas, (err) => { //ecriture du nouveau tableau dans le JSON
                    if (err) throw err;
                    console.log('Data written to file');
                });
            }
            
        });






    const ctx = canvas.getContext('2d');
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let scannedData = scannedImage.data;

        for(let i = 0; i < 400*400*4; i+=4){
            if(matpxl[i/4].region == "Normandie"){
                scannedData[i] = 0;
                scannedData[i+1] = 0;
                scannedData[i+2] = 0;
            } else if(matpxl[i/4].region == "Grand Est"){
                scannedData[i] = 0;
                scannedData[i+1] = 0;
                scannedData[i+2] = 0;
            } else {
                scannedData[i] = 255;
                scannedData[i+1] = 255;
                scannedData[i+2] = 255;
            }
        }
        scannedImage.data = scannedData;
        ctx.putImageData(scannedImage, 0, 0);
*/