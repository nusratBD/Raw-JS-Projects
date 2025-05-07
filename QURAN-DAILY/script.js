let allBookMarks = JSON.parse(localStorage.getItem("book-mark")) || [];
const loading = document.getElementById("loading");
//API: All Surah List
const allSurahApi = async () => {
    const res = await fetch(`https://quranapi.pages.dev/api/surah.json`);
    const data = res.json();
    return data;
}
//API: Specific Surah Search
const SpecificSurahApi = async (surahNumber) => {
    const res = await fetch(`https://quranapi.pages.dev/api/${surahNumber}.json`);
    const data = res.json();
    return data;
}
//Show Surah List on Left Side Bar
document.addEventListener("DOMContentLoaded", () => {
    loading.innerHTML = `<h2>Loading...</h2>`;
    allSurahApi().then(data => {
        loading.innerHTML = "";
        const surahList = document.getElementById("surahList");
        data.forEach((surah, index) => {
            surahList.innerHTML += `
                <button style="margin:2px" onclick="searchSurah(${index + 1})">${index + 1}. ${surah.surahName}</button>
            `;
        });
    });
})
//Show Specific Surah if You Select Before
const mySurah = JSON.parse(localStorage.getItem("my-surah"));
document.addEventListener("DOMContentLoaded", () => {
    if (mySurah) {
        surahDetail(mySurah);
    } else {
        surahContainer.innerHTML = "";
    }
})
//Specific Surah Detail Layout
const surahDetail = (data) => {
    surahName.textContent = `${data.surahNo}. ${data.surahName}`;
    data.arabic1.forEach((arabic, index) => {
        surahContainer.innerHTML += `
  <p><strong>${index + 1}.</strong> ${arabic}</p>
  <p>${data.english[index]}</p>
  ${allBookMarks
                .filter(mark => mark.name === data.surahName && mark.id == index + 1)
                .length > 0
                ? `<button onclick="bookmarkAyah('${index + 1}', '${data.surahName}','${arabic}', '${data.english[index]}')" id="${data.surahName}-${index + 1}" disabled>⭐ Bookmark</button>`
                : `<button onclick="bookmarkAyah('${index + 1}', '${data.surahName}','${arabic}', '${data.english[index]}')" id="${data.surahName}-${index + 1}">⭐ Bookmark</button>`
            }
            `;
    })
}
//Show Specific Surah when Cliking on the Name from left Side Bar
const surahName = document.getElementById("surahName");
const surahContainer = document.getElementById("surahContainer");
const searchSurah = async (surahNumber) => {
    surahName.textContent = "Surah Loading....";
    surahContainer.innerHTML = "";
    SpecificSurahApi(surahNumber).then(data => {
        surahDetail(data);
        localStorage.setItem("my-surah", JSON.stringify(data));
    });
}
//Bookmark Successful Message
const bookmarkAyah = (id, name, arabic, english) => {
    id = parseInt(id);
    const bookMark = {
        id: id,
        name: name,
        arabic: arabic,
        english: english
    }
    allBookMarks.push(bookMark);
    const bBtnId = name + "-" + id;
    const bookMarkBtn = document.getElementById(bBtnId);
    bookMarkBtn.setAttribute("disabled", true);
    showToast("✅ Bookmark added!");
    localStorage.setItem("book-mark", JSON.stringify(allBookMarks));
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
const bookmarkModal = document.getElementById("bookmarkModal");
const bookMarkList = document.getElementById("bookmarkList");
const showBookMark = () => {
    bookMarkList.innerHTML = "";
    if (allBookMarks.length == 0) {
        bookMarkList.innerHTML = "<p>No bookmarks found.</p>";
    } else {
        allBookMarks.forEach(bookMark => {
            bookMarkList.innerHTML += `<div  id="${bookMark.id}-${bookMark.name}">
                <p><strong>${bookMark.name}-${bookMark.id}: </strong>${bookMark.arabic}</p>
            <p>${bookMark.english}</p>
            <button onclick="UnBookmark('${bookMark.name}','${bookMark.id}')">⭐ UnBookmark</button>
            </div>
        `})
    }
    bookmarkModal.style.display = "block";
}
//Close BookMark Model while cliking on close button
const closeBookmarkModal = () => {
    bookmarkModal.style.display = "none";
}
//UnBookmark
const UnBookmark = (name, id) => {
    const divId = id + "-" + name;
    const unBookmarkdiv = document.getElementById(divId);
    unBookmarkdiv.remove();
    const filterUnBookMark = allBookMarks.filter(bookMark => bookMark.id != id || bookMark.name != name);
    allBookMarks = [...filterUnBookMark];
    localStorage.setItem("book-mark", JSON.stringify(allBookMarks));
    showBookMark();
    const bBtnId = name + "-" + id;
    document.getElementById(bBtnId).removeAttribute("disabled");
}
//Specific Ayah Search
const modal = document.getElementById("ayahModal");
const closeBtn = document.querySelector(".close");
const searchInput = document.getElementById("searchInput");
const modalSurahTitle = document.getElementById("modalSurahTitle");
const modalAyahArabic = document.getElementById("modalAyahArabic");
const modalAyahEnglish = document.getElementById("modalAyahEnglish");
allSurahApi().then(res => {
            //Configure Fuse.js
            const fuse = new Fuse(res, {
                keys: ["surahName"],
                threshold: 0.7,
            });
            document.getElementById("searchBtn").addEventListener("click", () => {
                const input = searchInput.value.trim();
                if (input === "") return;
                const verseNumber = input.match(/\d+/);
                const surahName = input.replace(/\d+/, '').trim();
                const result = fuse.search(surahName);
                if(result.length==0){
                    message("Please Enter The Right Surah Name.","","");
                        return;
                }
                if(!verseNumber){
                    message("You Didn't Enter Ayah Number.","","");
                        return;
                }
                const verseIndex = parseInt(verseNumber[0]) - 1;
                res.forEach(async (s, i) => {
                    if (s.surahName == result[0].item.surahName) {
                        SpecificSurahApi(i+1).then(data => {
                                const arabic = data.arabic1;
                                const english = data.english;
                                if(arabic[verseIndex]&&english[verseIndex]){
                                    message(`${result[0].item.surahName} - Ayah ${verseIndex + 1}`, arabic[verseIndex],english[verseIndex])
                                }
                                else{
                                    message("Your Ayah Number doesn't exist to the Surah.","","");
                                }
                            });
                    }                   
                });
                
            });
    })

    const message=(message,arabic,english)=>{
    modalSurahTitle.textContent = message;
    modalAyahArabic.textContent = arabic;
    modalAyahEnglish.textContent = english;
    modal.style.display = "block";
}
document.getElementById("close").addEventListener("click",()=>{
    modal.style.display="none";
})