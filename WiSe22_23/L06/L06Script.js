"use strict";
var L06_Einkaufsliste;
(function (L06_Einkaufsliste) {
    window.addEventListener("load", handleLoad);
    //let allEntries: HTMLElement[] = [];
    //let names: string[] = [];
    //let counts: string[] = [];
    //let comments: string[] = [];
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
    function handleButton() {
        update = true;
        displayList(update);
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
            //getItems(entryItem);  
            let entryItemString = String(entry);
            let itemId = [entryItem.name, entryItem.count, entryItem.comment, entryItemString];
            console.log(entryItem.name, entryItem.count, entryItem.comment);
            createList(itemId);
        }
    }
    /*function getItems(_item: Item): string {
        console.log(_item.name);
        return _item.name;
    }*/
    function getDate() {
        let entryDate;
        let date = new Date;
        let day = date.getDay();
        let month = date.getMonth();
        let year = date.getFullYear();
        entryDate = day + "/" + month + "/" + year;
        return entryDate;
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
    /*function pushNames(_item: Item[]): void {
        for (let entry of _item) {
            names.push(entry.name);
            //console.log("EntryName " + entry.name + "namesArray " + names);
        }
    }

    function pushCount(_item: Item[]): void {
        for (let entry of _item) {
            counts.push(entry.name);
        }
    }

    function pushComment(_item: Item[]): void {
        for (let entry of _item) {
            comments.push(entry.name);
        }
    }*/
    /*function buildList(_responseText: string): void {
        
        let list: HTMLElement = <HTMLElement>document.querySelector("#list");

        let entryDate: string;
        let date: Date = new Date;
        let day: number = date.getDay();
        let month: number = date.getMonth();
        let year: number = date.getFullYear();
        entryDate = day + "/" +  month + "/" + year;
        let newEntry: HTMLDivElement = document.createElement("div");
        newEntry.innerText = _responseText;

        let radio: HTMLInputElement = document.createElement("input");
        radio.type = "radio";
        radio.setAttribute("class", "center");
        newEntry.appendChild(radio);

        let trash: HTMLElement = document.createElement("i");
        trash.setAttribute("class", "fa-solid fa-trash-can");
        trash.setAttribute("id", "delete");
        trash.addEventListener("pointerdown", handleDelete);
        newEntry.appendChild(trash);

        list.appendChild(newEntry);

        //console.log(names + " " + counts + " " + comments + " Arrays");
        /*for (let index: number = 0; index <= names.length - 1; index++) {
            //console.log(index + " index");
            let newEntry: HTMLElement = document.createElement("div");
            newEntry.innerText = names[index] + " " + counts[index] + " " + comments[index] + " " + entryDate;
            let radio: HTMLInputElement = document.createElement("input");
            radio.type = "radio";
            radio.setAttribute("class", "center");
            newEntry.appendChild(radio);
            let trash: HTMLElement = document.createElement("i");
            trash.setAttribute("class", "fa-solid fa-trash-can");
            trash.setAttribute("id", "delete");
            trash.addEventListener("pointerdown", handleDelete);
            newEntry.appendChild(trash);
            list.appendChild(newEntry);
        }*/
    //}
    async function handleDelete(_event) {
        let target = _event.target;
        let parent = target.parentElement;
        parent.remove();
        console.log(parent + "  Parent");
        let id = parent.className;
        console.log(id + "ParentID");
        let query = new URLSearchParams();
        query.set("command", "delete");
        query.set("collection", "Entries");
        query.set("id", id);
        query.toString();
        console.log(query + " queryCommandFind");
        let response = await fetch(url + "?" + query.toString());
        console.log(_event);
        let responseText = await response.text();
        alert(responseText + "EntryDeleted");
    }
})(L06_Einkaufsliste || (L06_Einkaufsliste = {}));
//# sourceMappingURL=L06Script.js.map