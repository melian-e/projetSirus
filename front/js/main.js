socket.emit('json', '');                                    //demande au server de l'envoie du JSON des actions

socket.on('jsonaction', json =>{                            //reception JSON
    console.table(json.cartes)

    document.getElementById("action").innerHTML = document.getElementById("action").innerHTML + "<h3 style='text-align:center;margin-bottom:7%; font-family:turfu;' id='actionh3'>Actions dans la region </h3>"
    for (let i=0; i<json.cartes.length; i++){
        let id = json.cartes[i].id
        document.getElementById("action").innerHTML = document.getElementById("action").innerHTML + "<div class='listeningaction'><a onclick='supression("+id+")'><img src='../style/asset/flechecote.png' style='width:3%;' id='"+id+"img'>  " + json.cartes[i].titre +  "</a><input type='checkbox' class='apple-switch' style='position:relative; float:right; margin-top:-1%; margin-right:2%;' onclick='repCheckbox("+id+")' id='"+id+"check'><br><div style='display:none;' id='"+id+"'>"+ json.cartes[i].resume+ "</div></div>"   
    }
                                                            //ecriture dans l'html des infosmations du JSON
    
})

document.getElementById("filtres").innerHTML = document.getElementById("filtres").innerHTML + "<div style='margin-bottom:2%;'>Map des régions<input type='checkbox' id='map1' onclick='checkfiltres(1)' class='apple-switch' style='position:relative; float:right; margin-right:2%;' checked disabled></div></br>"                      //affichage des différent filtres
document.getElementById("filtres").innerHTML = document.getElementById("filtres").innerHTML + "<div style='margin-bottom:2%;'>Map neutre<input type='checkbox' id='map2' onclick='checkfiltres(2)' class='apple-switch' style='position:relative; float:right; margin-right:2%;'></div></br>" 
document.getElementById("filtres").innerHTML = document.getElementById("filtres").innerHTML + "<div style='margin-bottom:2%;'>Map vue satellite<input type='checkbox' id='map3' onclick='checkfiltres(3)' class='apple-switch' style='position:relative; float:right; margin-right:2%;'></div></br>" 

function supression(id){                                    //fait apparaitre ou disparaitre le resume d'une action
    if(window.getComputedStyle(document.getElementById(id), null).getPropertyValue("display") == "none"){
        document.getElementById(id).setAttribute("style", "display:block; margin-left:5%;")
        document.getElementById(id+'img').setAttribute("src", "../style/asset/flechebas.png");
    }
    else{
        document.getElementById(id).setAttribute("style", "display:none;")
        document.getElementById(id+'img').setAttribute("src", "../style/asset/flechecote.png");
    }
}

function repCheckbox(id){                                   //message si checkbox est coche
    if(document.getElementById(id+'check').checked == true){
        alert("t bg")
    }
    
}

function checkfiltres(id){                          //regarde si un autre filtre est selectionne et deselectionne celui qui est selectionne lors d'un changement de filtre
    let id2
    let id3

    document.getElementById('map'+id).setAttribute("disabled", "")
    let canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    if(id == 1){
        id2 = 2
        id3 = 3
        ascko.display(imgRegions);
    }
    else if(id == 2){
        id2 = 1
        id3 = 3
        ascko.display(imgPropa);
    }
    else{
        id2 = 1
        id3 = 2
        ascko.display(imgSatellite);
    }

    if(document.getElementById('map'+id).checked == true){
        document.getElementById('map'+id2).checked = false
        document.getElementById('map'+id3).checked = false
        alert("test");

        document.getElementById('map'+id2).removeAttribute("disabled", "")
        document.getElementById('map'+id3).removeAttribute("disabled", "")
    }


}

