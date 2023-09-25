//const uri = "https://todoitems.buchwaldshave34.dk/api/todoitems";
const uri = " https://cityinfo.buchwaldshave34.dk/api/City";
let todos = [];
let ThisUserName = "UserRenas";


function getItems() {
    fetch(uri + "?UserName=" + ThisUserName)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addCountryId = document.getElementById('CountryId');
    const addDescription = document.getElementById('description');
    const item = {
        name: addNameTextbox.value.trim(),
        countryId: addCountryId.value.trim(),
        description: addDescription.value.trim(),
    };

    fetch(uri + "?UserName=" + ThisUserName, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
           
        })
        .catch(error => console.error('Unable to add item.', error));
}

// put item instant of id
function deleteItem(item) {
    fetch(`${uri}/${item}` + "?UserName=" + ThisUserName, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

//use cityId instatnt of id 
function displayEditForm(cityId) {
    const item = todos.find(item => item.cityId === cityId);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.cityId;
    //document.getElementById('edit-isComplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const addCountryId = document.getElementById('CountryId').value;
    const addDescription = document.getElementById('description').value;
    const item = {
       cityId: parseInt(itemId, 10),
        //isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim(),
        countryId: document.getElementById('CountryId').value.trim(),
        description: document.getElementById('description').value.trim(),
    };

    fetch(`${uri}/${itemId}` + "?UserName=" + ThisUserName + CountryId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.cityId})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.cityId})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);

        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.name);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    todos = data;
}