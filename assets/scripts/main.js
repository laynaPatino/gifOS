const url = "http://api.giphy.com/v1/gifs/"
const apiKey = "r57WusYChcBWf2rW0XB14SeuLz7qNeJG";
//Funciones para evento buscar gif
var estado = document.querySelector(".search_nav").style.display = "none"//estado inicial de menu buscar
document.querySelector("#section3").style.display = "none"//estado inicial de seccion3
//funciones para "Hoy te sugerimos"
const gifSuggest = url + "trending?api_key=" + apiKey + "&limit=4&rating=g";
const containerGifs = document.querySelector(".container_gifs");
let offset = 100;



















