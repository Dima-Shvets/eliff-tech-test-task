import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AppBar from './components/AppBar';

import NotFoundView from './view/NotFoundView';
import BanksView from './view/BanksView/BanksView';
import CalculatorView from './view/CalculatorView/CalculatorView';
import Container from './components/Container';

import { v4  } from 'uuid';


function App() {
  const [banks, setBanks] = useState([{
    name: "dimas",
    interestRate: "10",
    maximumLoan: "20000",
    minimumDownPayment: "10",
    loanTerm: "20",
    id: "aefdf1c8-6256-45e3-9e31-2c2b7238b709"
  },
    {
    name: "dima",
    interestRate: "10",
    maximumLoan: "20",
    minimumDownPayment: "40005",
    loanTerm: "20",
    id: "aefdf1c8-6256-45e3-9e31-2c2b7238b708"
  }
  ]);
  
  useEffect(() => {
    
    const banksFromStorage = localStorage.getItem('banks');
    const parsedBanks = JSON.parse(banksFromStorage);
    // console.log('first render banks', parsedBanks)
    if (parsedBanks) {
      setBanks(parsedBanks)
    }
  }, [])

  useEffect(() => {
    // console.log('every render banks', banks)
    localStorage.setItem('banks', JSON.stringify(banks))
  }, [banks])  

  const addBank = (newBank) => {
    const check = banks.find(bank => bank.name === newBank.name);

    if (check) {
      alert(`${newBank.name} is already in the banks list`);
      return;
    }

    newBank = {...newBank, id: v4()};

    setBanks(prevState => ([ newBank, ...prevState ]));
  }

  const deleteBank = (id) => {
    const updatedContacts = banks.filter(bank => bank.id !== id);

    setBanks(updatedContacts);
  }

  const editBank = (editedBank) => {
    const check = banks.find(bank => bank.name === editedBank.name);
    if (check) {
      alert(`${editedBank.name} is already in the banks list`);
      return;
    }
    setBanks(prevState => ([...prevState.filter(bank=> bank.id !== editedBank.id), editedBank]))
  }


  return (
      <Container>
      <AppBar />
      <Switch>
          <Route path="/" exact>
          <BanksView
            banks={banks}
            addBank={addBank}
            deleteBank={deleteBank}
            editBank={editBank}/>
          </Route>
          <Route path="/calculator" exact>
          <CalculatorView banks={banks}/>
          </Route>
          <Route>
            <NotFoundView />
          </Route>
      </Switch>
      </Container>
  );
}

export default App;
