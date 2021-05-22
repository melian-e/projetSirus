const getClickCoords = (elem, event) => { //renvoie les coords de l'event dans l'élément passé en paramètre
    const { top, left } = elem.getBoundingClientRect();
    const { clientX, clientY} = event;

    return {
        x: clientX - left,
        y: clientY - top
    };
};

const canvas = document.getElementById('canvas1');
const onClick = (e) => { 
    let { x, y } = getClickCoords(canvas, e);
    x = Math.floor(x);
    y = Math.floor(y);

    if(idmap == 1){
        france.display(imgRegions);
    } else if(idmap == 2){
        france.display(imgPropa);
    } else if(idmap == 3){
        france.display(imgSatellite);
    }
    
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
};

canvas.addEventListener('click', onClick);