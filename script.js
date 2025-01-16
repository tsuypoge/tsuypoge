// Get elements
const form = document.getElementById('expense-form');
const dateInput = document.getElementById('date');
const transportationInput = document.getElementById('transportation');
const mealInput = document.getElementById('meal');
const otherInput = document.getElementById('other');
const summaryDiv = document.getElementById('expenses-summary');
const downloadButton = document.getElementById('download-excel');

// Store expenses data
let expensesData = [];

// Function to update the expenses summary
function updateSummary() {
    if (expensesData.length === 0) {
        summaryDiv.innerHTML = "<p>No expenses recorded yet. Please add your expenses.</p>";
    } else {
        let summaryHTML = '<table><tr><th>Date</th><th>Transportation</th><th>Meal</th><th>Other</th></tr>';
        expensesData.forEach(expense => {
            summaryHTML += `
                <tr>
                    <td>${expense.date}</td>
                    <td>${expense.transportation}</td>
                    <td>${expense.meal}</td>
                    <td>${expense.other}</td>
                </tr>
            `;
        });
        summaryHTML += '</table>';
        summaryDiv.innerHTML = summaryHTML;
    }
}

// Event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const date = dateInput.value;
    const transportation = parseFloat(transportationInput.value);
    const meal = parseFloat(mealInput.value);
    const other = parseFloat(otherInput.value);

    if (isNaN(transportation) || isNaN(meal) || isNaN(other)) {
        alert("Please enter valid amounts for all fields.");
        return;
    }

    const newExpense = {
        date,
        transportation,
        meal,
        other
    };

    // Add the new expense to the array
    expensesData.push(newExpense);

    // Clear the form
    form.reset();

    // Update the expenses summary
    updateSummary();
});

// Event listener for downloading the Excel file
downloadButton.addEventListener('click', function() {
    if (expensesData.length === 0) {
        alert("No expenses to download.");
        return;
    }

    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Expenses');

    // Add headers to the sheet
    worksheet.columns = [
        { header: 'Date', key: 'date', width: 20 },
        { header: 'Transportation', key: 'transportation', width: 15 },
        { header: 'Meal', key: 'meal', width: 15 },
        { header: 'Other', key: 'other', width: 15 }
    ];

    // Add each expense as a row
    expensesData.forEach(expense => {
        worksheet.addRow(expense);
    });

    // Generate the Excel file and trigger download
    workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'daily_expenses.xlsx';
        link.click();
    });
});
