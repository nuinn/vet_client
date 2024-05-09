const root = document.getElementById('root');
const formHTMLCollection = document.getElementsByTagName('form');
const form = formHTMLCollection[0];
const input = form[0];
const password = form[1];
const repeatedPassword = form[2];

async function getToken({ username, password, repeatedPassword }) {
  const response = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
      repeatedPassword
    })
  });
  const tokenResponse = await response.json();
  localStorage.token = tokenResponse.token;
  return tokenResponse.token;
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const token = await getToken({ username: input.value, password: password.value, repeatedPassword: repeatedPassword.value });
  if (!token) {
    alert('Details don\'t match');
    return;
  }
  window.location.href='./showClients.html';
};
