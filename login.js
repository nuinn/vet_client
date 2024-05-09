// import * as dataFetch from './main.js';

const root = document.getElementById('root');
const formHTMLCollection = document.getElementsByTagName('form');
const form = formHTMLCollection[0];
console.log(form);
const input = form[0];
const password = form[1];
console.log('input',input.value);

console.log('password',password);
// const submit = document.querySelector('input[type=submit]');


async function getToken({ username, password }) {
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
  return tokenResponse.token;
}

form.onsubmit = async (e) => {
  e.preventDefault();
  const token = await getToken({ username: input.value, password: password.value });
  if (!token) {
    alert('Details don\'t match');
    return;
  }
  window.location.href='./showClients.html';
};
