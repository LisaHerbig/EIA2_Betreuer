namespace L04_Einkaufsliste {
    window.addEventListener("load", handleLoad);

    let allEntries: HTMLElement[] = [];
    let names: string[] = [];
    let counts: string[] = [];
    let comments: string[] = [];

    function handleLoad(_event: Event): void {
        console.log("Init");

        generateContent(data);

        let form: HTMLDivElement = <HTMLDivElement>document.querySelector("div#form");
       // let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("input#amount");

        form.addEventListener("change", handleChange);
        //slider.addEventListener("input", displayAmount);

        //displayList();
        let button: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#add");
        button.addEventListener("pointerdown", displayList);

        addData(data);
    }

    function handleChange(_event: Event): void {
        //displayList();
        console.log("Change");

        
    }

    function displayList(): void {

        let formData: FormData = new FormData(<HTMLFormElement>document.querySelector("form"));
        let newEntry: HTMLElement = document.createElement("div");
        
        for (let entry of formData) {

            let entryName: string;
            let entryCount: string; 
            let entryComment: string; 

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
        console.log(newEntry);

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
        list.appendChild(newEntry);
    }

    function addData(_data: Data): void {
        
        for (let category in _data) {

            let item: Item[] = _data[category];

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

    function pushNames(_item: Item[]): void {
        for (let entry of _item) {
            names.push(entry.name);
            console.log("EntryName " + entry.name + "namesArray " + names);
            //buildList();
            
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
    }

    function buildList(): void {
        
        let list: HTMLElement = <HTMLElement>document.querySelector("#list");

        let entryDate: string;
        let date: Date = new Date;
        let day: number = date.getDay();
        let month: number = date.getMonth();
        let year: number = date.getFullYear();
        entryDate = day + "/" +  month + "/" + year;
        

        console.log(names + " " + counts + " " + comments + " Arrays");
        

        for (let index: number = 0; index <= names.length - 1; index++) {

            console.log(index + " index");
            
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
          
        }

    }

    function handleDelete(_event: Event): void {
        console.log(_event);
        let target: HTMLElement = _event.target as HTMLElement;
        let parent: HTMLElement = <HTMLElement> target.parentElement;
        parent.remove();
    }
    
}