import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from './infrastructure/views/Container/Container';
import { Multiply } from './infrastructure/components/Multiply/Multiply';
import { Home } from './infrastructure/components/Home/Home';

import './App.css';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/multiply-game'} element={<Container />}>
          <Route index element={<Home />} />
          <Route path={'multiply'} element={<Multiply />} />
          <Route path={'multiply/:numberMultiply'} element={<Multiply />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
