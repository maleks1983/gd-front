export const initialBatch = {
    id: "",
    ranges: [{start: "", end: ""}],
    quantity: "",
    firmware: "fw-001",
    operations: [1, 2],

};

export const operationList = [
    {id: 1, name: "Пайка"},
    {id: 2, name: "Прошивка"},
    {id: 3, name: "Тестування"},
    {id: 4, name: "Упаковка"},
];

export const data = [
    {
        id: "DG100000",
        ranges: [{start: "100000", end: "100099"}],
        quantity: "100",
        firmware: "fw-001",
        status: "Прошивка"
    },
];