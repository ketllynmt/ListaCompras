export function setupEventListeners() {
  const addButton = document.getElementById('addButton');
  addButton.addEventListener('click', addItem);
}

function addItem() {
  const itemInput = document.getElementById('itemInput');
  const itemText = itemInput.value.trim();
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';

  const existingErrorMessage = document.querySelector('.error-message');
  if (existingErrorMessage) {
      existingErrorMessage.remove();
      itemInput.classList.remove('error');
  }

  if (itemText !== '') {
      const existingItems = document.querySelectorAll('#itemList li');
      const itemExists = Array.from(existingItems).some(item => item.firstChild.textContent === itemText);

      if (itemExists) {
          alert("Esse produto já foi adicionado em sua lista hehe!");
      } else {
          const li = document.createElement('li');
          li.textContent = itemText;

          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Excluir';
          deleteButton.addEventListener('click', function() {
              li.remove(); 
              removeItemFromLocalStorage(itemText);  
          });

          li.appendChild(deleteButton);
          document.getElementById('itemList').appendChild(li);
          

          setTimeout(() => {
              li.classList.add('show');
          }, 10);

          itemInput.value = ''; 

          saveItemToLocalStorage(itemText);
      }
  } else {
      itemInput.classList.add('error');
      errorMessage.textContent = "LERDO digite nome do produto!";
      itemInput.parentNode.insertBefore(errorMessage, itemInput.nextSibling);
      errorMessage.style.display = 'block';
  }
}


function saveItemToLocalStorage(item) {
  let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
  items.push(item);
  localStorage.setItem('shoppingList', JSON.stringify(items));
}


export function loadItemsFromLocalStorage() {
  const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
  const itemList = document.getElementById('itemList');

  items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Excluir';
      deleteButton.addEventListener('click', function() {
          li.remove();
          removeItemFromLocalStorage(item); 
      });

      li.appendChild(deleteButton);
      itemList.appendChild(li);


      setTimeout(() => {
          li.classList.add('show');
      }, 10);
  });
}


function removeItemFromLocalStorage(itemToRemove) {
  let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
  items = items.filter(item => item !== itemToRemove);
  localStorage.setItem('shoppingList', JSON.stringify(items));
}
