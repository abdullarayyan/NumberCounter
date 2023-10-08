import React from 'react';
import logo from './logo.svg';
import './App.css';
import NumberCounter from './NumberCounter';


function App() {
  return (
    <div className="App">
           <NumberCounter start={0} end={100} duration={5} />

    </div>
  );
}

export default App;
