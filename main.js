import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {getDatabase, ref, push, onValue} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';


const appSettings = {
  databaseURL : "https://app-compras-4dc7b-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById('input-field');
const addButtonEl = document.getElementById('add-button');
const shoppingListEl = document.getElementById('shopping-list');

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;

    push(shoppingListInDB, inputValue);

    clearInputFieldEd()

    // appendItemToShoopingListEL(inputValue)
    
   
})

onValue(shoppingListInDB, function(snapshot) {
  let itemsArray = Object.values(snapshot.val())

  clearShoppingListEl()
  
  for (let i = 0; i < itemsArray.length; i++) {
    appendItemToShoopingListEL(itemsArray[i])
  }
})

function clearShoppingListEl(){
  shoppingListEl.innerHTML = ""
}

function clearInputFieldEd(){
  inputFieldEl.value = ""
}

function appendItemToShoopingListEL(itemValue){
  shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}