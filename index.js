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

addBtn.addEventListener("click", function () {
  const transaction = {
    id: Date.now(),
    description: inputItem.value.trim(),
    amount: inputAmount.value.trim(),
    select: selectCategory.value.trim(),
    date: dateInput.value.trim(),
  };

  transactions.push(transaction);
  console.log(transaction);

  clearInput();
  render(transactions, listEl);
});

function clearInput() {
  inputItem.value = "";
  inputAmount.value = "";
  selectCategory.value = "";
  dateInput.value = "";
}

function render(expenses, element) {
  const expenseItems = expenses
    .map(
      (expense, i) => `
   <div class ="expense-card" data-id = ${expense.id}>
<div class="images"> <img class = "imgs" src = "pic/down.png"></div>
  

   <div class="descript"> 

   <h3>${expense.description}</h3>

<div class = "categor">
<p>${expense.select}</p>
<p>.</p>
<p>${expense.date}</p>
</div>

   </div>

<div class="amount"><p class="amaounts">${expense.amount}</p></div>

  
   </div>
   
   `,
    )
    .join("");

  element.innerHTML = expenseItems;
}
