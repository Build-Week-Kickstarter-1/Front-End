import React from 'react';
import {useHistory} from 'react-router-dom';
// import { use } from "redux";

import './App.css';
import './components/Login';
import './routes/Routes'
import Routes from './routes/Routes';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
 
function App() {
  const username = useSelector(state => state.username)
  const history = useHistory();
  const token = window.localStorage.getItem('token')
  const clickHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className="App">
      {token ? <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} round={true} size='3rem' name={username} onClick={clickHandler}/> : ''}
      

      {/* <button onClick={() => history.push(token ? '/signOut' : '/login')}>{token ? 'Sign Out' : 'Login'}</button> */}
      <Routes/>
    </div>
  );
}

export default App;
