

async function getToken(username, password) {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });
  const tokenResponse = await response.json();
  localStorage.token = tokenResponse.token;
  // console.log(localStorage.token);
}

async function getData() {
  const response = await fetch('http://localhost:3000/clients/all', {
    // method: 'GET',
    headers: ({
      authorization: localStorage.token,
    })
  });
  const clients = await response.json();
  console.log(clients);
}

getToken('Brian','brian');
getData();

