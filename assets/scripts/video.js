const video = document.querySelector("#videoGif");
const containerVideo = document.querySelector(".container_video")
containerVideo.style.display = "none";
const containerCreateGif = document.querySelector(".container_createGif");
containerCreateGif.style.display = "none";
const titleSection = document.querySelector(".title_buscar");
/*navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(async function(stream) {
    let recorder = RecordRTC(stream, {
        type: 'video'
    });
    recorder.startRecording();

    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(3000);

    recorder.stopRecording(function() {
        let blob = recorder.getBlob();
        invokeSaveAsDialog(blob);
    });
}); */

function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    }).then(function (stream) {
        video.srcObject = stream;
        video.play()
        let recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
        });
        document.querySelector(".button_capture").addEventListener("click", function(){
            recorder.startRecording();
        })
        //const sleep = m => new Promise(r => setTimeout(r, m));
        //await sleep(3000);

        //recorder.stopRecording(function () {
        //    let blob = recorder.getBlob();
         //   invokeSaveAsDialog(blob);
       // });
    });
}

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

//-----------------------------------
//llamado a libreria recordRTC  





//llamado a funcion
clearScreen();
createGif();




