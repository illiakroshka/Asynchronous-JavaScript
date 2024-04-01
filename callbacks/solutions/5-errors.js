'use strict';

const MAX_PURCHASE = 2000;

const calculateSubtotal = (goods, callback) => {
  let amount = 0;
  for (const item of goods) {
    if (typeof item.name !== 'string') {
      return callback(new Error('Noname in item in the bill'));
    }
    if (typeof item.price !== 'number') {
      return callback(new Error(`${item.name} price expected to be number`));
    }
    if (item.price < 0) {
      return callback(new Error(`Negative price for ${item.name}`));
    }
    amount += item.price;
  }
  callback(null, amount);
};

const calculateTotal = (order, callback) => {
  const expenses = new Map();
  const errors = [];
  let total = 0;
  for (const groupName in order) {
    const goods = order[groupName];
    calculateSubtotal(goods, (err, amount) => {
      if (err) {
        return errors.push(err);
      }
      total += amount;
      expenses.set(groupName, amount);
    });
    if (total > MAX_PURCHASE) {
      errors.push(new Error('Total is above the limit'));
      break;
    }
  }
  if (errors.length > 0) {
    const cause = new AggregateError(errors, 'Caused by');
    const error = new Error('Can not calculate total', { cause })
    return callback(error);
  }
  return callback(null, { total, expenses });
};

const purchase = {
  Electronics: [
    { name: 'Laptop', price: 1500 },
    { name: 'Keyboard', price: 100 },
    { name: 'HDMI cable' },
  ],
  Textile: [
    { name: 'Bag', price: 50 },
    { price: 20 },
  ],
};

console.log(purchase);
calculateTotal(purchase, (err, bill) => {
  if (err) {
    console.log('Error detected');
    console.error(err);
  }else {
    console.log(bill);
  }
});
