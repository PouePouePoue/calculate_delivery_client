import React from 'react';
import Header from './components/header/Header';
import './App.scss';
import Body from './components/body/Body';
import Footer from './components/footer/Footer';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    
    <div className="App">
      <div className='mainHeader'><Header /></div>
      <div className='mainBody'><Body /></div>
      <div className='mainFooter'><Footer /></div>
    </div>
  );
}

export default App;
