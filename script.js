// script.js

// Create a form for ordering a drink
const form = document.createElement('form');
form.id = 'drinkOrderForm';

// Create a label and select element for drink type
const drinkLabel = document.createElement('label');
drinkLabel.for = 'drinkType';
drinkLabel.textContent = 'Choose your drink: ';

const drinkSelect = document.createElement('select');
drinkSelect.id = 'drinkType';
drinkSelect.name = 'drinkType';

const drinks = ['Coffee', 'Tea', 'Juice', 'Water'];
drinks.forEach(drink => {
    const option = document.createElement('option');
    option.value = drink.toLowerCase();
    option.textContent = drink;
    drinkSelect.appendChild(option);
});

// Create a label and input for quantity
const quantityLabel = document.createElement('label');
quantityLabel.for = 'quantity';
quantityLabel.textContent = 'Quantity: ';

const quantityInput = document.createElement('input');
quantityInput.type = 'number';
quantityInput.id = 'quantity';
quantityInput.name = 'quantity';
quantityInput.min = 1;
quantityInput.value = 1;

// Create a submit button
const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.textContent = 'Order';

// Append elements to the form
form.appendChild(drinkLabel);
form.appendChild(drinkSelect);
form.appendChild(document.createElement('br'));
form.appendChild(quantityLabel);
form.appendChild(quantityInput);
form.appendChild(document.createElement('br'));
form.appendChild(submitButton);

// Append the form to the body
document.body.appendChild(form);

// Add an event listener to handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const drinkType = drinkSelect.value;
    const quantity = quantityInput.value;
    alert(`You ordered ${quantity} ${drinkType}(s).`);
});