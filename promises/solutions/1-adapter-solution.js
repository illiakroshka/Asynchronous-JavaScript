'use strict';

const total = (items, callback) => {
  let result = 0;
  for (const item of items) {
    if (item.price < 0) {
      callback(new Error('Negative price is not allowed'));
      return;
    }
    result += item.price;
  }
  callback(null, result);
};

const totalAsync = (items) => {
  return new Promise((resolve, reject) => {
    total(items,(err, money) => {
      if (err) reject(err);
      else resolve(money);
    })
  })
}

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

totalAsync(electronics)
  .then((money) => {
    console.log({ money });
  })
  .catch((err) => {
    console.error({ err })
  })