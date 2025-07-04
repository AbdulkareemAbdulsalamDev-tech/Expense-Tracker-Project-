
const form = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const expenseList = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total');


let expenses = JSON.parse(localStorage.getItem('expenses')) || [];


form.addEventListener('submit', function (e) {
  e.preventDefault();

  const desc = descriptionInput.value.trim();
  const amt = parseFloat(amountInput.value);
  const cat = categoryInput.value;

  if (desc && !isNaN(amt) && amt > 0 && cat) {
    const expense = {
      id: Date.now(),
      description: desc,
      amount: amt,
      category: cat,
      date: new Date().toISOString().split('T')[0]
    };

    expenses.push(expense);
    saveAndRender();
    form.reset();
  }
});


function saveAndRender() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
  renderTotal();
}


function renderExpenses() {
  expenseList.innerHTML = '';

  expenses.forEach(exp => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center bg-green-100 drop-shadow-md border rounded p-3 rounded';

    li.innerHTML = `
      <div>
        <p class="font-bold text-md text-green-500">${exp.description} - ₦${exp.amount.toFixed(2)}</p>
        <p class="text-sm text-gray-500">${exp.category} | ${exp.date}</p>
      </div>
      <button onclick="deleteExpense(${exp.id})" class="text-red-500 hover:underline text-sm">Delete</button>
    `;

    expenseList.appendChild(li);
  });
}


function renderTotal() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  totalDisplay.textContent = total.toFixed(2);
}


function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveAndRender();
}


saveAndRender();
