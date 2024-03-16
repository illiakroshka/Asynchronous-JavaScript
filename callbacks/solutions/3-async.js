'use strict';

// Task: rewrite `total` function to be async with JavaScript timers
// Use `setInterval` and `clearInterval` to check next item each 1 second
// Calculations will be executed asynchronously because of timers
// Run `total` twice (as in example below) but in parallel
// Print debug output for each calculation step (each second)
//
// Hint: example output:
// { check: { item: { name: 'Laptop', price: 1500 } } }
// { check: { item: { name: 'Laptop', price: 1500 } } }
// { check: { item: { name: 'Keyboard', price: 100 } } }
// { check: { item: { name: 'Keyboard', price: 100 } } }
// { check: { item: { name: 'HDMI cable', price: 10 } } }
// { check: { item: { name: 'HDMI cable', price: 10 } } }
// { money: 1610 }
// { money: 1610 }

const total1 = (arr, callback) => {
  const items = [...arr]
  let result = 0;
  const timer = setInterval(()=>{
    const item = items.shift();
    console.log({ check: { item } });
    if (item.price < 0) {
      clearInterval(timer);
      callback(new Error('Negative price is not allowed'));
      return;
    }
    result += item.price;
    if(items.length === 0) {
      clearInterval(timer);
      callback(null, result);
    } 
  },1000);
};

const total2 =(items, callback) => {
  let result = 0;
  let index = 0;

  const timer = setInterval(() => {
    const item = items[index];
    console.log({ check: { item } });
    if (item.price < 0) {
      clearInterval(timer);
      callback(new Error('Negative price is not allowed'));
      return;
    }
    result += item.price;
    index++;
    if (index === items.length) {
      clearInterval(timer);
      callback(null, result);
    }
  }, 1000);
}


const electronics = [
  { name: 'Laptop', price: 1500 },
  { name: 'Keyboard', price: 100 },
  { name: 'HDMI cable', price: 10 },
];

total2(electronics, (error, money) => {
  if (error) console.error({ error });
  else console.log({ money });
});

total2(electronics, (error, money) => {
  if (error) console.error({ error });
  else console.log({ money });
});