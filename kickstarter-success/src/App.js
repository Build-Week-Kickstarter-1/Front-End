import React from 'react';

import './App.css';
import AlertMessage from './components/AlertMessage';
import NavBar from './components/NavBar';
import Routes from './routes/Routes';
 
function App() {

  return (
    <div className="App">
      <NavBar/>
      <AlertMessage/>
      <Routes/>
    </div>
  );
}

export default App;
