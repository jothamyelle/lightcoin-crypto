class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    this.transactions.forEach((transaction) => {
      balance += transaction.value;
    });
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed) {
      this.time = new Date();
      this.account.addTransaction(this);
    } else {
      console.log("Sorry, you have insufficient funds.");
      return false;
    }
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  get isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  get isAllowed() {
    return this.account.balance >= this.amount; 
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(125.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);
