const url = "https://api.giphy.com/v1/gifs/";
const apiKey = "r57WusYChcBWf2rW0XB14SeuLz7qNeJG";
const urlUpload = "https://upload.giphy.com/v1/gifs?api_key=" + apiKey;
const video = document.querySelector("#videoGif");
const containerVideo = document.querySelector(".container_video");
containerVideo.style.display = "none";
const containerCreateGif = document.querySelector(".container_createGif");
const titleSection = document.querySelector(".title_buscar");
document.querySelector(".button_stop").style.display = "none";
document.querySelector(".upload_gif").style.display = "none";
document.querySelector(".replay_gif").style.display = "none";
const misGifcontainer = document.querySelector("#misGifcontainer");
const video2 = document.querySelector("#videoGif2");
video2.style.display = "none";
const loadGif = document.querySelector(".load-gif");
loadGif.style.display = "none"
const bodyVideo = document.querySelector(".body_video");
const loadCancel = document.querySelector(".load-cancel");
loadCancel.style.display="none";
const timerInput = document.querySelector(".timer-input");
timerInput.style.display="none";
const successfulLoad = document.querySelector(".successful_load");
const lastGif = document.querySelector("#last-gif");
const sectionCreateGif = document.getElementById("sectionCreateGif");
sectionCreateGif.style.display="none"
const titleBox = document.querySelector(".title-box");

//cancel
function cancel(){
  window.location.assign("index.html")
};

//successfulLoad.style.display="none"

console.log(localStorage.getItem("id"))
//getUserMedia que usar del navegador e este caso audio no, video si
function getStreamAndRecord() {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { max: 720 },
      }, //navigator trae todo lo referente a la maquina
    })
    .then(function (stream) {
      video.srcObject = stream;
      video.play();
      let recorder = RecordRTC(stream, {
        type: "gif",
        frameRate: 1,
        quality: 10,
      });
      //crear gif
      document
        .querySelector(".button_capture")
        .addEventListener("click", function () {
          titleBox.textContent="Capturando Tu Guifo";
          recorder.startRecording();
          document.querySelector(".button_capture").style.display = "none";
          document.querySelector(".button_stop").style.display = "block";
          timerInput.style.display="block";
          timer();
        });
      //stop gif
      document
        .querySelector(".button_stop")
        .addEventListener("click", function () {
          recorder.stopRecording();
          document.querySelector(".upload_gif").style.display = "block";
          document.querySelector(".replay_gif").style.display = "block";
          document.querySelector(".button_stop").style.display = "none";
          let blob = recorder.getBlob();
          const objectURL = URL.createObjectURL(blob);
          console.log(objectURL);
          console.log((video2.src = objectURL));
          video.style.display = "none";
          video2.style.display = "block";
          titleBox.textContent="Vista Previa"
          stop();
        });

      //subir gif
      document
        .querySelector(".upload_gif")
        .addEventListener("click", function () {
          titleBox.textContent="Subiendo Guifo"
            bodyVideo.style.display = "none";
            loadGif.style.display = "flex";
            loadCancel.style.display="block";
            timerInput.style.display = "none";
            document.querySelector(".upload_gif").style.display = "none";
            document.querySelector(".replay_gif").style.display = "none";
            move();
          let blob = recorder.getBlob();
          let form = new FormData();
          form.append("file", blob, "gif.gif");
          fetch(urlUpload, {
            method: "POST",
            body: form,
          })
            .then((resp) => resp.json())
            .then((data) => {
              console.log(data.meta.status)
              if (data.error) {
                alert(data.errors);
              } else {
                localStorageGif(data);
              }
              if(data.meta.status == 200){
                sectionCreateGif.style.display="flex";
                containerVideo.style.display = "none";
                document.querySelector("#section3").style.display = "flex";
                document.querySelector(".title_my_gifos").style.display = "flex";
              }
              let idGif = JSON.parse(localStorage.getItem("id"));
              let id = idGif[idGif.length-1];
              let urlGif = "https://media.giphy.com/media/" + id + "/giphy.gif";
              lastGif.src = urlGif;
            });
        });

      //repetir captura
      document
        .querySelector(".replay_gif")
        .addEventListener("click", function () {
          document.querySelector(".button_capture").style.display = "block";
          document.querySelector(".replay_gif").style.display = "none";
          document.querySelector(".upload_gif").style.display = "none";
          video2.style.display = "none";
          video.style.display = "block";
          window.location.assign("upload.html");
        });
        //download gif
        document.querySelector(".download-button").addEventListener("click", function(){
            let blob = recorder.getBlob();
            invokeSaveAsDialog(blob);
        });
        document.querySelector(".download-link").addEventListener("click", function(){
                let idGif = JSON.parse(localStorage.getItem("id"));
                let id = idGif[idGif.length - 1];
                let urlGif = "https://media.giphy.com/media/" + id + "/giphy.gif";
                console.log(urlGif );
                var aux = document.createElement('input');
                aux.setAttribute('value', urlGif );
                document.body.appendChild(aux);
                aux.select();
                document.execCommand('copy');
                document.body.removeChild(aux);
        });
      // local storage
      function localStorageGif(data) {
        if (localStorage.getItem("id") === null) {
          idGif = [];
        } else {
          idGif = JSON.parse(localStorage.getItem("id"));
        }
        idGif.push(data.data.id);
        localStorage.setItem("id", JSON.stringify(idGif));
      }
    });
}

//estructura template_trend
function misGifosTemplete(img) {
  const newGif = document.createElement("div");
  const templateSection2 = `
            <div class="container_gif_1 col-3 ">
                <img src="${img}" alt="${img}">
            </div>
            `;
  newGif.innerHTML = templateSection2;
  misGifcontainer.appendChild(newGif);
}

function sectionMisGifos() {
  let idGif = JSON.parse(localStorage.getItem("id"));
  idGif.forEach(miGif);
  function miGif(i) {
    fetch(url + i + "?api_key=" + apiKey)
      .then((response) => response.json())
      .then((res) => {
        let element = res.data;
        let img = element.images.original.url;
        misGifosTemplete(img);
      });
  }
}
//crear gif
function createGif() {
  document.querySelector("#start").addEventListener("click", function () {
    containerVideo.style.display = "flex";
    containerCreateGif.style.display = "none";
    titleSection.parentElement.style.display = "none";
    document.querySelector("#section3").style.display = "none";
    getStreamAndRecord();
  });
}

//timer
var Time;
function timer() {
  Time = setInterval(TimeElapsed, 1000);
  var hour = 0;
  var min = 0;
  var Seconds = 1;
  function TimeElapsed() {
    if (Seconds == 60) {
      Seconds = 0;
      min = min + 1;
    }

    if (min == 60) {
      hour = hour + 1;
    }

    if (Seconds < 10) {
      Seconds = "0" + Seconds;
    }

    TimerText = document.querySelector(".timer-text");
    TimerText.innerHTML = hour + ":" + min + ":" + Seconds;
    Seconds++;
  }
}
function stop() {
  clearInterval(Time);
}
//load
var num = 0;
function move() {
  if (num == 0) {
    num = 1;
    var elem = document.getElementById("file");
    var width = 0;
    var id = setInterval(frame, 50);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.value = width;
      }
    }
  }
}



//llamado a funcion
createGif();
sectionMisGifos();

/* if (elem.value == 100) {
        successfulLoad.style.display="flex"    
    }*/