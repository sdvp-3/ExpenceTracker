const transactions = [];

const listEl = document.getElementById("transaction-list");
const emptyMsg = document.getElementById("empty-msg");
let selectedType = "expense";

// inputs;
const inputItem = document.getElementById("input-item");
const inputAmount = document.getElementById("input-num");
const selectCategory = document.getElementById("categorys");
const dateInput = document.getElementById("date-input");

// buttons;
const expensBtn = document.getElementById("expens");
const incomBtn = document.getElementById("incom");
const addBtn = document.getElementById("btn-add");

// transactions buttons;
const allBtn = document.getElementById("all-btn");
const inBtn = document.getElementById("incom-btn");
const trasacBtn = document.getElementById("trasac-btn");

// ballances;
 const balanceEl =document.getElementById("h1-b");
 const incomeEl = document.getElementById("h1-i");
 const expenseEl = document.getElementById("h1-t");



expensBtn.addEventListener("click", () => (selectedType = "expense"));
incomBtn.addEventListener("click", () => (selectedType = "income"));

addBtn.addEventListener("click", function () {
  const transaction = {
    id: Date.now(),
    description: inputItem.value.trim(),
    amount:Number(inputAmount.value.trim()),
    type: selectedType,
    select: selectCategory.value.trim(),
    date: dateInput.value.trim(),
  };

  transactions.push(transaction);
  console.log(transaction);

  clearInput();
  render();
   updateTotals()
 
});

function clearInput() {
  inputItem.value = "";
  inputAmount.value = "";
  selectCategory.value = "";
  dateInput.value = "";
}

function render() {
  listEl.innerHTML = transactions

    .map((expense) => {
      const isIncome = expense.type === "income";
      return `
   <div class ="expense-card" data-id = ${expense.id}>
<div class="images  ${isIncome ? "up" : "down"}"> ${isIncome ? "↑" : "↓"}</div>
  

   <div class="descript"> 

   <h3>${expense.description}</h3>

<div class = "categor">
<p>${expense.select}</p>
<p>.</p>
<p>${expense.date}</p>
</div>

   </div>

<div class="amount"><p class="amaounts ${isIncome ? "income-text" : "expense-text"}">${expense.type === "income" ? "+" : "-"}${expense.amount}</p></div>

  
   </div>`;
    })
    .join("");
}
function updateTotals() {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + (t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + (t.amount), 0);

  balanceEl.textContent = (income - expense).toLocaleString("uz-UZ");
  incomeEl.textContent = "+" + income.toLocaleString("uz-UZ");
  expenseEl.textContent = "-" + expense.toLocaleString("uz-UZ");

  render()
}