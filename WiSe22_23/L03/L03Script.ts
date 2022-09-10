window.addEventListener("load", handleLoad);

let notBought: HTMLElement | null;
let toggleBuy: HTMLElement | null;
let deleted: HTMLElement | null;
let add: HTMLElement | null;

let checkBought: boolean = false;

function handleLoad (): void {

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

function changeStatus(): void {
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

function handleDelete (): void {
    console.log("delete");
    let newGood: HTMLElement = <HTMLElement>document.querySelector("#newGood1");
    newGood.remove();
    
}

function addNewGood (): void {
    console.log("Add");
    let newGood: HTMLElement = <HTMLElement>document.createElement("div");
    
}
