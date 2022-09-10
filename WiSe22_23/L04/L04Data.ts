namespace L04_Einkaufsliste {
    export interface Item {
        name: string;
    }

    export interface Data {
        [category: string]: Item[];
    }

    export let data: Data = {
        Name: [
            { name: "Chocolade"},
            { name: "Cereal"},
            { name: "Wine"}
        ],
        Count: [
            { name: "5"},
            { name: "10"},
            { name: "2"}
        ],
        Comment: [
            { name: "Milka"},
            { name: "Oatmeal"},
            { name: "Bordeaux"}
        ]
    };

    //console.log(data[0][0]);
    
}