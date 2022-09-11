"use strict";
var L06_Einkaufsliste;
(function (L06_Einkaufsliste) {
    function generateContent(_data) {
        for (let category in _data) {
            let items = _data[category];
            let group = null;
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
            let fieldset = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.appendChild(group);
        }
    }
    L06_Einkaufsliste.generateContent = generateContent;
    function createText(_items, _category) {
        let group = document.createElement("div");
        let textField = document.createElement("input");
        textField.type = "text";
        textField.name = _category;
        group.appendChild(textField);
        return group;
    }
    function createStepper(_items, _category) {
        let group = document.createElement("div");
        let stepper = document.createElement("input");
        stepper.type = "number";
        stepper.name = _category;
        group.appendChild(stepper);
        return group;
    }
})(L06_Einkaufsliste || (L06_Einkaufsliste = {}));
//# sourceMappingURL=L06GenerateContent.js.map