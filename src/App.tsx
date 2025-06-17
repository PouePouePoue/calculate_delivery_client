import React from 'react';
import Header from './components/header/Header';
import './App.css';
import Body from './components/body/Body';

function App() {
  return (
    
    <div className="App">
      <div className='mainHeader'><Header /></div>
      <div className='mainBody'><Body /></div>
    </div>
  );
}

export default App;
