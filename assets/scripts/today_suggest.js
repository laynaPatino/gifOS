
//estructura de div para Gif
function Suggest(img, title, i) {
    const containerGif = document.createElement("div");
    containerGif.classList.add("container_gif");
    containerGif.classList.add("col-3");
    const templateSection =
        `
        <!--container_gif-->
        <div id="${i}">
            <div class="container header">
                <h2  class="col-10 titulito"> 
                #${title}
                </h2>
                <button onclick = "closeGif(${i})">
                    <img src="./assets/img/close.svg" alt="boton_cerrar">
                </button>
            </div>
            <div class="body">
                <img src="${img}" alt="${title}">
                <button class="col-1" onclick = "seeMore(${i})">
                    ver mas ...
                </button>
            </div>
        </div>
    `
    containerGif.innerHTML = templateSection;
    containerGifs.appendChild(containerGif);
}

// trae elementos de api 
function todaySuggest() {
    fetch(gifSuggest + "&offset=" + offset)
        .then(response =>
            response.json()
        ).then(res => {
            res.data.forEach(myFunction);
            function myFunction(value, index) {
                i = index;
                let contador = containerGifs.children;
                if (contador.length === 4) {
                    return false
                }
                let img = value.images['original']['url'];
                let title = value.title;
                Suggest(img, title, i);
            }
        });
}


function displayGif(titleSearchGif) {
    document.querySelector(".section_1").style.display = "none"
    document.querySelector("#section2").style.display = "none"
    document.querySelector("#section3").style.display = "flex"
    let titleSection = document.querySelector(".title_buscar")
    titleSection.innerHTML = titleSearchGif;
}
function seeMore(i) {
    let elemento = document.getElementById(i).childNodes;
    console.log(elemento)
    let elemento2 = elemento[1].childNodes;
    console.log(elemento2)
    let elemento3 = elemento2[1];
    console.log(elemento3)
    let titleSearchGif = elemento3.innerHTML.replace("#", "");
    console.log(titleSearchGif)
    displayGif(titleSearchGif);
    getSearchResults(titleSearchGif);

}

function closeGif(i) {
    let elemento = document.getElementById(i);
    containerGifs.removeChild(elemento.parentElement);
    offset = offset + 5;
    todaySuggest()
    //let elemento2 = elemento[3].childNodes;
    //console.log(elemento2);
    //let elemento3 = elemento2[1];
    //console.log(elemento3);
}


//llamado de funcion
todaySuggest();
