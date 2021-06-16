import React, {useState} from 'react';
import {Header} from './components/header';
import {GlobalStyle} from './styles/global';
import {DashBoard} from './components/DashBoard';
import Modal from 'react-modal';
import { TransactionModal } from './components/TransactionModal';
import {TransactionsProvider} from './hooks/useTransactions';

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenTransactionModal(){
      setIsNewTransactionModalOpen(true);
  }

  function handleCloseTransactionModal(){
      setIsNewTransactionModalOpen(false);
  }
  
  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenTransactionModal}/>
      <DashBoard />
      <TransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseTransactionModal}></TransactionModal>
      <GlobalStyle />
    </TransactionsProvider>
  );
}

