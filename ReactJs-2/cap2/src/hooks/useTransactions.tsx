import {createContext, useEffect, useState, ReactNode, useContext} from 'react';
import { api } from "../services/api";


interface Transaction {
  id: number;
  titulo: string;
  valor: number;
  type: string;
  categoria: string;
  createdAt: string;
}

type TransactionIpnut =Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionIpnut) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData); 

export function TransactionsProvider({children}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('trasactions')
      .then(response => console.log(response.data.transactions))
  }, []);

  async function createTransaction(transactionInput: TransactionIpnut){
    const response = await api.post('transactions', {...transactionInput, createdAt: new Date()});
    const {transaction} = response.data;
  
    setTransactions([...transactions, transaction]);
  }
  

  return(
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}