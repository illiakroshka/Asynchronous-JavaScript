'use strict';

// Task: change `iterate` contract from chainable callbacks
// to Promise (chainable or you can call it with await syntax)


const iteratePromise = (items) => {
  let index = 0;
  const chain = {
    next: () => new Promise((resolve, reject) => {
      if (index < items.length) {
        resolve(items[index++]);
      }
      return chain;
    })
  };
  return chain;
};

const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];


(async () => {
  const items = iteratePromise(electronics);
  const item1 = await items.next();
  console.log(item1);
  const item2 = await items.next();
  console.log(item2);
  const item3 = await items.next();
  console.log(item3);
})();