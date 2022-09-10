"use strict";
var L05_Einkaufsliste;
(function (L05_Einkaufsliste) {
    window.addEventListener("load", handleLoad);
    let allEntries = [];
    let names = [];
    let counts = [];
    let comments = [];
    function handleLoad(_event) {
        console.log("Init");
        L05_Einkaufsliste.generateContent(L05_Einkaufsliste.data);
        let form = document.querySelector("div#form");
        // let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("input#amount");
        form.addEventListener("change", handleChange);
        //slider.addEventListener("input", displayAmount);
        //displayList();
        let button = document.querySelector("#add");
        button.addEventListener("pointerdown", displayList);
        addData(L05_Einkaufsliste.data);
    }
    function handleChange(_event) {
        //displayList();
        console.log("Change");
    }
    function displayList() {
        let formData = new FormData(document.querySelector("form"));
        let newEntry = document.createElement("div");
        for (let entry of formData) {
            let entryName;
            let entryCount;
            let entryComment;
            switch (entry[0]) {
                case "Name":
                    console.log("CaseName" + entry[1]);
                    entryName = String(entry[1]);
                    newEntry.innerText = entryName + "\n";
                    break;
                case "Count":
                    console.log("CaseCount" + entry[1]);
                    entryCount = String(entry[1]);
                    newEntry.innerText += " " + entryCount + "\n";
                    break;
                case "Comment":
                    console.log(("CaseComment" + entry[1]));
                    entryComment = String(entry[1]);
                    newEntry.innerText += " " + entryComment + "\n";
                    break;
                default:
                    console.log("Default");
            }
            let list = document.querySelector("#list");
            list.appendChild(newEntry);
        }
        let entryDate;
        let date = new Date;
        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear();
        entryDate = day + "/" + month + "/" + year;
        newEntry.innerHTML += "" + entryDate;
        console.log(newEntry);
        let radio = document.createElement("input");
        radio.type = "radio";
        radio.setAttribute("class", "center");
        newEntry.appendChild(radio);
        let trash = document.createElement("i");
        trash.setAttribute("class", "fa-solid fa-trash-can");
        trash.setAttribute("id", "delete");
        trash.addEventListener("pointerdown", handleDelete);
        newEntry.appendChild(trash);
        allEntries.push(newEntry);
        let list = document.querySelector("#list");
        list.appendChild(newEntry);
    }
    function addData(_data) {
        for (let category in _data) {
            let item = _data[category];
            switch (category) {
                case "Name":
                    pushNames(item);
                    break;
                case "Count":
                    pushCount(item);
                    break;
                case "Comment":
                    pushComment(item);
                default:
                    break;
            }
        }
        buildList();
    }
    function pushNames(_item) {
        for (let entry of _item) {
            names.push(entry.name);
            console.log("EntryName " + entry.name + "namesArray " + names);
            //buildList();
        }
    }
    function pushCount(_item) {
        for (let entry of _item) {
            counts.push(entry.name);
        }
    }
    function pushComment(_item) {
        for (let entry of _item) {
            comments.push(entry.name);
        }
    }
    function buildList() {
        let list = document.querySelector("#list");
        let entryDate;
        let date = new Date;
        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear();
        entryDate = day + "/" + month + "/" + year;
        console.log(names + " " + counts + " " + comments + " Arrays");
        for (let index = 0; index <= names.length - 1; index++) {
            console.log(index + " index");
            let newEntry = document.createElement("div");
            newEntry.innerText = names[index] + " " + counts[index] + " " + comments[index] + " " + entryDate;
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.setAttribute("class", "center");
            newEntry.appendChild(radio);
            let trash = document.createElement("i");
            trash.setAttribute("class", "fa-solid fa-trash-can");
            trash.setAttribute("id", "delete");
            trash.addEventListener("pointerdown", handleDelete);
            newEntry.appendChild(trash);
            list.appendChild(newEntry);
        }
    }
    function handleDelete(_event) {
        console.log(_event);
        let target = _event.target;
        let parent = target.parentElement;
        parent.remove();
    }
})(L05_Einkaufsliste || (L05_Einkaufsliste = {}));
//# sourceMappingURL=L04Script.js.map