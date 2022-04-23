import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import s from './BankForm.module.scss';

function BankForm({
  sendBankDetails,
  buttonTitle,
  title,
  toggleModal,
  modalForm,
  bankInfo = {
    name: '',
    interestRate: '',
    maximumLoan: '',
    minimumDownPayment: '',
    loanTerm: '',
    id: null,
  },
}) {
  const [name, setName] = useState(bankInfo.name);
  const [interestRate, setInterestRate] = useState(bankInfo.interestRate);
  const [maximumLoan, setMaximumLoan] = useState(bankInfo.maximumLoan);
  const [minimumDownPayment, setMinimumDownPayment] = useState(bankInfo.minimumDownPayment);
  const [loanTerm, setLoanTerm] = useState(bankInfo.loanTerm);
  const [id] = useState(bankInfo.id)

  const inputHandler = e => {
    const { value, name } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'interestRate':
        setInterestRate(value);
        break;

      case 'maximumLoan':
        setMaximumLoan(value);
        break;

      case 'minimumDownPayment':
        setMinimumDownPayment(value);
        break;

      case 'loanTerm':
        setLoanTerm(value);
        break;

      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setInterestRate('');
    setMaximumLoan('');
    setMinimumDownPayment('');
    setLoanTerm('');
  };

  const onSubmit = e => {
    e.preventDefault();
    const bank = {
      name,
      interestRate,
      maximumLoan,
      minimumDownPayment,
      loanTerm,
      id,
    };
    sendBankDetails(bank);
    if (modalForm) {
      toggleModal();
    }
    reset();
  };

  return (
    <form onSubmit={onSubmit} className={s.form}>
      <h2 className={s.title}>{title}</h2>
      <TextField
        label="Bank name"
        type="text"
        size="small"
        color="primary"
        name="name"
        margin="dense"
        required
        value={name}
        onChange={inputHandler}
      />
      <TextField
        label="Interest rate (%)"
        type="text"
        size="small"
        color="primary"
        name="interestRate"
        margin="dense"
        required
        value={interestRate}
        onChange={inputHandler}
      />
      <TextField
        label="Maximum loan (USD)"
        type="text"
        size="small"
        color="primary"
        name="maximumLoan"
        margin="dense"
        required
        value={maximumLoan}
        onChange={inputHandler}
      />
      <TextField
        label="Minimum down payment (%)"
        type="text"
        size="small"
        color="primary"
        name="minimumDownPayment"
        margin="dense"
        required
        value={minimumDownPayment}
        onChange={inputHandler}
      />
      <TextField
        label="Loan term (Years)"
        type="text"
        size="small"
        color="primary"
        name="loanTerm"
        margin="dense"
        required
        value={loanTerm}
        onChange={inputHandler}
      />
      <Button
        variant="contained"
        size="normal"
        type="submit"
        color="primary"
      >
        {buttonTitle}
      </Button>
    </form>
  );
}

export default BankForm;
