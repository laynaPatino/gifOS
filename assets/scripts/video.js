const url = "http://api.giphy.com/v1/gifs/"
const apiKey = "r57WusYChcBWf2rW0XB14SeuLz7qNeJG"
const urlUpload = "http://upload.giphy.com/v1/gifs?api_key=" + apiKey;
const video = document.querySelector("#videoGif");
const containerVideo = document.querySelector(".container_video")
containerVideo.style.display = "none";
const containerCreateGif = document.querySelector(".container_createGif");
const titleSection = document.querySelector(".title_buscar");
document.querySelector(".button_stop").style.display = "none";
document.querySelector(".upload_gif").style.display = "none";
document.querySelector(".replay_gif").style.display = "none";
const misGifcontainer = document.querySelector("#misGifcontainer");


//getUserMedia que usar del navegador e este caso audio no, video si
function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }//navigator trae todo lo referente a la maquina 
    }).then(function (stream) {
        video.srcObject = stream;
        video.play();
        let recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,

        });
        //crear gif
        document.querySelector(".button_capture").addEventListener("click", function () {
            recorder.startRecording();
            document.querySelector(".button_capture").style.display = "none";
            document.querySelector(".button_stop").style.display = "block";
        });
        //stop gif
        document.querySelector(".button_stop").addEventListener("click", function () {
            recorder.stopRecording();
            document.querySelector(".upload_gif").style.display = "block";
            document.querySelector(".replay_gif").style.display = "block";
            document.querySelector(".button_stop").style.display = "none";
            let blob = recorder.getBlob();
            const objectURL = URL.createObjectURL(blob);
            console.log(objectURL);
        });
        //subir gif
        document.querySelector(".upload_gif").addEventListener("click", function () {
            let blob = recorder.getBlob();
            let form = new FormData();
            form.append('file', blob, 'gif.gif');
            fetch(urlUpload, {
                method: 'POST',
                body: form
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.error) {
                        alert(data.errors);
                    } else {
                        localStorageGif(data);
                    }
                });
        });

        //repetir captura
        document.querySelector(".replay_gif").addEventListener("click", function () {
            document.querySelector(".button_capture").style.display = "block";
            document.querySelector(".replay_gif").style.display = "none";
            document.querySelector(".upload_gif").style.display = "none";

        });

        // local storage
        function localStorageGif(data) {
            if (localStorage.getItem("id") === null) {
                idGif = []
            } else {
                idGif = JSON.parse(localStorage.getItem('id'));
            }
            idGif.push(data.data.id);
            localStorage.setItem("id", JSON.stringify(idGif));
        }

    });
};

    //estructura template_trend
    function misGifosTemplete(img) {
        const newGif = document.createElement("div");
        const templateSection2 = `
            <div class="container_gif_1 col-3 ">
                <img src="${img}" alt="${img}">
            </div>
            `
        newGif.innerHTML = templateSection2;
        misGifcontainer.appendChild(newGif);
    }

    function sectionMisGifos() {
        let idGif =JSON.parse(localStorage.getItem("id"));
        idGif.forEach(miGif);
        function miGif(i) {
            fetch(url + i + "?api_key=" + apiKey)
                .then(response =>
                    response.json()
                ).then(res => {
                    let element = res.data
                    let img = element.images.original.url;
                    misGifosTemplete(img);
                })
        }
    }

    function createGif() {
        document.querySelector("#start").addEventListener("click", function () {
            containerVideo.style.display = "flex";
            containerCreateGif.style.display = "none";
            titleSection.parentElement.style.display = "none";
            document.querySelector("#section3").style.display = "none"
            getStreamAndRecord()
        })
    
    }

//llamado a funcion
createGif();
sectionMisGifos();





