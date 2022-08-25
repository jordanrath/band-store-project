const currencyValue = {
  "PENNY": 1,
  "NICKEL": 5,
  "DIME": 10,
  "QUARTER": 25,
  "ONE": 100,
  "FIVE": 500,
  "TEN": 1000,
  "TWENTY": 2000,
  "ONE HUNDRED": 10000
};
//console.log(currencyValue.PENNY)

function checkCashRegister(price, cash, cid) {

  let customerChange = cash * 100 - price * 100; //the change left, if any from the purchase.
  let customerChangeCheck = customerChange;
  let change = [];
  let status = '';

  let cidTotal = 0; //placeholder for all cash in drawer.
  let reduceCid = cid.reduce((a, b) => ((b[1] !== 0) ? [...a, b] : a), []).reverse();

  reduceCid.forEach(item => {
    let currencyType = item[0]; //the type of currency being used i.e. "DIME"
    let currencySum = item[1] * 100; //the amount of each currency in the cash register.
    cidTotal += currencySum;

    let amount = 0;
    while (customerChange >= currencyValue[currencyType] && currencySum > 0) {
      amount += currencyValue[currencyType];
      customerChange -= currencyValue[currencyType];
      currencySum -= currencyValue[currencyType];
    }

    if (amount !== 0) {
      change.push([currencyType, amount / 100]);
    }
  });

  if (customerChange > 0) {
    status = 'INSUFFICIENT_FUNDS';
    change = [];
  } else if (customerChange == 0 && customerChangeCheck == cidTotal) {
    status = 'CLOSED'
    change = cid;
  } else {
    status = 'OPEN';
  }
  return {
    'status': status,
    'change': change
  }
}

console.log(checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.10],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]));

  //{status: "OPEN", change: [["QUARTER", 0.5]]}
  
  //checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
  //{status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}
  
  //checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
  //{status: "INSUFFICIENT_FUNDS", change: []}
  
  //checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
  //{status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}