import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import BankCard from '../../components/BankCard';

import s from './CalculatorView.module.scss';

function CalculatorView({ banks }) {
  const [initialLoan, setInitialLoan] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [bank, setBank] = useState({});
  const [calculate, setCalculate] = useState(false);

  const onOptionClick = id => {
    setBank(banks.find(bank => bank.id === id));

  };

  const onInpuChange = e => {
    const { value, name } = e.target;
    setCalculate(false);
    switch (name) {
      case 'initialLoan':
        setInitialLoan(value);
        break;

      case 'downPayment':
        setDownPayment(value);
        break;

      default:
        return;
    }
  };

  const handleChange = (e) => {
    const id = e.target.value;
    setBank(banks.find(bank => bank.id === id))
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(bank).length === 0) {
      alert(`Choose a bank first`);
      return;
    }
    if (initialLoan > bank.maximumLoan) {
      alert(`Loan ammount can't be more than ${bank.maximumLoan}USD`);
      return;
    }
    if (downPayment < (initialLoan * bank.minimumDownPayment) / 100) {
      alert(
        `Down payment can't be less than ${bank.minimumDownPayment}% of the loan`,
      );
      return;
    }
    setCalculate(true);
  };

  const round = (number, n) => {
    if (isNaN(number) || isNaN(n)) {
      return false;
    }
    const m = Math.pow(10, n);
    return Math.round(number * m) / m;
  };

  const calculatePayment = () => {
    const principalLoanAmmount = initialLoan - downPayment;
    const monthlyRate = bank.interestRate / 100 / 12;
    const loanTermMonth = bank.loanTerm * 12;
    const divided =
      principalLoanAmmount *
      monthlyRate *
      Math.pow(1 + monthlyRate, loanTermMonth);
    const divider = Math.pow(1 + monthlyRate, loanTermMonth) - 1;
    const result = divided / divider;
    return round(result, 2);
  };

  return (
    <div className={s.CalculatorView}>
      <h2 className={s.title}>Mortgage calculator</h2>
      <form onSubmit={onSubmit} className={s.form}>
        <TextField
          label="Initial loan (USD)"
          type="text"
          size="small"
          color="primary"
          name="initialLoan"
          margin="dense"
          required
          value={initialLoan}
          onChange={onInpuChange}
        />
        <TextField
          label="Down payment (USD)"
          type="text"
          size="small"
          color="primary"
          name="downPayment"
          margin="dense"
          required
          value={downPayment}
          onChange={onInpuChange}
        />
        <div className={s.box}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Bank</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Object.keys(bank).length === 0 ? '' : bank.id}
                label="Age"
                onChange={handleChange}
              >
                {banks.length === 0 ? (
              <MenuItem>
                  There is no banks in the list. 
              </MenuItem>
            ) : (
              banks.map(bank => (
                <MenuItem key={bank.id} value={bank.id} onClick={() => onOptionClick(bank.id)}>
                  {bank.name}
                </MenuItem>
              ))
            )}
              </Select>
            </FormControl>
          </Box>
        </div>

        {Object.keys(bank).length !== 0 && (
          <div className={s.card}>
            <BankCard bank={bank} />
          </div>
        )}

        <Button variant="contained" size="normal" type="submit" color="primary">
          Calculate
        </Button>
      </form>
      {calculate && (
        <div className={s['result-wrapper']}>
          <h2 className={s.title}>monthly mortgage payment</h2>
          <p className={s.result}>{calculatePayment()}USD</p>
        </div>
      )}
    </div>
  );
}

export default CalculatorView;
