namespace L06_Einkaufsliste {
    
    window.addEventListener("load", handleLoad);

    let allEntries: HTMLElement[] = [];
    //let names: string[] = [];
    //let counts: string[] = [];
    //let comments: string[] = [];
    
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
        button.addEventListener("pointerdown", displayList);

        addData();
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

    function displayList(): void {
        addData();
        //let formData: FormData = new FormData(form);
        //let newEntry: HTMLElement = document.createElement("div");
        /*for (let entry of formData) {
            let entryName: string;
            let entryCount: string; 
            let entryComment: string; 
            switch (entry[0]) {
                case "name":
                    entryName = String(entry[1]);
                    newEntry.innerText = entryName + "\n";
                    break;
                case "count":
                    entryCount = String(entry[1]);
                    newEntry.innerText += " " + entryCount + "\n";
                    break;
                case "comment":                  
                    entryComment = String(entry[1]);
                    newEntry.innerText += " " + entryComment + "\n";
                    break;
                default:
                    console.log("Default");       
            }
            let list: HTMLElement = <HTMLElement>document.querySelector("#list");
            list.appendChild(newEntry);
        }
        let entryDate: string;
        let date: Date = new Date;
        let day: number = date.getDay();
        let month: number = date.getMonth();
        let year: number = date.getFullYear();
        entryDate = day + "/" +  month + "/" + year;
        newEntry.innerHTML += "" + entryDate;
        let radio: HTMLInputElement = document.createElement("input");
        radio.type = "radio";
        radio.setAttribute("class", "center");
        newEntry.appendChild(radio);
        let trash: HTMLElement = document.createElement("i");
        trash.setAttribute("class", "fa-solid fa-trash-can");
        trash.setAttribute("id", "delete");
        trash.addEventListener("pointerdown", handleDelete);
        newEntry.appendChild(trash);
        allEntries.push(newEntry);
        let list: HTMLElement = <HTMLElement>document.querySelector("#list");
        list.appendChild(newEntry);*/
    }

    async function addData(): Promise<void> {
        
        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", "Entries");
        query.toString();
        console.log(query + " queryCommandFind");
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        //alert(responseText + " :))");
        /*for (let category in _data) {
            let item: Item[] = _data[category];
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
        }*/
        buildList(responseText);
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

    function buildList(_responseText: string): void {
        
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

    }

    function handleDelete(_event: Event): void {
        //console.log("delete");
        let target: HTMLElement = _event.target as HTMLElement;
        let parent: HTMLElement = <HTMLElement> target.parentElement;
        parent.remove();
    }
    
}