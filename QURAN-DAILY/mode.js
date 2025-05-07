//Day & Night Mode
let modeData=localStorage.getItem("mode");
const toast=document.getElementById("toast");
if(modeData=="night"){
    document.body.classList.add("mode");
    toast.classList.add("mode");
}else{
    document.body.classList.remove("mode");
}
const toggleDarkMode=()=>{
    if(modeData=="night"){
        document.body.classList.toggle("mode");
        localStorage.setItem("mode", "day");
    }else{
        document.body.classList.toggle("mode");
        localStorage.setItem("mode", "night");
    }
}