import { useState } from 'react';

import AddBankForm from '../../components/BankForm/BankForm';
import BankForm from '../../components/BankForm/BankForm';
import Modal from '../../components/Modal';
import BankCard from '../../components/BankCard';

import s from './BanksView.module.scss';

function BanksView({ banks, addBank, deleteBank, editBank }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [bank, setBank] = useState({});

  const onEditButtonClick = id => {
    setBank(banks.find(bank => bank._id === id));
    toggleModal();
  };

  const toggleModal = () => {
    setModalOpen(prevState => !prevState);
  };

  return (
    <div className={s.BanksView}>
      <AddBankForm 
        sendBankDetails={addBank}
        buttonTitle="Add bank"
        title="Bank information"
      />
      <ul className={s.list}>
        {banks.map(bank => (
            <li className={s.card} key={bank._id}>
            <BankCard
              bank={bank}
              deleteBank={deleteBank}
              onEditButtonClick={onEditButtonClick}
              withButtons/>
            </li>
          ),
        )}
      </ul>
      {modalOpen && (
        <Modal toggleModal={toggleModal}>
          <BankForm
            modalForm
            title="Edit Bank"
            sendBankDetails={editBank}
            buttonTitle={'Save'}
            bankInfo={bank}
            editBank={editBank}
            toggleModal={toggleModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default BanksView;
