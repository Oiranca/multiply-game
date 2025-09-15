import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from './infrastructure/views/Container/Container';
import { MultiplyIndex } from './infrastructure/components/Multiply/MultiplyIndex';
import { Home } from './infrastructure/components/Home/Home';

import './App.css';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Container />}>
          <Route index element={<Home />} />
          <Route path={'multiply'} element={<MultiplyIndex />} />
          <Route path={'multiply/:numberMultiply'} element={<MultiplyIndex />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
