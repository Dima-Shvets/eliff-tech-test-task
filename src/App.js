import './App.css';
import { Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AppBar from './components/AppBar';

import NotFoundView from './view/NotFoundView';
import BanksView from './view/BanksView/BanksView';
import CalculatorView from './view/CalculatorView/CalculatorView';
import Container from './components/Container';

import { fetchAllBanks, editBankById, deleteBankById, addNewBank } from './services/banks-api-service';

function App() {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    fetchAllBanks().then((data) => setBanks(data));
  }, [])  

  const addBank = async (newBank) => {

    const bank = await addNewBank(newBank)
    setBanks(prevState => ([...prevState, bank]));
  }

  const deleteBank = (id) => {
    const updatedContacts = banks.filter(bank => bank._id !== id);

    setBanks(updatedContacts);
    deleteBankById(id)
  }

  const editBank = async (editedBank) => {
    const updatedBank = await editBankById(editedBank);
    setBanks(prevState => ([updatedBank, ...prevState.filter(bank => bank._id !== updatedBank._id), ]))
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
