"use strict";
var L06_Einkaufsliste;
(function (L06_Einkaufsliste) {
    window.addEventListener("load", handleLoad);
    let update;
    let form;
    let url = "https://webuser.hs-furtwangen.de/~herbigli/L06_Data/";
    async function handleLoad(_event) {
        form = document.querySelector("#form");
        let submit = document.querySelector("#add");
        submit.addEventListener("pointerdown", sendEntry);
        let response = await fetch("L06Data.json");
        let entryNew = await response.text();
        let data = JSON.parse(entryNew);
        L06_Einkaufsliste.generateContent(data);
        let button = document.querySelector("#add");
        button.addEventListener("pointerdown", handleButton);
        addData();
    }
    function getDate() {
        let entryDate;
        let date = new Date;
        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear();
        entryDate = day + "/" + month + "/" + year;
        return entryDate;
    }
    async function sendEntry() {
        let form = document.querySelector("#form");
        let formData = new FormData(form);
        let json = {};
        for (let key of formData.keys())
            if (!json[key]) {
                let values = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Entries");
        query.set("data", JSON.stringify(json));
        console.log(query.toString() + "     queryToString");
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        alert(responseText + " :)");
    }
    function handleButton() {
        update = true;
        displayList(update);
    }
    function displayList(_update) {
        if (_update == true) {
            let list = document.querySelector("#list");
            while (list.firstChild) {
                if (list.lastChild != null)
                    list.removeChild(list.lastChild);
            }
        }
        addData();
    }
    async function addData() {
        let query = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", "Entries");
        query.toString();
        console.log(query + " queryCommandFind");
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        let entries = response.json;
        let entriesArray = entries;
        console.log(entriesArray[0] + " ENTRIES ARRAY");
        let jsonDoc = JSON.parse(responseText);
        console.log(jsonDoc + "  JSONDOC");
        for (let id in jsonDoc) {
            console.log(id + "   JSONDOC ID");
            let idItem = jsonDoc[id];
            if (id == "data") {
                console.log("id = data" + idItem);
                getIds(idItem);
            }
        }
    }
    function getIds(_idItem) {
        console.log("in get items");
        for (let entry in _idItem) {
            let entryItem = _idItem[entry];
            console.log(entry + " itemENtryGetItems");
            let entryItemString = String(entry);
            let itemId = [entryItem.name, entryItem.count, entryItem.comment, entryItemString];
            console.log(entryItem.name, entryItem.count, entryItem.comment);
            createList(itemId);
        }
    }
    function createList(_itemAndId) {
        let list = document.querySelector("#list");
        console.log("List ItemAndID: " + _itemAndId);
        let date = getDate();
        let id = _itemAndId[3];
        let article = _itemAndId[0];
        let count = _itemAndId[1];
        let comment = _itemAndId[2];
        let newEntry = document.createElement("div");
        newEntry.setAttribute("class", id);
        newEntry.innerText = article + " - " + count + " - " + comment + " " + date;
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
        update = false;
    }
    async function handleDelete(_event) {
        let target = _event.target;
        let parent = target.parentElement;
        parent.remove();
        let id = parent.className;
        let query = new URLSearchParams();
        query.set("command", "delete");
        query.set("collection", "Entries");
        query.set("id", id);
        query.toString();
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        alert(responseText + "EntryDeleted");
    }
})(L06_Einkaufsliste || (L06_Einkaufsliste = {}));
//# sourceMappingURL=L06Script.js.map