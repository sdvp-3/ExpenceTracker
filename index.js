const transactions = [];
let currentFilter = "";

const listEl = document.getElementById("transaction-list");
const categoryEmpty = document.getElementById("category-empty");

const categoryList = document.getElementById("category-list");
const categoryTop = document.getElementById("category-top");

const message = {
  all: "No Transactions yet",
  income: "No Incomes yet",
  expense: "No Expenses yet",
};

categoryEmpty.textContent = message[currentFilter];

let selectedType = "";

// inputs;
const inputItem = document.getElementById("input-item");
const inputAmount = document.getElementById("input-num");
const selectCategory = document.getElementById("categorys");
const dateInput = document.getElementById("date-input");

// buttons;
const expensBtn = document.getElementById("expens");
const incomBtn = document.getElementById("incom");
const addBtn = document.getElementById("btn-add");

const typeBtn = [expensBtn, incomBtn, addBtn];
// transactions buttons;
const allBtn = document.getElementById("all-btn");
const inBtn = document.getElementById("incom-btn");
const trasacBtn = document.getElementById("trasac-btn");

const filterButton = [allBtn, inBtn, trasacBtn];

// ballances;
const balanceEl = document.getElementById("h1-b");
const incomeEl = document.getElementById("h1-i");
const expenseEl = document.getElementById("h1-t");

expensBtn.addEventListener("click", () => (selectedType = "expense"));
incomBtn.addEventListener("click", () => (selectedType = "income"));

allBtn.addEventListener("click", () => {
  currentFilter = "all";
  renderLists();
});
inBtn.addEventListener("click", () => {
  currentFilter = "income";
  renderLists();
});
trasacBtn.addEventListener("click", () => {
  currentFilter = "expense";
  renderLists();
});

function setActive(btn) {
  filterButton.forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}

allBtn.addEventListener("click", () => {
  currentFilter = "all";
  setActive(allBtn);
  renderLists();
});

trasacBtn.addEventListener("click", () => {
  currentFilter = "expense";
  setActive(trasacBtn);
  renderLists();
});

inBtn.addEventListener("click", () => {
  currentFilter = "income";
  setActive(inBtn);
  renderLists();
});

function active(btn2) {
  typeBtn.forEach((b) => b.classList.remove("active"));
  btn2.classList.add("active");
}

expensBtn.addEventListener("click", () => {
  selectedType = "expense";
  active(expensBtn);
});

incomBtn.addEventListener("click", () => {
  selectedType = "income";
  active(incomBtn);
});

addBtn.addEventListener("click", function () {
  const transaction = {
    id: Date.now(),
    description: inputItem.value.trim(),
    amount: Number(inputAmount.value.trim()),
    type: selectedType,
    select: selectCategory.value.trim(),
    date: dateInput.value.trim(),
  };

  if (
    inputItem.value.trim() === "" ||
    inputAmount.value.trim() === "" ||
    selectCategory.value.trim() === "" ||
    dateInput.value.trim() === ""
  ) {
    alert("Please fill all the fileds");
    return;
  }

  transactions.push(transaction);
  console.log(transaction);

  clearInput();
  render();
  updateTotals();
   renderCategories()
 
});

function renderLists() {
  const visible =
    currentFilter === "all"
      ? transactions
      : transactions.filter((t) => t.type === currentFilter);

  categoryEmpty.hidden = visible.length > 0;

  listEl.innerHTML = visible
    .map((expense) => {
      const isIncome = expense.type === "income";

      return `
        <div class="expense-card" data-id="${expense.id}">
          <div class="images ${isIncome ? "up" : "down"}">${isIncome ? "↑↑  " : "↓↓"}</div>
          <div class="descript">
            <h3>${expense.description}</h3>
            <div class="categor">
              <p>${expense.select} · ${expense.date}</p>
            </div>
          </div>
          <div class="amount">
            <p class="amaounts ${isIncome ? "income-text" : "expense-text"}">
              ${isIncome ? "+" : "-"}${Number(expense.amount).toLocaleString("en-US")}
            </p>
          </div>
        </div>`;
    })
    .join("");
}

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

   <img src="${isIncome ? "pic/up.png" : "pic/red-down.png"}" alt="${isIncome ? "Income" : "Expense"}" class="icon-img">

   <div class="descript"> 

   <h3>${expense.description}</h3>

<div class = "categor">
<p>${expense.select}</p>
<p>.</p>
<p>${expense.date}</p>
</div>

   </div>

<div class="amount"><p class="amaounts ${isIncome ? "income-text" : "expense-text"}">${expense.type === "income" ? "+" : "-"}${Number(expense.amount)}</p></div>

  
   </div>`;
    })
    .join("");
}
function updateTotals() {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  balanceEl.textContent = (income - expense).toLocaleString("uz-UZ");
  incomeEl.textContent = "+" + income.toLocaleString("uz-UZ");
  expenseEl.textContent = "-" + expense.toLocaleString("uz-UZ");

  render();
  
}


function renderCategories(){

  const expenses = transactions.filter((t) =>t.type ==="expense" );

  const total =expenses.reduce((result, item) =>{
    const category = item.category || item.select || "other";
     const amount =Number(item.amount)
    result[category] =(result[category] || 0) + amount;
    return result
  
  },{});



  const entries = Object.entries(total);

  categoryList.replaceChildren();
  categoryTop.replaceChildren();
  categoryEmpty.hidden = entries.length > 0;

    if (entries.length === 0) return;

    const maxAmount = Math.max(...entries.map(([, amount]) => amount));
    const totalExpense = entries.reduce((sum, [, amount])=> sum + amount, 0);

    entries.forEach(([category, amount])=> {

      const row = document.createElement("div");
      row.className = "category-row";

      const label = document.createElement("div");
      label.className = "category-label";

      const name = document.createElement("span");
      name.textContent = category;

      const value = document.createElement("span");
      value.textContent= amount.toLocaleString("en-US");

      const bar = document.createElement("div");
      bar.className = "category-bar";

      const fill = document.createElement("div");
      fill.className ="category-fill";
      fill.style.width= `${maxAmount>0 ? (amount/maxAmount)*100 : 0}%`;
    
      label.append(name,value);
      bar.append(fill);
      row.append(label,bar);
      categoryList.append(row)
  }) ;


  const topCategories = entries.filter(([, amount])=> amount === maxAmount)
  .map(([category])=>category);


  const precent = totalExpense>0
  ? Math.round((maxAmount / totalExpense)*100)
  :0;

  categoryTop.textContent =
  `Most spent: ${topCategories.join(", ")} - ${precent}% each`

}