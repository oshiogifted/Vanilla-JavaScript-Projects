const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [];

// Fetch random user and add money
const getRandomUser = async () => {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  addData(newUser);
}

// Double everyones money
const doubleMoney = () => {
  console.log('initial data', data);
  data = data.map(user => {
    return {...user, money: user.money * 2};
  });
  console.log('new data', data);

  updateDOM();
}

// Sort users by richest
const sortByRichest = () => {
  data.sort((a, b) => b.money - a.money); // richest (most money) first
  updateDOM();
}

// Filter only millionaries
const showMillionaires = () => {
  data = data.filter(user => user.money > 1000000);
  updateDOM();
}

// Calculate the total wealth 
const calculateWealth = () => {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3 id="totalWealth">Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;

  let elementExist = document.getElementById("totalWealth");
  if (elementExist) {
    wealthEl.innerHTML = null;
  }
  
  main.appendChild(wealthEl);
}

// Add new obj to data arr
const addData = (obj) => {
  data.push(obj);

  updateDOM();
}

// Update DOM 
// 'providedData' is defaulted to 'data' arr if nothing is passed in
const updateDOM = (providedData = data) => {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  // forEach High Order Array Method
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// Format number as money
const formatMoney = (num) => {
  return '$' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

getRandomUser();
getRandomUser();
getRandomUser();

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);