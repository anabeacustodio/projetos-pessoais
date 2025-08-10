const form = document.getElementById('recipe-form');
const ingredientsList = document.getElementById('ingredients-list');
const addIngredientBtn = document.getElementById('add-ingredient');
const adjustedList = document.getElementById('adjusted-list');

addIngredientBtn.addEventListener('click', () => {
  const newInput = ingredientsList.firstElementChild.cloneNode(true);
  newInput.querySelectorAll('input').forEach(input => input.value = '');
  ingredientsList.appendChild(newInput);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const originalServings = parseFloat(document.getElementById('original-servings').value);
  const newServings = parseFloat(document.getElementById('new-servings').value);
  const ingredientElements = ingredientsList.querySelectorAll('.ingredient');

  adjustedList.innerHTML = '';

  ingredientElements.forEach(ing => {
    const name = ing.querySelector('.name').value;
    const quantity = parseFloat(ing.querySelector('.quantity').value);
    const unit = ing.querySelector('.unit').value;

    if (!isNaN(quantity)) {
      const adjustedQty = (quantity / originalServings) * newServings;
      const li = document.createElement('li');
      li.textContent = `${name}: ${adjustedQty.toFixed(2)} ${unit}`;
      adjustedList.appendChild(li);
    }
  });
});