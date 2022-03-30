const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');
let data = [];
function formatMoney(number){
     return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,');
}
function calculateWealthResource(){
     const wealth = data.reduce((accurate,user) => (accurate += user.money),0);
     const div = document.createElement('div');
     div.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
     main.appendChild(div);
}
function updateDOM(providedData = data) {
     main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
     providedData.forEach(item => {
          const div = document.createElement('div');
          div.classList.add('person');
          div.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
          main.appendChild(div);
     });
}
function addData(object){
     data.push(object);
     updateDOM();
}
async function getRandomUser(){
     const response = await fetch('https://randomuser.me/api');
     const data = await response.json();
     const user = data.results[0];
     const newUser = {
          name: `${user.name.first} ${user.name.last}`,
          money: Math.floor(Math.random() * 1000000),
     };
     addData(newUser);
}
getRandomUser();
getRandomUser();
getRandomUser();
function doubleMoney(){
     data = data.map(user => {
          return {...user,money: user.money * 2};
     });
     updateDOM();
}
function sortByRichest(){
     data.sort((a,b) => b.money - a.money);
     updateDOM();
}
function showMillionairesPeople(){
     data = data.filter(user => user.money > 1000000);
     updateDOM();
}
calculateWealth.addEventListener('click',calculateWealthResource);
addUser.addEventListener('click',getRandomUser);
double.addEventListener('click',doubleMoney);
sort.addEventListener('click',sortByRichest);
showMillionaires.addEventListener('click',showMillionairesPeople);