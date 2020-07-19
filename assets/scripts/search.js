
// trae elementos de api 
function getSearchResults(search) {
    const Api = url + "search?q=" + search + '&api_key=' + apiKey;
    fetch(Api)
        .then(response =>
            response.json()
        ).then(res => {
            res.data.forEach(element => {
                let img = element.images['downsized_medium']['url'];
                let title = element.title;
                sectionSearchResults(img, title);
            })
        });
};

//estructura de div para Gif
function sectionSearchResults(img, title) {
    const sectionGif = document.createElement("div");
    const sectionGifs = document.querySelector("#containerGif3");
    const templateSectiongif =
        `
            <!--container_gifs-->
            <div class="container_gif_1 col-3 ">
                <img src="${img}" alt="${title}">
            </div>

    `
    sectionGif.innerHTML = templateSectiongif;
    sectionGifs.appendChild(sectionGif);
}

// funcion borrar div gif
const deletSearch = function () {
    const sectionGifs = document.querySelector("#containerGif3");
    sectionGifs.innerHTML = "";
}

//funcion evento click boton buscar
function search() {
    const suggestedResult = document.getElementById("suggestedResult");
    const searchSimilar = document.getElementById("search_similar");
    const searchOthers = document.getElementById("search_others");
    document.getElementById("button_search")
        .addEventListener("click", function () {
            normalNav()
            let searchButton = document.getElementById("value_search");
            if (searchButton.value == "") {
                alert("Tienes que ingresar algo que buscar")
            } else {
                //despliegue de menu buscar
                var estado = document.querySelector(".search_nav").style.display
                if (estado == "none") {
                    document.querySelector(".search_nav").style.display = "inline";
                } else {
                    document.querySelector(".search_nav").style.display = "none";
                };
                //botones menu buscar
                suggestedResult.innerHTML = searchButton.value;
                searchSimilar.innerHTML = "similar a " + searchButton.value;
                searchOthers.innerHTML = "Otros "
            }
        });

    //evento boton busqueda sugerida
    suggestedResult.addEventListener("click", function () {
        deletSearch();
        let suggested = suggestedResult.innerHTML;
        displayGif(suggested)
        getSearchResults(suggested);
    });

    //evento boton similar a busqueda
    searchSimilar.addEventListener("click", function () {
        deletSearch();
        let similar = searchSimilar.innerHTML
        displayGif(similar)
        getSearchResults(similar);

    });

    //evento boton otras busquedas
    searchOthers.addEventListener("click", function () {
        deletSearch();
        let suggested = suggestedResult.innerHTML;
        let others = "memes de " + suggested
        let title = "Otros"
        displayGif(title)
        getSearchResults(others);
    });
    //interaccion con el resto de la pagina

    function displayGif(titleSearchGif) {
        diferentNav()
        document.querySelector(".section_1").style.display = "none"
        document.querySelector("#section2").style.display = "none"
        document.querySelector("#section3").style.display = "flex"
        let titleSection = document.querySelector(".title_buscar")
        titleSection.innerHTML = titleSearchGif;
    }

    //cambio de menu 
    function diferentNav() {
        const nav = document.body;
        nav.classList.add("nav2");
        document.querySelector("#search_suggested").classList.remove("col-11");
        searchSimilar.classList.remove("col-11");
        searchOthers.classList.remove("col-11");
    }


    //nav normal
    function normalNav() {
        const nav = document.body;
        nav.classList.remove("nav2");
        document.querySelector("#search_suggested").classList.add("col-11");
        searchSimilar.classList.add("col-11");
        searchOthers.classList.add("col-11");
    }

};





//llamado de funcion
search();

