const fields = [
    {
        name: "claimer_name",
        label: "Claimer Name",
        type: "select",
        placeholder: "Select a claimer",
        initialValue: "",
        required: true,
        options: [
            { label: "Employee A", value: "Employee A" },
            { label: "Employee B", value: "Employee B" },
            { label: "Employee C", value: "Employee C" },
        ],
    },
    {
        name: "expense_date",
        label: "Date of Expense",
        type: "date",
        placeholder: "Select a date",
        initialValue: "",
        required: true,
    },
    {
        name: "description",
        label: "Description",
        type: "text",
        placeholder: "Enter a description",
        initialValue: "",
        required: true,
    },
    {
        name: "amount",
        label: "Amount (EUR)",
        type: "number",
        placeholder: "Enter an amount",
        initialValue: "",
        required: true,
        validationRules: [
            {
                validate: (value) => value > 0,
                message: "Please enter a positive amount",
            },
        ],
    },
    {
        name: "approved",
        label: "Approved",
        type: "checkbox",
        initialValue: false,
    },
];
export default fields