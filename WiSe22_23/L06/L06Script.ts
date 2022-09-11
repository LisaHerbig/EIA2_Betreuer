namespace L06_Einkaufsliste {
    
    window.addEventListener("load", handleLoad);

    //let allEntries: HTMLElement[] = [];
    //let names: string[] = [];
    //let counts: string[] = [];
    //let comments: string[] = [];
    let update: boolean;
    
    let form: HTMLFormElement;
    let url: string = "https://webuser.hs-furtwangen.de/~herbigli/L06_Data/";

    interface FormDataJSON {
        [key: string]: FormDataEntryValue | FormDataEntryValue[];
    }


    async function handleLoad(_event: Event): Promise<void> {

        form = <HTMLFormElement>document.querySelector("#form");

        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#add");
        submit.addEventListener("pointerdown", sendEntry);

        let response: Response = await fetch("L06Data.json");
        let entryNew: string = await response.text();
        let data: Data = JSON.parse(entryNew);
        
        generateContent(data);

        let button: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#add");
        button.addEventListener("pointerdown", handleButton);

        addData();
    }

    function handleButton(): void {
        update = true;
        displayList(update);
    }

    async function sendEntry(): Promise<void> {
        
        let form: HTMLFormElement = <HTMLFormElement>document.querySelector("#form");
        let formData: FormData = new FormData(form);
        let json: FormDataJSON = {};

        for (let key of formData.keys())
            if (!json[key]) {
                let values: FormDataEntryValue[] = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
        
        }

        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Entries");
        query.set("data", JSON.stringify(json));

        console.log(query.toString() + "     queryToString");

        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        alert(responseText + " :)");
        
        
    }

    function displayList(_update: boolean): void {
        if (_update == true) {
            let list: HTMLElement = <HTMLElement>document.querySelector("#list");
            while (list.firstChild) {
            if (list.lastChild != null)
            list.removeChild(list.lastChild); 
            }
        }
        addData();
    }

    async function addData(): Promise<void> {
        
        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", "Entries");
        query.toString();
        console.log(query + " queryCommandFind");
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        let entries: any = response.json;
        let entriesArray: string[] = entries;
        console.log(entriesArray[0] + " ENTRIES ARRAY");
        let jsonDoc: Data = JSON.parse(responseText);
        console.log(jsonDoc + "  JSONDOC");
        
        for (let id in jsonDoc) {
            console.log(id + "   JSONDOC ID");
            let idItem: Item[] = jsonDoc[id];

            if (id == "data") {
                console.log("id = data" + idItem);
                getIds(idItem);
            }
            
        }
        
    }

    function getIds(_idItem: Item[]): void {
        console.log("in get items");
        
        for (let entry in _idItem) {

            let entryItem: Item = _idItem[entry];
            console.log(entry + " itemENtryGetItems");

            
            //getItems(entryItem);  
            let entryItemString: string = String(entry);
            let itemId: string[] = [entryItem.name, entryItem.count, entryItem.comment, entryItemString];
            console.log(entryItem.name, entryItem.count, entryItem.comment);
            
            createList(itemId);
        }
    }

    /*function getItems(_item: Item): string {
        console.log(_item.name);
        return _item.name;
    }*/

    function getDate(): string {
        let entryDate: string;
        let date: Date = new Date;
        let day: number = date.getDay();
        let month: number = date.getMonth();
        let year: number = date.getFullYear();
        entryDate = day + "/" +  month + "/" + year;
        return entryDate;
    }


    function createList(_itemAndId: string[]): void {
        let list: HTMLElement = <HTMLElement>document.querySelector("#list");
        
        console.log("List ItemAndID: " + _itemAndId);
        let date: string = getDate();
        let id: string = _itemAndId[3];
        let article: string = _itemAndId[0];
        let count: string = _itemAndId[1];
        let comment: string = _itemAndId[2];
        let newEntry: HTMLDivElement = document.createElement("div");
        newEntry.setAttribute("class", id);
        newEntry.innerText = article + " - " + count + " - " + comment + " " + date;

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

    async function handleDelete(_event: Event): Promise<void> {
        let target: HTMLElement = _event.target as HTMLElement;
        let parent: HTMLElement = <HTMLElement> target.parentElement;
        parent.remove();
        console.log(parent + "  Parent");
        let id: string = parent.className;
        console.log(id + "ParentID");

        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "delete");
        query.set("collection", "Entries");
        query.set("id", id);
        query.toString();
        console.log(query + " queryCommandFind");
        let response: Response = await fetch(url + "?" + query.toString());
        console.log(_event);
        let responseText: string = await response.text();
        alert(responseText + "EntryDeleted");
        
    }
    
}