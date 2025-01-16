// Get elements
const form = document.getElementById('expense-form');
const transportationInput = document.getElementById('transportation');
const mealInput = document.getElementById('meal');
const otherInput = document.getElementById('other');
const summaryDiv = document.getElementById('expenses-summary');
const clearButton = document.getElementById('clear-expenses');

// Function to update expenses summary
function updateSummary() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
    if (expenses.length === 0) {
        summaryDiv.innerHTML = "<p>No expenses recorded yet. Please add your expenses.</p>";
    } else {
        let totalTransportation = 0;
        let totalMeal = 0;
        let totalOther = 0;
        
        expenses.forEach(expense => {
            totalTransportation += expense.transportation;
            totalMeal += expense.meal;
            totalOther += expense.other;
        });

        summaryDiv.innerHTML = `
            <p><strong>Transportation Expenses:</strong> $${totalTransportation.toFixed(2)}</p>
            <p><strong>Meal Allowance:</strong> $${totalMeal.toFixed(2)}</p>
            <p><strong>Other Expenses:</strong> $${totalOther.toFixed(2)}</p>
            <p><strong>Total Expenses:</strong> $${(totalTransportation + totalMeal + totalOther).toFixed(2)}</p>
        `;
    }
}

// Event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const transportation = parseFloat(transportationInput.value);
    const meal = parseFloat(mealInput.value);
    const other = parseFloat(otherInput.value);

    if (isNaN(transportation) || isNaN(meal) || isNaN(other)) {
        alert("Please enter valid amounts for all fields.");
        return;
    }

    const newExpense = {
        transportation,
        meal,
        other
    };

    // Get current expenses from localStorage
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Add the new expense to the array
    expenses.push(newExpense);

    // Save updated expenses array back to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Clear form inputs
    transportationInput.value = '';
    mealInput.value = '';
    otherInput.value = '';

    // Update the expenses summary
    updateSummary();
});

// Event listener for clearing all expenses
clearButton.addEventListener('click', function() {
    if (confirm("Are you sure you want to clear all expenses?")) {
        localStorage.removeItem('expenses');
        updateSummary();
    }
});

// Initial call to display the summary
updateSummary();
