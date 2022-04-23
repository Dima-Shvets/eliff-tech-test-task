import AddBankForm from '../../components/BankForm/BankForm';
import BankForm from '../../components/BankForm/BankForm';
import Modal from '../../components/Modal';

import Button from '@mui/material/Button';
import { useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function BanksView({ banks, addBank, deleteBank, editBank }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [bank, setBank] = useState({});

  const onEditButtonClick = id => {
    setBank(banks.find(bank => bank.id === id));
    toggleModal();
  };

  const toggleModal = () => {
    setModalOpen(prevState => !prevState);
  };

  return (
    <div>
      <AddBankForm
        sendBankDetails={addBank}
        buttonTitle="Add bank"
        title="Add bank"
      />
      <ul>
        {banks.map(
          ({
            id,
            name,
            interestRate,
            maximumLoan,
            minimumDownPayment,
            loanTerm,
          }) => (
            <li key={id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Interest rate: {interestRate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Maximum loan: {maximumLoan}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Minimum down payment: {minimumDownPayment}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Loan term: {loanTerm}
                  </Typography>
                </CardContent>
                <CardActions>
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
                    onClick={() => onEditButtonClick(id)}
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
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
