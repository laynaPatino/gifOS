const url = "http://api.giphy.com/v1/gifs/"
const apiKey = "r57WusYChcBWf2rW0XB14SeuLz7qNeJG";

//despliegue menu temas
var status_them = document.querySelector(".nav_theme").style.display="none"
function theme(){
    var status_them = document.querySelector(".nav_theme").style.display
    if (status_them == "none"){
        document.querySelector(".nav_theme").style.display = "block";   
    } else{
        document.querySelector(".nav_theme").style.display = "none";     
    };
}

//cambio de tema
function changeTheam(){
    document.querySelector(".theme")
    .addEventListener("click",function(){
        theme();
    });
    
    document.querySelector(".b3")
    .addEventListener("click",function(){
        theme();
    });
}

//llamado de funcion
changeTheam();
















