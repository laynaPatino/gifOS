
function themes(){
    document.querySelector(".SailorNight")
    .addEventListener("click",function(){
        const theme = document.body
        theme.classList.add("dark_theme");
        document.getElementById("logo_img").src="/assets/img/gifOF_logo_dark.png";
    });
    document.querySelector(".SailorDay")
    .addEventListener("click",function(){
        const theme = document.body
        theme.classList.remove("dark_theme");
        document.getElementById("logo_img").src="/assets/img/gifOF_logo.png";
    });  
};

themes();