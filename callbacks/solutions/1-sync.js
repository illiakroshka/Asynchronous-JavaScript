'use strict';

const total = (items, callback) => {
  let result = 0;
  for (const item of items) {
    result += item.price;
  }
  return callback(result);
};

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

const money = total(electronics,(money)=>{
  return money;
});

console.log({ money });