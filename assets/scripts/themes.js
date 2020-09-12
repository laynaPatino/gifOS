
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

function themes(){
    document.querySelector(".SailorNight")
    .addEventListener("click",function(){
        const theme = document.body
        theme.classList.add("dark_theme");
        document.getElementById("logo_img").src="./assets/img/gifOF_logo_dark.png";
        document.querySelector("#lupa").src = "./assets/img/lupa_light.svg";
    });
    document.querySelector(".SailorDay")
    .addEventListener("click",function(){
        const theme = document.body
        theme.classList.remove("dark_theme");
        document.getElementById("logo_img").src="./assets/img/gifOF_logo.png";
        document.querySelector("#lupa").src = "./assets/img/lupa_inactive.svg";
    });  
};


//llamado de funcion
changeTheam();
themes();