import React, { FormEvent, useState, useContext} from "react";
import Modal from "react-modal";
import { Container, TrasactionTypeContainer, RadioBox } from "./style";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { api } from "../../services/api";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function TransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionProps) {
  const {createTransaction}= useTransactions();

  const [titulo, setTitulo] = useState('');
  const [valor, setValor] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [type, setType] = useState('deposit');

  async function handleTransactionSubmit(event : FormEvent){
    event.preventDefault();

    await createTransaction({
      titulo,
      valor,
      categoria,
      type
    });

    setTitulo('');
    setValor(0);
    setCategoria('');
    setType('deposit');

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar" />
      </button>

      <Container onSubmit={handleTransactionSubmit}>
        <h2>Cadastrar transação</h2>

        <input placeholder="Título" value={titulo} onChange={(event) => setTitulo(event.target.value)}/>

        <input type="number" placeholder="Valor" value={valor} onChange={(event) => setValor(Number(event.target.value))}/>

        <TrasactionTypeContainer>
          <RadioBox 
            type="button"
            onClick={() => setType('deposit')} 
            isActive={type === 'deposit'} 
            activeColor = 'green'
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox type="button"
            onClick={() => setType('withdraw')} 
            isActive={type === 'withdraw'} 
            activeColor = 'red'
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TrasactionTypeContainer>

        <input placeholder="Categoria" value={categoria} onChange={(event) => setCategoria(event.target.value)}/>

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
