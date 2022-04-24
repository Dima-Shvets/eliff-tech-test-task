import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4  } from 'uuid';

import AppBar from './components/AppBar';

import NotFoundView from './view/NotFoundView';
import BanksView from './view/BanksView/BanksView';
import CalculatorView from './view/CalculatorView/CalculatorView';
import Container from './components/Container';

import { fetchAllBanks } from './services/banks-api-service';

function App() {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    fetchAllBanks().then((data) => setBanks(data));
  }, [])  

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
