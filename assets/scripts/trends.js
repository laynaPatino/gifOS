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
                if (i == 0) {
                    random(img, title);
                } if (i >= 1 && i <= 3 || i >= 5 && i <= 8) {
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
    <div class="container_gif_1 col-3 ">
        <img src="${img}" alt="${title}">
    </div>
    `
    newGif.innerHTML = templateSection2;
    containerGifs2.appendChild(newGif);
}

function trend2(img, title) {
    const newGif = document.createElement("div");
    const templateSection2 = `
    <div class="container_gif_2 col-6 ">
        <img src="${img}" alt="${title}">
    </div>
    `
    newGif.innerHTML = templateSection2;
    containerGifs2.appendChild(newGif);
}

function random(img, title) {
    document.getElementById("containerGifRandom").src = img
    document.getElementById("containerGifRandom").alt = title
    document.getElementById("titleRandom").innerHTML = "#" + title
}

//llamado de funcion
gifTrend();