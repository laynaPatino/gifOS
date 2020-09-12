const url = "https://api.giphy.com/v1/gifs/"
const apiKey = "r57WusYChcBWf2rW0XB14SeuLz7qNeJG";
//Funciones para evento buscar gif
var estado = document.querySelector(".search_nav").style.display = "none"//estado inicial de menu buscar
document.querySelector("#section3").style.display = "none"//estado inicial de seccion3
//funciones para "Hoy te sugerimos"
const gifSuggest = url + "trending?api_key=" + apiKey + "&limit=4&rating=g";
const containerGifs = document.querySelector(".container_gifs");
let offset = 100;

//mis gifos index

let sectionMyGif= document.getElementById("misGifSection");
let containerMyGif= document.getElementById("misGifcontainer");
let idGifs =JSON.parse(localStorage.getItem("id"));
function sectionMisGifos2() {
    idGifs.forEach(miGif);
    function miGif(i) {
        console.log(i)
        fetch(url + i + "?api_key=" + apiKey)
            .then(response =>
                response.json()
            ).then(res => {
                let element = res.data
                let img = element.images.original.url;
                misGifosTemplete2(img);
            })
    }
}

function misGifosTemplete2(img){
        const newGif = document.createElement("div");
        const templateSection2 = `
            <div class="container_gif_1 col-3 ">
                <img src="${img}" alt="${img}">
            </div>
            `
        newGif.innerHTML = templateSection2;
        containerMyGif.appendChild(newGif);

}

document.getElementById("misGifosLink").addEventListener("click",function(){
    document.querySelector(".section_search").style.display = "none"
    document.querySelector(".section_1").style.display = "none"
    document.querySelector(".section_2").style.display = "none"
    sectionMyGif.style.display="flex"
})
sectionMyGif.style.display="none"
sectionMisGifos2();

function uploadPag(){
    window.location.assign("upload.html")
}


















