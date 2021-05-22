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

    france.display(currentMap);
    affichage(matpxl, currentFiltre);
    
    matriceRegions.forEach(region => {
        
        if(region.name == matpxl[x + y * 400].region){
            
            const ctx2 = canvas.getContext('2d');
            let scannedImage = ctx2.getImageData(0, 0, canvas.width, canvas.height);
            let scannedData = scannedImage.data;
            for(let i = 0; i < 4*400*400; i += 4){
                if(matpxl[i/4].bordure == true && region.name == matpxl[i/4].region){
                    scannedData[i] = 255;
                    scannedData[i + 1] = 255;
                    scannedData[i + 2] = 255;
                }
            }
            scannedImage.data = scannedData;
            ctx2.putImageData(scannedImage, 0, 0);
            

            document.getElementById("actionh3").innerHTML = "Actions dans la region " + region.name;
            let ad="<p>Info Régions </br>"+region.name+"</br><i class=\"far fa-angry\"></i>Mécontentement : "+region.mecontentement+"%</br><i class=\"fas fa-head-side-virus\"></i>Contaminés : "+region.contamines+"</br><i class=\"fas fa-skull-crossbones\"></i>Morts : "+region.morts+"</br><i class=\"fas fa-users\"></i>Population : "+region.population+"</p>";
            document.getElementById("regionAff").innerHTML=ad;
        }
    });
    console.log("Coordonnées  = " + x + ' ' + y);
    console.log(matpxl[x + y * 400].pop);
};

canvas.addEventListener('click', onClick);

function initPopulation(map, regions, villes){
    let maxReached = 0;
    while(maxReached < 13){
        maxReached = 0;
        const x = Math.floor(Math.random() * map.length);
        if(map[x].region != ""){
            regions.forEach(e => {
                if(map[x].region == e.name) {
                    if((e.population + 100) < e.populationMax){
                        map[x].pop += 100;
                        e.population += 100;
                    }
                }
            });
        }
        regions.forEach(e => {
            if((e.population + 100) > e.populationMax){
                maxReached++;
            }
        });
    }
    return {map, regions}
}

function apparitionVirus(nbFoyer, map, regions){
    for(let i = 0; i < nbFoyer; i++){
        const x = Math.floor(Math.random() * map.length);
        if(map[x].region != "" && map[x].pop > 0){
            map[x].contamines += 1;
            regions.forEach(e => {
                if(map[x].region == e.name){
                    e.contamines += 1;
                }
            });
            console.log("Apparition d'un cas en : " + map[x].region + " " + x%400 + " " + Math.floor(x/400));
        } else {
            i--;
        }
    }
    return {map, regions};
}

function affichage(map, type){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    let scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let scannedData = scannedImage.data;
    //console.log(scannedData);
    let max = 0;
    if(type == "population"){
        for(let i = 0; i < map.length; i++){
            if(map[i].pop > max){
                max = map[i].pop;
            }
        }
        if(max > 0){
            for(let i = 0; i < canvas.width * canvas.height * 4; i += 4){
                scannedData[i + 2] += Math.floor(((map[i/4].pop / max) * 255) * ((255-scannedData[i + 2])/255));
            }
        }
    } else if( type == "contamines"){
        for(let i = 0; i < map.length; i++){
            if(map[i].infectes > max){
                max = map[i].infectes;
            }
        }
        if(max > 0){
            for(let i = 0; i < canvas.width * canvas.height * 4; i += 4){
                scannedData[i] += Math.floor(((map[i/4].infectes / max) * 255) * ((255-scannedData[i])/255));
            }
        }
    } else if(type == "morts"){
        for(let i = 0; i < map.length; i++){
            if(map[i].morts > max){
                max = map[i].morts;
            }
        }
        if(max > 0){
            for(let i = 0; i < canvas.width * canvas.height * 4; i += 4){
                scannedData[i + 1] += Math.floor(((map[i/4].morts / max) * 255) * ((255-scannedData[i + 1])/255));
            }
        }
    }
    
    scannedImage.data = scannedData;
    ctx.putImageData(scannedImage, 0, 0);
}

function propagation(map /* MUTATEURS + MATRICE */){
    let change = 0;
        for(let i = 0; i < map.length; i++){
            if((map[i].infectes > 0) && (i > 0) && ((i % 400) > 0)){
                if(map[i-400].infectes < map[i+1].pop){
                    if((Math.random() * 100) * ((map[i+1].infectes / map[i+1].pop) / 2 + 0.5) > 93){
                        map[i+1].infectes += 1;
                        change++;
                    }
                }
                if(map[i-1].infectes < map[i+1].pop){
                    if((Math.random() * 100) * ((map[i+1].infectes / map[i+1].pop) / 2 + 0.5) > 93){
                        map[i-1].infectes += 1;
                        change++;
                    }
                }
            }
        }
}