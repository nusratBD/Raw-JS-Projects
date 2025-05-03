let mode=localStorage.getItem("mode");
if(mode=="dark"){
    document.body.classList.add("dark");
}
const toggleDarkMode=()=> {
    document.body.classList.toggle("dark");
    if(mode=="dark"){
        mode="white";
        localStorage.setItem("mode",mode);
    }else{
        mode="dark";
        localStorage.setItem("mode",mode);
    }
  }