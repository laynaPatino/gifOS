//funciones para tendencias
const gifUrlTrend = url + "trending?api_key=" + apiKey + "&limit=10&rating=g";
const containerGifs2 = document.querySelector(".container_gifs2");

//trae elementos de api
function gifTrend() {
    fetch(gifUrlTrend)
        .then(response =>
            response.json()
        ).then(res => {
            var i = res.data;
            console.log(i)
            i.forEach(myFunction);
            function myFunction(value, index) {
                i = index;
                let img = value.images['original']['url'];
                let title = value.title;
                if (i >= 0 && i <= 3 || i >= 5 && i <= 8) {
                    trend(img, title);
                }  if (i == 4 || i == 9) {
                    trend2(img, title);
                } else{
                    console.log("error");
                }
            }
        });
}

//estructura template_trend
function trend(img, title) {
    const newGif = document.createElement("div");
    const templateSection2 = `
    <div class="container container_gif col-3 ">
        <div class="container body">
            <img id="containerGifRandom" src="${img}" alt="${title}">
            <div class="col-12 header">
                <h2 id="titleRandom">
                    #${title}
                </h2>
            </div>
        </div>
    </div>
    `
    newGif.innerHTML = templateSection2;
    containerGifs2.appendChild(newGif);
}

function trend2(img, title) {
    const newGif = document.createElement("div");
    const templateSection2 = `
    <div class="container container_gif_2 col-6 ">
        <div class="container body">
            <img id="containerGifRandom" src="${img}" alt="${title}">
            <div class="col-12 header">
                <h2 id="titleRandom">
                    #${title}
                </h2>
            </div>
        </div>
    </div>
    `
    newGif.innerHTML = templateSection2;
    containerGifs2.appendChild(newGif);
}

/*function random(img, title) {
    document.getElementById("containerGifRandom").src = img
    document.getElementById("containerGifRandom").alt = title
    document.getElementById("titleRandom").innerHTML = "#" + title


    <div class="col-3 container container_gif">
                <div class="container body">
                    <img id="containerGifRandom" src="" alt="">
                    <div class="col-12 header">
                        <h2 id="titleRandom">
                            #
                        </h2>
                    </div>
                </div>
            </div>

}*/

//llamado de funcion
gifTrend();

