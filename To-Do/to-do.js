const todoContent=document.getElementById('todoContent');
let getData=JSON.parse(localStorage.getItem("to-do"))||[];
const dataStringify =(data)=>{
    console.log(data);
    let tasks= JSON.stringify(data);
    localStorage.setItem("to-do",tasks);
}
const dataForEach=(datas)=>{
    datas.forEach(data=>html(data));
}
let html=(data)=>{
    // console.log(data.todo);
    todoContent.innerHTML+=`
    <div class="row" id="${data.id}">
            <p class="col-6 ${data.status=="Undo"?'text-success fw-bold':''}" id="p-${data.id}">${data.todo}</p>
            <p class="col-3">${data.time}</p>
            <div class="col-3">
            <div class="btn-group d-flex justify-content-end" role="group" aria-label="Basic mixed styles example">
                <button type="button" class="btn btn-danger" onclick="deleteData('${data.id}')">Delete</button>
                <button type="button" class="btn btn-success" onclick="finishData('${data.id}')" id="b-${data.id}">${data.status}</button>
              </div>
            </div>
        </div>
    `;
}
dataForEach(getData);
let handleAddTask=()=>{
    const toDo=document.getElementById('todoData');
    const toDoValue=toDo.value.trim();
    const now=new Date();
    const timestamp = now.toLocaleString();
    if(!toDoValue){
        alert("Please Enter Your Task");
    }
    else{
        let task={
            id:Math.random(),
            time:timestamp,
            todo:toDoValue,
            status:"Finish"
        };
        html(task);
    getData.push(task);
    dataStringify(getData);
        
    }
    toDo.value='';
}
let deleteData=(id)=>{
    let d=document.getElementById(id);
    d.remove();
    console.log(d);
        let updateData=getData.filter(data=>data.id!=id);
        getData=[...updateData];
        // dataForEach(getData);
        dataStringify(getData);
    }
let finishData=(id)=>{
    let updateData=getData.find(data=>data.id==id);
    let button=document.getElementById("b-"+id);
    let paragraph=document.getElementById("p-"+id);color="green";
    if(updateData.status=="Finish"){
        updateData.status="Undo";
        paragraph.style.color="green";
        paragraph.style.fontWeight="bold";
        button.innerText=`${updateData.status}`;
    }else{
        updateData.status="Finish";
        button.innerText=`${updateData.status}`;
        paragraph.style.color="black";
        paragraph.style.fontWeight="normal";
    }
    dataStringify(getData);
}
let deleteAll=()=>{
    localStorage.removeItem("to-do");
    todoContent.innerHTML="";
}
