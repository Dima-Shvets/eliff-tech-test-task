import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import BankCard from '../../components/BankCard'

import { Link } from 'react-router-dom';

function CalculatorView({ banks }) {
  const [initialLoan, setInitialLoan] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [bank, setBank] = useState({});
  const [calculate, setCalculate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onOptionClick = id => {
    setBank(banks.find(bank => bank.id === id));
    handleClose();
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

  const onButtonClick = () => {
      if (initialLoan > bank.maximumLoan) {
        alert(`Loan ammount can't be more than ${bank.maximumLoan}USD`)
        return
      }
      if (downPayment > bank.minimumDownPayment) {
        alert(`Down payment can't be less than ${bank.minimumDownPayment}% of the loan`)
        return
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
    <div>
      <h1>Mortgage calculator</h1>
      <div>
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
        <div>
          <Button
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Choose a bank
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {banks.length === 0 ? (
              <MenuItem>
                <Link to="/">
                  There is no banks in the list. Press here to add.
                </Link>
              </MenuItem>
            ) : (
              banks.map(bank => (
                <MenuItem key={bank.id} onClick={() => onOptionClick(bank.id)}>
                  {bank.name}
                </MenuItem>
              ))
            )}
          </Menu>
        </div>
        <div>
          {Object.keys(bank).length !== 0 && (
            <BankCard
              bank={bank}/>
          )}
        </div>
        <Button
          variant="contained"
          size="normal"
          type="button"
          color="primary"
          onClick={onButtonClick}
        >
          Calculate
        </Button>
        {calculate && (
          <>
            <h2>monthly mortgage payment</h2>
            <p>{calculatePayment()}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default CalculatorView;
