// Function to initialize the form and handle the order process
function initializeForm() {
    const form = document.createElement('form');
    form.id = 'orderForm';

    // Drink selection
    const drinkLabel = document.createElement('label');
    drinkLabel.textContent = 'Choose a drink: ';
    const drinkSelect = document.createElement('select');
    drinkSelect.id = 'drinkSelect';
    const defaultDrinkOption = document.createElement('option');
    defaultDrinkOption.value = '';
    defaultDrinkOption.textContent = 'Select';
    defaultDrinkOption.selected = true;
    defaultDrinkOption.disabled = true;
    drinkSelect.appendChild(defaultDrinkOption);
    ['Coffee', 'Tea', 'Smoothie', 'Juice', 'Milkshake'].forEach(drink => {
        const option = document.createElement('option');
        option.value = drink;
        option.textContent = drink;
        drinkSelect.appendChild(option);
    });
    drinkLabel.appendChild(drinkSelect);
    form.appendChild(drinkLabel);
    form.appendChild(document.createElement('br'));

    // Temperature selection (hidden initially)
    const tempLabel = document.createElement('label');
    tempLabel.textContent = 'Choose temperature: ';
    tempLabel.id = 'tempLabel';
    tempLabel.style.display = 'none';
    const tempSelect = document.createElement('select');
    tempSelect.id = 'tempSelect';
    ['Hot', 'Iced'].forEach(temp => {
        const option = document.createElement('option');
        option.value = temp;
        option.textContent = temp;
        tempSelect.appendChild(option);
    });
    tempLabel.appendChild(tempSelect);
    form.appendChild(tempLabel);
    form.appendChild(document.createElement('br'));

    // Flavor selection
    const flavorLabel = document.createElement('label');
    flavorLabel.textContent = 'Choose a flavor: ';
    const flavorSelect = document.createElement('select');
    flavorSelect.id = 'flavorSelect';
    const defaultFlavorOption = document.createElement('option');
    defaultFlavorOption.value = '';
    defaultFlavorOption.textContent = 'Select';
    defaultFlavorOption.selected = true;
    defaultFlavorOption.disabled = true;
    flavorSelect.appendChild(defaultFlavorOption);
    form.appendChild(flavorLabel);
    flavorLabel.appendChild(flavorSelect);
    form.appendChild(document.createElement('br'));

    // Flavor options based on drink
    const flavorOptions = {
        Coffee: ['French Vanilla'],
        Tea: ['Honey Chai Turmeric', 'Blueberry Green Tea', 'Jasmine', 'Caramel Vanilla', 'Peppermint', 'Matcha'],
        Smoothie: ['Strawberry', 'Mango', 'Banana'],
        Juice: ['Orange', 'Apple', 'Grape', 'Pineapple'],
        Milkshake: ['Chocolate', 'Vanilla', 'Strawberry', 'Oreo']
    };

    const updateFlavors = () => {
        const selectedDrink = drinkSelect.value;
        flavorSelect.innerHTML = ''; // Clear existing options
        const defaultFlavorOption = document.createElement('option');
        defaultFlavorOption.value = '';
        defaultFlavorOption.textContent = 'Select';
        defaultFlavorOption.selected = true;
        defaultFlavorOption.disabled = true;
        flavorSelect.appendChild(defaultFlavorOption);
        if (flavorOptions[selectedDrink]) {
            flavorOptions[selectedDrink].forEach(flavor => {
                const option = document.createElement('option');
                option.value = flavor;
                option.textContent = flavor;
                flavorSelect.appendChild(option);
            });
        }
    };

    // Add-ins checkboxes
    const addInsLabel = document.createElement('fieldset');
    const addInsLegend = document.createElement('legend');
    addInsLegend.textContent = 'Choose add-ins:';
    addInsLabel.appendChild(addInsLegend);
    const addInsContainer = document.createElement('div');
    addInsContainer.id = 'addInsContainer';
    addInsLabel.appendChild(addInsContainer);
    form.appendChild(addInsLabel);

    // Add-ins options based on drink and flavor
    const addInsOptions = {
        Coffee: {
            'French Vanilla': ['Milk', 'Sugar', 'Whipped Cream', 'Heavy Cream', 'Dark Hot Chocolate Powder', 'Marshmallow Hot Chocolate Powder', 'cinnamon'],
        },
        Tea: {
            'Honey Chai Turmeric': ['Honey', 'Cinnamon', 'Turmeric', 'Milk', 'Sugar'],
            'Blueberry Green Tea': ['Honey', 'Blueberries', 'Lemon Slice', 'Milk', 'Sugar'],
            Jasmine: ['Honey', 'Jasmine Flowers', 'Sugar', 'Milk'],
            'Caramel Vanilla': ['Caramel Drizzle', 'Vanilla Syrup', 'Milk', 'Sugar'],
            Peppermint: ['Honey', 'Mint Leaves', 'Sugar', 'Milk'],
            Matcha: ['Honey', 'Milk', 'Whipped Cream', 'Sugar']
        },
        Smoothie: {
            Strawberry: ['Ice', 'Whipped Cream', 'Chia Seeds'],
            Mango: ['Ice', 'Whipped Cream', 'Coconut Flakes'],
            Banana: ['Ice', 'Peanut Butter', 'Chia Seeds']
        },
        Juice: {
            Orange: ['Ice', 'Mint Leaves', 'Sugar'],
            Apple: ['Ice', 'Cinnamon', 'Honey'],
            Grape: ['Ice', 'Sugar', 'Lemon Slice'],
            Pineapple: ['Ice', 'Coconut Flakes', 'Mint Leaves']
        },
        Milkshake: {
            Chocolate: ['Whipped Cream', 'Chocolate Chips', 'Sprinkles'],
            Vanilla: ['Whipped Cream', 'Vanilla Syrup', 'Sprinkles'],
            Strawberry: ['Whipped Cream', 'Strawberry Syrup', 'Sprinkles'],
            Oreo: ['Whipped Cream', 'Crushed Oreos', 'Chocolate Syrup']
        }
    };

    const updateAddIns = () => {
        const selectedDrink = drinkSelect.value;
        const selectedFlavor = flavorSelect.value;
        addInsContainer.innerHTML = ''; // Clear existing options
        if (addInsOptions[selectedDrink] && addInsOptions[selectedDrink][selectedFlavor]) {
            addInsOptions[selectedDrink][selectedFlavor].forEach(addIn => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = addIn;
                checkbox.id = `addIn-${addIn}`;
                const label = document.createElement('label');
                label.textContent = addIn;
                label.htmlFor = checkbox.id;
                addInsContainer.appendChild(checkbox);
                addInsContainer.appendChild(label);
                addInsContainer.appendChild(document.createElement('br'));
            });
        }
    };

    // Update flavors when the drink changes
    drinkSelect.addEventListener('change', () => {
        updateFlavors();
        updateAddIns();
        if (drinkSelect.value === 'Coffee' || drinkSelect.value === 'Tea') {
            tempLabel.style.display = 'block';
        } else {
            tempLabel.style.display = 'none';
        }
    });

    flavorSelect.addEventListener('change', updateAddIns);

    // Initialize flavors and add-ins for the default drink
    updateFlavors();
    updateAddIns();

    // Submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Submit Order';
    submitButton.addEventListener('click', handleOrder);
    form.appendChild(submitButton);

    document.body.appendChild(form);
}

// Function to handle the order submission
function handleOrder() {
    const drink = document.getElementById('drinkSelect').value;
    const temperature = (drink === 'Coffee' || drink === 'Tea') ? document.getElementById('tempSelect').value : null;
    const flavor = document.getElementById('flavorSelect').value;
    const addIns = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

    alert(`You ordered a ${temperature ? temperature + ' ' : ''}${flavor} ${drink} with ${addIns.length > 0 ? addIns.join(', ') : 'no add-ins'}.`);
}

// Initialize the form on page load
document.addEventListener('DOMContentLoaded', initializeForm);
