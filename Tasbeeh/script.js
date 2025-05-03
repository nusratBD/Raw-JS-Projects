let getCount=localStorage.getItem("count")||0;
const countDisplay=document.getElementById("countDisplay");
countDisplay.textContent=getCount;
const incrementCount=()=>{
getCount++;
countDisplay.textContent=getCount;
localStorage.setItem("count",getCount);
}
const resetCount=()=>{
    localStorage.removeItem("count");
    countDisplay.textContent=0;
}