//Day & Night Mode
let modeData=localStorage.getItem("mode");
if(modeData=="night"){
    document.body.classList.add("mode");
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