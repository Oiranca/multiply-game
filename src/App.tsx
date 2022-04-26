import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Container } from './infrastructure/views/Container/Container';
import { Home } from './infrastructure/components/Home/Home';
import { LogIn } from './infrastructure/components/LogIn/LogIn';
import { SelectMultiply } from './infrastructure/components/SelectMultiply/SelectMultiply';
import { Multiply } from './infrastructure/components/Multiply/Multiply';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/multiply-game'} element={<Container />}>
          <Route index element={<Home />} />
          <Route path={'logIn'} element={<LogIn />} />
          <Route path={'selectMultiply'} element={<SelectMultiply />} />
          <Route path={'multiply'} element={<Multiply />} />
          <Route path={'multiply/:numberMultiply'} element={<Multiply />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
