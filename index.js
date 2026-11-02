const transactions = [];

const listEl = document.getElementById("transaction-list");
const emptyMsg = document.getElementById("empty-msg");
let selectedType = "expense";

// inputs;
const inputItem = document.getElementById("input-item");
const inputAmount = document.getElementById("input-num");
const selectCategory = document.getElementById("categorys");

// buttons;
const expensBtn =document.getElementById("expens");
const incomBtn = document.getElementById("incom");
const addBtn = document.getElementById("btn-add");

// transactions buttons;
const allBtn = document.getElementById("all-btn");
const inBtn = document.getElementById("incom-btn");
const trasacBtn = document.getElementById("trasac-btn");




addBtn.addEventListener('click',function(){

const transaction ={
id: Date.now(),
description: inputItem.value.trim(),
amount: inputAmount.value.trim(),
select:selectCategory.value.trim()
}

transactions.push(transaction)
console.log(transaction)


 clearInput()

})

function clearInput(){
  inputItem.value = ""
 inputAmount.value = ""
selectCategory.value = ""
}