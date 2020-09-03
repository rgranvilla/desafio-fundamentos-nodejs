import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeSum = this.transactions.reduce((total, element) => {
      if (element.type === 'income') {
        let newTotal = total;
        newTotal += element.value;
        return newTotal;
      }
      return total;
    }, 0);

    const outcomeSum = this.transactions.reduce((total, element) => {
      if (element.type === 'outcome') {
        let newTotal = total;
        newTotal += element.value;
        return newTotal;
      }
      return total;
    }, 0);

    const balance = {
      income: incomeSum,
      outcome: outcomeSum,
      total: incomeSum - outcomeSum,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
