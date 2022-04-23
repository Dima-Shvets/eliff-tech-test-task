import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useState } from 'react';

import AppHeader from './components/AppBar';

import NotFoundView from './view/NotFoundView';
import BanksView from './view/BanksView/BanksView';
import CalculatorView from './view/CalculatorView/CalculatorView';

import { v4  } from 'uuid';


function App() {
  const [banks, setBanks] = useState([]);
  

  const addBank = (newBank) => {
    const check = banks.find(bank => bank.name === newBank.name);

    if (check) {
      alert(`${newBank.name} is already in the banks list`);
      return;
    }

    newBank = { id: v4(), ...newBank };

    setBanks(prevState => ([ newBank, ...prevState ]));
  }

  const deleteBank = (id) => {
    const updatedContacts = banks.filter(bank => bank.id !== id);

    setBanks(updatedContacts);
  }


  return (
    <div className="App">
      <AppHeader />
      <Switch>
          <Route path="/" exact>
          <BanksView
            banks={banks}
            addBank={addBank}
            deleteBank={deleteBank}/>
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
