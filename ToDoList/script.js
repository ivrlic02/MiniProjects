const inputBox = document.getElementById("input-box");
const list = document.getElementById("list-todo");
const button = document.getElementById("add-button");

button.addEventListener("click", function(e){
    if(inputBox.value === ""){
        alert("You must write the task");
    }else{
        // first version
        // let li = document.createElement("li");
        // li.innerHTML = inputBox.value;
        // list.appendChild(li);
        // let span = document.createElement("span");
        // li.appendChild(span);

        // alternative for no effect while hovering span element
        let li = document.createElement("li");
        list.appendChild(li);
        let p = document.createElement("p");
        p.innerHTML = inputBox.value;
        li.appendChild(p);
        let span = document.createElement("span");
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
})

list.addEventListener("click", function(e){
    // first version
    // if(e.target.tagName === "LI"){
    // e.target.classList.toggle("checked");)} else if...

    if(e.target.tagName === "P"){
        e.target.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", list.innerHTML);
}
function showTask(){
    list.innerHTML = localStorage.getItem("data");
}
showTask();