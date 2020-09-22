import React from 'react';
import {useHistory} from 'react-router-dom';

import './App.css';
import './components/Login';
import './routes/Routes'
import Routes from './routes/Routes';

function App() {
  const history = useHistory();
  const token = window.localStorage.getItem('token')

  return (
    <div className="App">
      <button onClick={() => history.push(token ? '/signOut' : '/login')}>{token ? 'Sign Out' : 'Login'}</button>
      <Routes/>
    </div>
  );
}

export default App;
