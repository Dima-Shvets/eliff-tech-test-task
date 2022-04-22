import AddBankForm from '../../components/BankForm/BankForm';
import BankForm from '../../components/BankForm/BankForm';
import Modal from '../../components/Modal';

import Button from '@mui/material/Button';
import { useState } from 'react';

function BanksView({ banks, addBank, deleteBank}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [bank, setBank] = useState({});

    const onEditButtonClick = (id) => {
        setBank(banks.find(bank => bank.id === id));
        toggleModal()
    }

    const toggleModal = () => {
    setModalOpen(prevState=>(!prevState))
    }
    
    const updateBank = (id, bank) => {

  }

  return (
    <div>
      <AddBankForm sendBankDetails={addBank} buttonTitle={'Add bank'} />
      <ul>
        {banks.map(({id, name, interestRate, maximumLoan, minimumDownPayment, loanTerm}) => (
          <li key={id}>
            <h3>{name}</h3>
            <ul>
              <li>Interest rate: {interestRate}</li>
              <li>Maximum loan: {maximumLoan}</li>
              <li>Minimum down payment: {minimumDownPayment}</li>
              <li>Loan term: {loanTerm}</li>
            </ul>
            <Button
              variant="contained"
              size="small"
              type="submit"
              color="primary"
                onClick={() => deleteBank(id)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              size="small"
              type="submit"
              color="primary"
                onClick={()=>onEditButtonClick(id)}
            >
              Edit
            </Button>
          </li>
        ))}
          </ul>
          {modalOpen &&
        <Modal toggleModal={toggleModal}>
          <BankForm
            sendBankDetails={updateBank}
            buttonTitle={'Save'}
            bankInfo={bank}/>
        </Modal>}
    </div>
  );
}

export default BanksView;
