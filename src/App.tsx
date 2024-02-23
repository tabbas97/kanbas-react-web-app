import React from 'react';
import logo from './logo.svg';
import './App.css';
import Labs from './Labs';
import { Routes } from "react-router-dom";
import { Route, HashRouter, Navigate } from 'react-router-dom';
import Kanbas from './Kanbas';
import HelloWorld from './Labs/a3/HelloWorld';

function App() {
  return (

    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Labs" />} />
          <Route path="/hello" element={<HelloWorld/>} />
          <Route path="/Labs/*" element={<Labs/>} />
          <Route path="/Kanbas/*" element={<Kanbas/>} />
        </Routes>
      </div>
    </HashRouter>

    // <div>
    //   <Labs />
    //   <h1>Hello World!</h1>
    // </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
