"use strict";
var L06_Einkaufsliste;
(function (L06_Einkaufsliste) {
    window.addEventListener("load", handleLoad);
    let allEntries = [];
    let names = [];
    let counts = [];
    let comments = [];
    let form;
    let url = "https://webuser.hs-furtwangen.de/~herbigli/L06_Data";
    async function handleLoad(_event) {
        form = document.querySelector("#form");
        let submit = document.querySelector("#add");
        submit.addEventListener("pointerdown", sendEntry);
        let response = await fetch("L06Data.json");
        let entryNew = await response.text();
        let data = JSON.parse(entryNew);
        L06_Einkaufsliste.generateContent(data);
        let button = document.querySelector("#add");
        button.addEventListener("pointerdown", displayList);
        addData(data);
    }
    async function sendEntry() {
        let form = document.querySelector("#form");
        //let formData: FormData = new FormData(form);
        let formData = new FormData(form);
        let json = {};
        for (let key of formData.keys())
            if (!json[key]) {
                let values = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }
        //let query: URLSearchParams = new URLSearchParams(<any>formData);
        //await fetch("L06.html?" + query.toString());
        //alert("Entry added :)");
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Entries");
        query.set("data", JSON.stringify(json));
        console.log(query.toString() + "     queryToString");
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        alert(responseText);
    }
    function displayList() {
        //console.log("displayList");
        let formData = new FormData(form);
        let newEntry = document.createElement("div");
        for (let entry of formData) {
            let entryName;
            let entryCount;
            let entryComment;
            switch (entry[0]) {
                case "name":
                    console.log("CaseName" + entry[1]);
                    entryName = String(entry[1]);
                    newEntry.innerText = entryName + "\n";
                    break;
                case "count":
                    console.log("CaseCount" + entry[1]);
                    entryCount = String(entry[1]);
                    newEntry.innerText += " " + entryCount + "\n";
                    break;
                case "comment":
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
        let query = new URLSearchParams();
        query.set("command", "find");
        query.toString();
        console.log(query + "queryCommandFind");
        for (let category in _data) {
            let item = _data[category];
            switch (category) {
                case "name":
                    pushNames(item);
                    break;
                case "count":
                    pushCount(item);
                    break;
                case "comment":
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
            //console.log("EntryName " + entry.name + "namesArray " + names);
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
        //console.log(names + " " + counts + " " + comments + " Arrays");
        for (let index = 0; index <= names.length - 1; index++) {
            //console.log(index + " index");
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
        //console.log("delete");
        let target = _event.target;
        let parent = target.parentElement;
        parent.remove();
    }
})(L06_Einkaufsliste || (L06_Einkaufsliste = {}));
//# sourceMappingURL=L06Script.js.map