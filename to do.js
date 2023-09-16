let addTask=document.getElementById("addTask");
let inputTask=document.getElementById("inputTask");
let clear=document.getElementById("clear");
let unolist=document.getElementsByClassName("unolist");
let FilterTasks=document.getElementById("FilterTasks");
let done=document.getElementById("done");


let Array=[];


if (localStorage.Task != null){
    Array=JSON.parse(localStorage.Task)
}else{
    Array=[];
}
window.onload=showdata()

addTask.addEventListener("click",function(){
    let tsk={
        isCompleted:false,
        tasktitle:inputTask.value,
    }
    clearError("inputError");
    if (inputTask.value.trim() === ""){
        showError("inputError","You have to enter a valid task to do");
        inputTask.value="";
    }else{
    Array.push(tsk);
    localStorage.setItem(`Task`,JSON.stringify(Array));
    inputTask.value="";
    showdata();
    }});

function showdata(){
    let li="";
    for(let i=0;i<Array.length;i++){
        li += `<ul class="unolist ${Array[i].isCompleted ? 'completed' : ''}"><li class="taskk">${Array[i].tasktitle}
        <img  onclick="taskDone(${i})" id="done" src="check-mark.png">
        <img onclick="deleteTask(${i})" id="cross" src="remove.png"></li></ul>`
    }
    document.querySelector(".liste").innerHTML = li;
}

clear.addEventListener("click",function(){
    localStorage.clear();
    Array=[];
    showdata();
});

function deleteTask(i){
    Array.splice(i,1);
    localStorage.Task=JSON.stringify(Array);
    showdata();
}

function taskDone(i){
    Array[i].isCompleted = !Array[i].isCompleted; 

    if (Array[i].isCompleted) {
        unolist[i].classList.add("completed"); 
    } else {
        unolist[i].classList.remove("completed"); 
    }

    localStorage.Task = JSON.stringify(Array);
    showdata();
}

function searchData(value){
    let li="";
    for(let i=0;i<Array.length;i++){
    if(Array[i].tasktitle.includes(value.toLowerCase())){
        li += `<ul class="unolist"><li class="taskk">${Array[i].tasktitle} 
        <img  onclick="taskDone(${i})" id="done" src="check-mark.png">
        <img onclick="deleteTask(${i})" id="cross" src="remove.png"></li></ul>`
    document.querySelector(".liste").innerHTML = li;
}}}

function showError(errorElement,errorMessage){
    document.querySelector("."+errorElement).style.display="block";
    document.querySelector("."+errorElement).innerHTML=errorMessage;
}

function clearError(errorElement){
    document.querySelector("."+errorElement).style.display="none";
}

