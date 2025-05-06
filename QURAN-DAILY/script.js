//Show Surah List on Left Side Bar
document.addEventListener("DOMContentLoaded",async()=>{
    await fetch(`https://quranapi.pages.dev/api/surah.json`)
    .then( res=> res.json())
    .then(data=>{
        const surahList=document.getElementById("surahList");
        data.forEach((surah,index) => {
            surahList.innerHTML+=`
                <button style="margin:2px" onclick="searchSurah(${index+1})">${index+1}. ${surah.surahName}</button>
            `;
        });
    });
})
//Show Specific Surah if You Select Before
const mySurah=JSON.parse(localStorage.getItem("my-surah"));
document.addEventListener("DOMContentLoaded",()=>{
    if(mySurah){
        surahDetail(mySurah);
    }else{
        surahContainer.innerHTML="";
    }
})
//Specific Surah Detail Layout
const surahDetail=(data)=>{
    surahName.textContent=`${data.surahNo}. ${data.surahName}`;
    data.arabic1.forEach((arabic,index)=>{
        surahContainer.innerHTML+=`
        <p><strong>${index+1}.</strong> ${arabic}<p>
        <p> ${data.english[index]}<p>
        <button onclick="bookmarkAyah('${index+1}', '${data.surahName}','${arabic}', '${data.english[index]}')" id="${data.surahName}-${index+1}">⭐ Bookmark</button>
        `;
    })
}
//Show Specific Surah when Cliking on the Name from left Side Bar
const surahName=document.getElementById("surahName");
const surahContainer=document.getElementById("surahContainer");
const searchSurah=async(surahNumber)=>{
surahName.textContent="Surah Loading....";
surahName.style.color="#00897b";
surahContainer.innerHTML="";
await fetch(`https://quranapi.pages.dev/api/${surahNumber}.json`)
.then(res=>res.json())
.then(data=>{
    surahName.style.color="black";
    surahDetail(data);
    localStorage.setItem("my-surah",JSON.stringify(data));
});
}
//Book Mark Specific Ayah from the Surah
let allBookMarks=JSON.parse(localStorage.getItem("book-mark"))||[];
document.addEventListener("DOMContentLoaded",()=>{
    allBookMarks.forEach(mark=>
        {
            const bBtnId=mark.name+"-"+mark.id;
            const bookMarkBtn=document.getElementById(bBtnId);
            bookMarkBtn.setAttribute("disabled", true);
        }
        );
})
//Bookmark Successful Message
const bookmarkAyah=(id, name,arabic,english)=>{
    id=parseInt(id);
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
//Bookmark successful message operation
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show"; setTimeout(() => {
      toast.className = "toast";
    }, 3000);
  }
//Show BookMarked Ayahs cliking on All Bookmarks Button
const bookmarkModal=document.getElementById("bookmarkModal");
const bookMarkList=document.getElementById("bookmarkList");
const showBookMark=()=>{
    bookmarkModal.style.display="block";
    bookMarkList.innerHTML="";
    if( allBookMarks.length==0){
        bookMarkList.innerHTML = "<p>No bookmarks found.</p>";
    }else{
        allBookMarks.forEach(bookMark=>{
            bookMarkList.innerHTML+=`<div  id="${bookMark.id}-${bookMark.name}">
                <p><strong>${bookMark.name}-${bookMark.id}: </strong>${bookMark.arabic}</p>
            <p>${bookMark.english}</p>
            <button onclick="UnBookmark('${bookMark.name}','${bookMark.id}')">⭐ UnBookmark</button>
            </div>`
        })
    }
}
//Close BookMark Model while cliking on close button
const closeBookmarkModal=()=>{
    bookmarkModal.style.display="none";
}
//UnBookmark
const UnBookmark=(name,id)=>{
    const divId=id+"-"+name;
    const unBookmarkdiv=document.getElementById(divId);
    unBookmarkdiv.remove();
    const filterUnBookMark=allBookMarks.filter(bookMark=>bookMark.id!=id||bookMark.name!=name);
    allBookMarks=[...filterUnBookMark];
    localStorage.setItem("book-mark",JSON.stringify(allBookMarks));
    showBookMark();
    const bBtnId=name+"-"+id;
    document.getElementById(bBtnId).removeAttribute("disabled");
}