import React, {useState} from 'react';

import './App.css';
import NavBar from './components/NavBar';
import Routes from './routes/Routes';
 
function App() {

  return (
    <div className="App">
      <NavBar/>
      <Routes/>
    </div>
  );
}

export default App;
