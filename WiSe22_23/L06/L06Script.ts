namespace L06_Einkaufsliste {
    
    window.addEventListener("load", handleLoad);

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
    
    function getDate(): string {
        let entryDate: string;
        let date: Date = new Date;
        let day: number = date.getDay();
        let month: number = date.getMonth();
        let year: number = date.getFullYear();
        entryDate = day + "/" +  month + "/" + year;
        return entryDate;
    }

    async function sendEntry(): Promise<void> {
        
        let form: HTMLFormElement = <HTMLFormElement>document.querySelector("#form");
        let formData: FormData = new FormData(form);
        let date: string = getDate();
        let json: FormDataJSON = {"date": date, "bought": "false"};

        for (let key of formData.keys())
            if (!json[key]) {
                let values: FormDataEntryValue[] = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
        
        }
        
        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Entries");
        query.set("data", JSON.stringify(json));
        

        console.log(query.toString() + "     queryToString" + "date:xyz");

        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        alert(responseText + " :)");
        
        
        
    }

    function handleButton(): void {
        update = true;
        displayList(update);
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
 
            let entryItemString: string = String(entry);
            let itemId: string[] = [entryItem.name, entryItem.count, entryItem.comment, entryItemString, entryItem.bought, entryItem.date];
            console.log(entryItem.name, entryItem.count, entryItem.comment);
            
            createList(itemId);
        }
    }
    let checked: boolean;

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
        
        console.log(_itemAndId[4] + "ITEMandID[4]");
        

        if (_itemAndId[4] == "false") {
            
            console.log("status=false");
            
            checked = false;
            
        } else if (_itemAndId[4] == "true") {
            
            console.log("status=true");
            
            checked = true;
        }

        radio.checked = checked;
        radio.addEventListener("pointerdown", handleBought);
        newEntry.appendChild(radio);

        let trash: HTMLElement = document.createElement("i");
        trash.setAttribute("class", "fa-solid fa-trash-can");
        trash.setAttribute("id", "delete");
        trash.addEventListener("pointerdown", handleDelete);
        newEntry.appendChild(trash);

        list.appendChild(newEntry);

        update = false;
        
    }

    async function handleBought(_event: Event): Promise<void> {
        console.log("handleBought");
        let target: HTMLElement = _event.target as HTMLElement;
        let parent: HTMLElement = <HTMLElement> target.parentElement;
        
        let id: string = parent.className;
        let json: FormDataJSON = {"bought": "true"};
        let data: string = JSON.stringify(json);
        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "update");
        query.set("collection", "Entries");
        query.set("id", id);
        query.set("data", data);
        query.toString();
        console.log(query + " queryCommandFind");
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        alert(responseText);
        location.reload();
        
    }
    async function handleDelete(_event: Event): Promise<void> {
        let target: HTMLElement = _event.target as HTMLElement;
        let parent: HTMLElement = <HTMLElement> target.parentElement;
        parent.remove();
        let id: string = parent.className;

        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "delete");
        query.set("collection", "Entries");
        query.set("id", id);
        query.toString();
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        alert(responseText + "EntryDeleted");
        
    }
    
}