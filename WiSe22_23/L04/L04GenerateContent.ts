namespace L04_Einkaufsliste {
    export function generateContent(_data: Data): void {

        for (let category in _data) {
            // console.log(category);
            let items: Item[] = _data[category];

            let group: HTMLElement | null = null;
            switch (category) {
                case "Name":
                    group = createText(items, category);
                    break;
                case "Count":
                    group = createStepper(items, category);
                    break;
                case "Comment":
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