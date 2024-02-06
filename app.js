"use strict";
// localStorage.clear();
let task;
let ajout = document.getElementById("ajout");
let text = document.getElementById("text");
let error = document.getElementById("erreur");

const TASK_SAVE = "task-save";

if(localStorage.getItem(TASK_SAVE) == null){
    task = []
}else{
    task = loadFromLocalStorage(TASK_SAVE)
}

refresh();

function loadFromLocalStorage(name){
    //convertion chaine de caractère en JSON grace au parse()
    return JSON.parse(localStorage.getItem(name))
}

function saveToLocalStorage(name, data){
    //convertion de l'objet en chaîne
    localStorage.setItem(name, JSON.stringify(data))
}

function clickAndSaveTask(){
    let content = getFormFieldValue('#text');
    if(content.trim() == ""){
        error.style.display = "flex";
    }else{
        error.style.display = "none";
        createTask(content);
        saveToLocalStorage(TASK_SAVE, task);
        refresh();
    }
}

function getFormFieldValue(selector){
    let input;
    input = document.querySelector(selector)
    return input.value
}

function createTask(content) {
    task.push({
        content: content,
    })
}

function refresh(){
    //l'élément d'affichage dans le DOM
    const ul = document.getElementById("task-save")
    ul.innerHTML = null
    let lgTask = task.length
    for(let i = 0; i <lgTask ; i++){
        ul.innerHTML +=
        `<li class="card">
        <input type="checkbox" class="check">
        <p class="cardTitle">${task[i].content}</p>
        <i class="fa-solid fa-trash" data-task="${i}"></i>
        </li>`
    }
    checked();
    deleted();
}

ajout.addEventListener("click", (event) =>{
    event.preventDefault();
    clickAndSaveTask();
})

function checked(){
    let lgTask = task.length;
    let title = document.getElementsByClassName("cardTitle");
    let check = document.getElementsByClassName("check");
    for(let i = 0; i<lgTask; i++){
        let valid = true;
        
        check[i].addEventListener("click", ()=>{
            if(valid){
                title[i].style.textDecoration = "line-through"
                title[i].style.color = "#dddcdc"

                valid = false;
            }else{
                title[i].style.textDecoration = "none"
                title[i].style.color = "black"
                valid = true;
            }
        })
    }
}

function deleted(){
    loadFromLocalStorage(task)
    let lgTask = task.length;
    let trash = document.querySelectorAll(".fa-trash");
    for(let i = 0; i<lgTask; i++){
        
            trash[i].addEventListener("click", ()=>{
                if(confirm("Voulez-vous vraiment supprimé la tâche ?")){
                    task.splice(i,1);
                    saveToLocalStorage(TASK_SAVE,task);
                    refresh();
                }
            })
    }
}
