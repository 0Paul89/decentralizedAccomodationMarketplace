const propertyList = document.querySelector('.property-list');

function addProperty() {
  // Create the dialog box
  const dialog = document.createElement('div');
  dialog.classList.add('dialog');
  dialog.innerHTML = `
    <form>
      <label for="property-name">Property name:</label><br>
      <input type="text" id="property-name"><br>
      <label for="property-attribute-1">Attribute 1:</label><br>
      <input type="text" id="property-attribute-1"><br>
      <label for="property-attribute-2">Attribute 2:</label><br>
      <input type="text" id="property-attribute-2"><br>
      <label for="property-attribute-3">Attribute 3:</label><br>
      <input type="text" id="property-attribute-3"><br>
      <button type="submit">Add</button>
      <button type="button" id="cancel-button">Cancel</button>
    </form>
  `;
  document.body.appendChild(dialog);

  // Add an event listener to the "Add" button
  const form = dialog.querySelector('form');
  form.addEventListener('submit', event => {
    event.preventDefault();

    // Get the property name, attribute 1, attribute 2, and attribute 3 from the form
    const name = form.querySelector('#property-name').value;
    const attribute1 = form.querySelector('#property-attribute-1').value;
    const attribute2 = form.querySelector('#property-attribute-2').value;
    const attribute3 = form.querySelector('#property-attribute-3').value;

    // Create a new property object with the entered values
    const property = {
      name: name,
      attribute1: attribute1,
      attribute2: attribute2,
      attribute3: attribute3
      
    };

    // Add the property to the property list
    const div = document.createElement('div');
    div.classList.add('property');
    div.innerHTML = `
      <h3>${property.name}</h3>
      <p>Attribute 1: ${property.attribute1}</p>
      <p>Attribute 2: ${property.attribute2}</p>
      <p>Attribute 3: ${property.attribute3}</p>
      <button class="delete-button">Delete</button>
    `;
    propertyList.appendChild(div);

    // Add an event listener to the "Delete" button
    const deleteButton = div.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
      div.remove();
    });

    // Remove the dialog box
    dialog.remove();
  });

  // Add an event listener to the "Cancel" button
  const cancelButton = dialog.querySelector('#cancel-button');
  cancelButton.addEventListener('click', () => {
    // Remove the dialog box
    dialog.remove();
  });
}

// Add an event listener to the "Add property" button
const addButton = document.querySelector('#add-property');
addButton.addEventListener('click', addProperty);

function displayProperties(properties) {
  // Clear the existing property list
  propertyList.innerHTML = '';

  for (const property of properties) {
    const div = document.createElement('div');
    div.classList.add('property');
    div.innerHTML = `
      <h3>${property.name}</h3>
      <p>Attribute 1: ${property.attribute1}</p>
      <p>Attribute 2: ${property.attribute2}</p>
      <p>Attribute 3: ${property.attribute3}</p>
    `;
    propertyList.appendChild(div);
  }
}


function searchProperties(wantedAttribute) {
  const properties = propertyList.querySelectorAll('.property');
  const matchingProperties = [];

  for (const property of properties) {
    const attribute1 = property.querySelector('.attribute1').textContent;
    const attribute2 = property.querySelector('.attribute2').textContent;
    const attribute3 = property.querySelector('.attribute3').textContent;

    if (wantedAttribute === attribute1 || wantedAttribute === attribute2 || wantedAttribute === attribute3) {
      matchingProperties.push(property);
    }
  }

  return matchingProperties;
}

// Add an event listener to the "Go" button
const searchButton = document.querySelector('#search-button');
searchButton.addEventListener('click', () => {
  const attribute1 = document.querySelector('#search-attribute-1').value;
  
  const matchingProperties = searchProperties({
    wantedAttribute: attribute1,
  });
  
  displayProperties(searchProperties(attribute1));

  // Do something with the matching properties (e.g. display them on the page)
});




