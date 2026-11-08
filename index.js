const transactions = [];
let currentFilter = "";

const listEl = document.getElementById("transaction-list");
const emptyMsg = document.getElementById("empty-msg");

const message = {all:"No Transactions yet", income:"No Incomes yet", expense:"No Expenses yet"};

emptyMsg.textContent = message[currentFilter]




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

const typeBtn = [expensBtn,incomBtn,addBtn]
// transactions buttons;
const allBtn = document.getElementById("all-btn");
const inBtn = document.getElementById("incom-btn");
const trasacBtn = document.getElementById("trasac-btn");

const filterButton = [allBtn,inBtn, trasacBtn ]

// ballances;
 const balanceEl =document.getElementById("h1-b");
 const incomeEl = document.getElementById("h1-i");
 const expenseEl = document.getElementById("h1-t");



expensBtn.addEventListener("click", () => (selectedType = "expense"));
incomBtn.addEventListener("click", () => (selectedType = "income"));


allBtn.addEventListener("click", () =>{currentFilter = "all"; renderLists();});
inBtn.addEventListener("click", () =>{currentFilter = "income"; renderLists();});
trasacBtn.addEventListener("click", () =>{currentFilter = "expense"; renderLists();});



function setActive(btn){
  filterButton.forEach((b) => b.classList.remove("active"));
  btn.classList.add("active")
}

allBtn.addEventListener("click", () =>{
  currentFilter = "all";
  setActive(allBtn);
  renderLists()
});

trasacBtn.addEventListener("click", () =>{
  currentFilter = "expense";
  setActive(trasacBtn);
  renderLists();
});

inBtn.addEventListener("click", () =>{
  currentFilter = "income";
  setActive(inBtn);
  renderLists();
});





function active(btn2){
  typeBtn.forEach((b) => b.classList.remove("active"));
  btn2.classList.add("active")
}

expensBtn.addEventListener("click", () =>{
  selectedType = "expense";
  active(expensBtn);
  
});

incomBtn.addEventListener("click", () =>{
  
      selectedType = "income";
  active(incomBtn);
 
})





addBtn.addEventListener("click", function () {
  const transaction = {
    id: Date.now(),
    description: inputItem.value.trim(),
    amount:Number(inputAmount.value.trim()),
    type: selectedType,
    select: selectCategory.value.trim(),
    date: dateInput.value.trim(),
  };

  if(inputItem.value.trim()==="" || inputAmount.value.trim()==="" || 
selectCategory.value.trim()==="" || dateInput.value.trim()==="" ){
   alert("Please fill all the fileds")
   return
}

  transactions.push(transaction);
  console.log(transaction);

  clearInput();
  render();
   updateTotals()
 
});




function renderLists() {
  const visible =
    currentFilter === "all"
      ? transactions
      : transactions.filter((t) => t.type === currentFilter);

  emptyMsg.hidden = visible.length > 0;

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
<div class="images  ${isIncome ? "up" : "down"}"> ${isIncome ? "↑" : "↓"}</div>
  

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
    .reduce((sum, t) => sum + (t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + (t.amount), 0);

  balanceEl.textContent = (income - expense).toLocaleString("uz-UZ");
  incomeEl.textContent = "+" + income.toLocaleString("uz-UZ");
  expenseEl.textContent = "-" + expense.toLocaleString("uz-UZ");

  render()
}