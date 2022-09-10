"use strict";
window.addEventListener("load", handleLoad);
let notBought;
let toggleBuy;
let deleted;
let add;
let checkBought = false;
function handleLoad() {
    toggleBuy = document.querySelector(".notBought");
    notBought = document.querySelector("#circle");
    if (notBought != null)
        notBought.addEventListener("pointerdown", changeStatus);
    deleted = document.querySelector(".delete");
    if (deleted != null)
        deleted.addEventListener("pointerdown", handleDelete);
    add = document.querySelector(".add");
    if (add != null)
        add.addEventListener("pointerdown", addNewGood);
}
function changeStatus() {
    console.log("bought");
    if (notBought != null) {
        notBought.remove();
        if (notBought.style.color == "red") {
            notBought.style.color = "green";
        }
        //if (checkBought == true) {
        //notBought.style.color = "red";
        // checkBought = false; }
        //if (checkBought == false) {
        //  notBought.style.color = "LimeGreen";
        //checkBought = true;
        // }
    }
    //notBought.remove();  
}
function handleDelete() {
    console.log("delete");
    let newGood = document.querySelector("#newGood1");
    newGood.remove();
}
function addNewGood() {
    console.log("Add");
    let newGood = document.createElement("div");
}
//# sourceMappingURL=L03Script.js.map