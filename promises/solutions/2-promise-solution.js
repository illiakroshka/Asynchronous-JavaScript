'use strict';

const totalPromise = (items) => {
  return new Promise((resolve, reject) => {
    let result = 0;
    for (const item of items) {
      if (item.price < 0) {
        reject(new Error('Negative price is not allowed'));
        return;
      }
      result += item.price;
    }
    resolve(result);
  })
}

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

totalPromise(electronics)
  .then((money) => {
    console.log({ money });
  })
  .catch((err) => {
    console.error({ err });
  })