document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let expense = {
        id: Date.now(),
        title: document.getElementById('title').value,
        amount: document.getElementById('amount').value,
        category: document.getElementById('category').value,
        date: document.getElementById('date').value,
    };
    saveExpense(expense);
});

function saveExpense(expense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

function displayExpenses() {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let list = document.getElementById('expenseList');
    list.innerHTML = '';
    let groupedExpenses = {};
    
    expenses.forEach(exp => {
        if (!groupedExpenses[exp.date]) {
            groupedExpenses[exp.date] = [];
        }
        groupedExpenses[exp.date].push(exp);
    });
    
    Object.keys(groupedExpenses).sort().forEach(date => {
        let dateHeader = document.createElement('h4');
        dateHeader.textContent = date;
        list.appendChild(dateHeader);
        
        let ul = document.createElement('ul');
        groupedExpenses[date].forEach(exp => {
            let li = document.createElement('li');
            li.innerHTML = `${exp.title} (${exp.category}): ${exp.amount} บาท ` +
                `<span class='edit-btn' onclick='editExpense(${exp.id})'>[แก้ไข]</span>` +
                `<span class='delete-btn' onclick='deleteExpense(${exp.id})'>[ลบ]</span>`;
            ul.appendChild(li);
        });
        list.appendChild(ul);
    });
}

function editExpense(id) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let expense = expenses.find(exp => exp.id === id);
    if (expense) {
        document.getElementById('title').value = expense.title;
        document.getElementById('amount').value = expense.amount;
        document.getElementById('category').value = expense.category;
        document.getElementById('date').value = expense.date;
        deleteExpense(id);
    }
}

function deleteExpense(id) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(exp => exp.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}
document.addEventListener('DOMContentLoaded', displayExpenses);