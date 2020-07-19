const urlUpload = "http://upload.giphy.com/v1/gifs?api_key=" + apiKey;
const video = document.querySelector("#videoGif");
const containerVideo = document.querySelector(".container_video")
containerVideo.style.display = "none";
const containerCreateGif = document.querySelector(".container_createGif");
containerCreateGif.style.display = "none";
const titleSection = document.querySelector(".title_buscar");
document.querySelector(".button_stop").style.display = "none";
document.querySelector(".upload_gif").style.display = "none";
document.querySelector(".replay_gif").style.display = "none";

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
            width: 360,
            hidden: 240,
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
                        console.log(data);
                    }
                    localStorage.setItem(data.data.id, blob )//JSON.stringify(form))
                });

        });

        //repetir captura
        document.querySelector(".replay_gif").addEventListener("click", function () {
            document.querySelector(".button_capture").style.display = "block";
            document.querySelector(".replay_gif").style.display = "none";
            document.querySelector(".upload_gif").style.display = "none";

        });
    });
};





function clearScreen() {
    document.querySelector(".button1").addEventListener("click", function () {
        document.querySelector(".section_search").style.display = "none";
        document.querySelector(".section_1").style.display = "none";
        document.querySelector(".section_2").style.display = "none";
        document.querySelector(".button_container").style.display = "none";
        document.querySelector(".logo").classList.replace('col-6', 'col-10');
        containerCreateGif.style.display = "flex";
        document.querySelector("#section3").style.display = "flex"
        titleSection.innerHTML = "Mis guifos";
        //deletSearch()
    })
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
clearScreen();
createGif();




