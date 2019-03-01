var input = document.getElementById('input');
var btnSend = document.getElementById('add');
var btnClearAll = document.getElementById('clearAll');
var btnSave = document.getElementById('save');
var list = document.getElementById('list');

// Adds a count to localstorage if there is no count
if (localStorage.count === false) {
    localStorage.count = 0;
}

// Adds the text to the list
function add() {
    if (input.value !== '') {
        var newLi = document.createElement("li");
        newLi.classList.add("item");
        newLi.setAttribute("id", "list" + localStorage.count);
        // Things so you can drag them
        newLi.setAttribute("draggable", "true");
        newLi.setAttribute("ondragstart", "drag(event)");
        
        list.appendChild(newLi);

        var newP = document.createElement("p");
        var txt = document.createTextNode(input.value);
        newP.classList.add("text");
        newP.appendChild(txt);
        //newP.setAttribute("id", "row" + count);
        newLi.appendChild(newP);

        var newB = document.createElement("button");
        newB.innerHTML = "X";
        newB.classList.add("remove");
        newB.setAttribute("id", "row" + localStorage.count);
        newB.setAttribute("onClick", "remove("+ localStorage.count +")");
        newLi.appendChild(newB);

        input.value = "";
        input.focus();

        localStorage.count = Number(localStorage.count) + 1;
    }
}

// Clears the list and saves
function clearAll() {
    list.innerHTML = "";
    save();
    localStorage.count = 0;
    input.focus();
}

// Removes the item from the list when you press the X and saves
function remove(ID) {
    document.getElementById("row" + ID).parentElement.remove();
    save();
    input.focus();
}

// When you press enter it runs the add() function
input.addEventListener("keyup", function(key){
    if (key.keyCode === 13) {
        btnSend.click();
    }
});

// Saves the list in local storage
function save() {
    if (typeof(Storage) !== "undefined") {
        localStorage.hold = list.innerHTML;
        console.log(localStorage.hold);
    } else {
        console.log('You dont have local storage');
    }
}
// I dont know how the drag and drop functions work yet
let draggedBox;

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log(ev.target.id);
    //ev.dataTransfer.effectAllowed = "move";
    draggedBox = ev.target;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    // Checks if it drops on a list item
    //ev.preventDefault();
    if (ev.target.id == '') {
        console.log('tried to put it in the pharagraph')
        swapBox(draggedBox, ev.target.parentElement);
    } else if (ev.target.id !== "list") {
        swapBox(draggedBox, ev.target);
    } 
    
}

// Swaps the boxses
function swapBox(elem1, elem2) {
    let clonedElem1 = elem1.cloneNode(true);
    let clonedElem2 = elem2.cloneNode(true);

    elem2.parentNode.replaceChild(clonedElem1, elem2);
    elem1.parentNode.replaceChild(clonedElem2, elem1);
}

input.focus();

// Makes the page load with the saved list
list.innerHTML = localStorage.hold;

btnSend.addEventListener("click", add);
btnClearAll.addEventListener("click", clearAll);
btnSave.addEventListener("click", save);
