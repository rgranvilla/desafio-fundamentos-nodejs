import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  id: string;
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ id, title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();

    const validBalanceValue =
      type === 'income' ? true : balance.income >= value + balance.outcome;

    if (!validBalanceValue) {
      throw Error('This transaction goes beyond the companys cash');
    }

    if (type !== 'income' && type !== 'outcome') {
      throw Error('The type is out of scope.');
    }

    const transaction = this.transactionsRepository.create({
      id,
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
