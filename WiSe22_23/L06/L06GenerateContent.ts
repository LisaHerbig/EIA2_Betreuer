namespace L06_Einkaufsliste {
    export interface Item {
        date: string;
        bought: string;
        name: string;
        count: string;
        comment: string;
    }

    export interface Data {
        [category: string]: Item[];
    }
    
    export function generateContent(_data: Data): void {
        

        for (let category in _data) {
            
            let items: Item[] = _data[category];

            let group: HTMLElement | null = null;
            switch (category) {
                case "name":
                    group = createText(items, category);
                    break;
                case "count":
                    group = createStepper(items, category);
                    break;
                case "comment":
                    group = createText(items, category);
                    break;

                default:
                    break;
            }

            let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.appendChild(group);
        }
    }

    function createText(_items: Item[], _category: string): HTMLElement | null {
        
        let group: HTMLDivElement = document.createElement("div");
        let textField: HTMLInputElement = document.createElement("input");
        textField.type = "text";
        textField.name = _category;
        group.appendChild(textField);
        return group;
    }

    function createStepper(_items: Item[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        let stepper: HTMLInputElement = document.createElement("input");
        stepper.type = "number";
        stepper.name = _category;
        group.appendChild(stepper);
        return group;
    }

}