export const getData=async()=>{
await fetch(`https://quranapi.pages.dev/api/surah.json`);
const res=data.json();
return res;
}