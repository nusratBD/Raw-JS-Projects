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
const mySurah=JSON.parse(localStorage.getItem("my-surah"));
document.addEventListener("DOMContentLoaded",()=>{
    if(mySurah){
        surahDetail(mySurah);
    }else{
        surahContainer.innerHTML="";
    }
})
// console.log(mySurah);
const surahDetail=(data)=>{
    // console.log(data);
    surahName.textContent=`${data.surahNo}. ${data.surahName}`;
    data.arabic1.forEach((arabic,index)=>{
        surahContainer.innerHTML+=`
        <p><strong>${index+1}.</strong> ${arabic}<p>
        <p> ${data.english[index]}<p>
        <button onclick="bookmarkAyah('${index+1}', '${data.surahName}','${arabic}', '${data.english[index]}')" id="${data.surahName}-${index+1}">⭐ Bookmark</button>
        `;
    })
}
//Show All Surahs
document.addEventListener("DOMContentLoaded",()=>{
    fetch(`https://quranapi.pages.dev/api/surah.json`)
    .then(res=>res.json())
    .then(data=>{;
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
    // console.log(data);
    surahDetail(data);
    localStorage.setItem("my-surah",JSON.stringify(data));
});
}
//Book Mark Specific Ayah
const allBookMarks=JSON.parse(localStorage.getItem("book-mark"))||[];
document.addEventListener("DOMContentLoaded",()=>{
    allBookMarks.forEach(mark=>
        {
            const bBtnId=mark.name+"-"+mark.id;

        const bookMarkBtn=document.getElementById(bBtnId);

        bookMarkBtn.setAttribute("disabled", true);
        }
        );
})
const bookmarkAyah=(id, name,arabic,english)=>{
    id=parseInt(id);
    const btnId=name+"-"+(id);

    const bookMark={
        id:id,
        name:name,
        arabic:arabic,
        english:english
    }
    allBookMarks.push(bookMark);
    const bBtnId=name+"-"+id;
        const bookMarkBtn=document.getElementById(bBtnId);
        bookMarkBtn.setAttribute("disabled", true);
    showToast("✅ Bookmark added!");
    localStorage.setItem("book-mark",JSON.stringify(allBookMarks));
}
//Show Toast
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show"; setTimeout(() => {
      toast.className = "toast";
    }, 3000);
  }
//Show BookMarked Ayahs
const bookmarkModal=document.getElementById("bookmarkModal");
const bookMarkList=document.getElementById("bookmarkList");
const showBookMark=()=>{
    bookmarkModal.style.display="block";
    bookMarkList.innerHTML="";
    if( allBookMarks.length==0){
        bookMarkList.innerHTML = "<p>No bookmarks found.</p>";
    }else{
        allBookMarks.forEach(bookMark=>{
            bookMarkList.innerHTML+=`<p><strong>${bookMark.name}-${bookMark.id}: </strong>${bookMark.arabic}</p>
            <p>${bookMark.english}</p>
            <button onclick="showBookMark()" >⭐ UnBookmark</button>`
        })
    }
}
//Close BookMark Model
const closeBookmarkModal=()=>{
    bookmarkModal.style.display="none";
}