import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AppHeader from './components/AppBar';

import NotFoundView from './view/NotFoundView';
import BanksView from './view/BanksView/BanksView';
import CalculatorView from './view/CalculatorView/CalculatorView';

import { v4  } from 'uuid';


function App() {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    // console.log('first render')
    const banks = localStorage.getItem('banks');
    const parsedBanks = JSON.parse(banks);
    console.log('first render banks', parsedBanks)
    if (parsedBanks) {
      setBanks(parsedBanks)
    }
  }, [])

  useEffect(() => {
    // console.log('UseEffect')
    console.log('every render banks', banks)
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
    <div className="App">
      <AppHeader />
      <Switch>
          <Route path="/" exact>
          <BanksView
            banks={banks}
            addBank={addBank}
            deleteBank={deleteBank}
            editBank={editBank}/>
          </Route>
          <Route path="/calculator" exact>
            <CalculatorView />
          </Route>
          <Route>
            <NotFoundView />
          </Route>
      </Switch>
      
    </div>
  );
}

export default App;
