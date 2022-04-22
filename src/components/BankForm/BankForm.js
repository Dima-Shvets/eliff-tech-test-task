import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import s from './BankForm.module.scss';

function BankForm({
  sendBankDetails,
  buttonTitle,
  bankInfo = {
    name: '',
    interestRate: '',
    maximumLoan: '',
    minimumDownPayment: '',
    loanTerm: '',
  },
}) {
  const [name, setName] = useState(bankInfo.name);
  const [interestRate, setInterestRate] = useState(bankInfo.interestRate);
  const [maximumLoan, setMaximumLoan] = useState(bankInfo.maximumLoan);
  const [minimumDownPayment, setMinimumDownPayment] = useState(bankInfo.minimumDownPayment);
  const [loanTerm, setLoanTerm] = useState(bankInfo.loanTerm);

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
    };
    sendBankDetails(bank);
    reset();
  };

  return (
    <form onSubmit={onSubmit} className={s.form}>
      <TextField
        className={s.input}
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
        className={s.input}
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
        className={s.input}
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
        className={s.input}
        label="Minimum down payment (USD)"
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
        className={s.input}
        label="Loan term (Months)"
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
        className={s.btn}
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