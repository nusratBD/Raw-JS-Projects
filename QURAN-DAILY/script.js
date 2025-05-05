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
//Show All Surahs
document.addEventListener("DOMContentLoaded",()=>{
    fetch(`https://quranapi.pages.dev/api/surah.json`)
    .then(res=>res.json())
    .then(data=>{console.log(data);
        const surahList=document.getElementById("surahList");
        data.forEach((surah,index) => {
            surahList.innerHTML+=`
                <button style="margin:2px" onclick="searchSurah(${index+1})">${index+1}. ${surah.surahName}</button>
            `;
        });
    });
})
//Show Specific Surah
const surahName=document.getElementById("surahName");
const surahContainer=document.getElementById("surahContainer");
const searchSurah=(surahNumber)=>{
surahContainer.innerHTML="";
fetch(`https://quranapi.pages.dev/api/${surahNumber}.json`)
.then(res=>res.json())
.then(data=>{
    console.log(data);
    surahName.textContent=`${surahNumber}. ${data.surahName}`;
    data.arabic1.forEach((arabic,index)=>{
        surahContainer.innerHTML+=`
        <p><strong>${index+1}.</strong> ${arabic}<p>
        <p> ${data.english[index]}<p>
        `;
    })
});
}
