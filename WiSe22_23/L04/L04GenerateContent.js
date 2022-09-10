"use strict";
var L04_Einkaufsliste;
(function (L04_Einkaufsliste) {
    function generateContent(_data) {
        for (let category in _data) {
            // console.log(category);
            let items = _data[category];
            let group = null;
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
            let fieldset = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.appendChild(group);
        }
    }
    L04_Einkaufsliste.generateContent = generateContent;
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
})(L04_Einkaufsliste || (L04_Einkaufsliste = {}));
//# sourceMappingURL=L04GenerateContent.js.map