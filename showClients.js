const root = document.getElementById('root');
const token = localStorage.token;
console.log(token);

let pageNumber = 0;
let skipAmount = 3;
let skip = skipAmount*pageNumber;
let limit = 2;




async function getData(token) {
  const response = await fetch(`http://localhost:3000/clients/all?skip=${skip}&limit=${limit}`, {
    method: 'GET',
    headers: ({
      authorization: token,
    })
  });
  const clients = await response.json();
  return clients;
}
async function printClients() {
  const clients = await getData(token);
  const keys = Object.keys(clients[0]);
  const table = document.createElement('table');
  table.id = 'table';
  const headerRow = document.createElement('tr');
  table.appendChild(headerRow);
  for (let i = 1; i < keys.length; i++) {
    const keyName = keys[i];
    const header = document.createElement('th');
    header.innerText = keyName;
    headerRow.appendChild(header);
  }
  for (let i = 0; i < clients.length; i++) {
    const client = clients[i];
    const clientData = Object.values(client);
    const clientRow = document.createElement('tr');
    for (let j = 1; j < clientData.length; j++) {
      const cellData = clientData[j];
      if (typeof cellData === 'object'){
        const cell = document.createElement('td');
        cell.innerText = Object.values(cellData).join(' ');
        clientRow.appendChild(cell);
      }
      else{
        const cell = document.createElement('td');
        cell.innerText = cellData;
        clientRow.appendChild(cell);
      }
    }
    table.appendChild(clientRow);
  }
  root.appendChild(table);
  console.log(clients[0]);
  return table;
}

printClients();

const itemsPerPageDescription = document.createElement('p');
itemsPerPageDescription.innerText = 'Items per Page';
root.appendChild(itemsPerPageDescription);
const itemsPerPage = document.createElement('input');
itemsPerPage.id = 'itemsPerPage';
itemsPerPage.type = 'number';
root.appendChild(itemsPerPage);
const submit = document.createElement('button');
submit.innerText = 'SUBMIT';
root.appendChild(submit);
const lineBreak = document.createElement('p');
lineBreak.innerText = '';
root.appendChild(lineBreak);
submit.onclick = () => {
  limit = itemsPerPage.value;
  const table = document.getElementById('table');
  table.remove();
  printClients();
};
