import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Container } from './infrastructure/views/Container/Container';
import { Home } from './infrastructure/components/Home/Home';
import { SelectMultiply } from './infrastructure/components/SelectMultiply/SelectMultiply';
import { Multiply } from './infrastructure/components/Multiply/Multiply';
import { EnterName } from './infrastructure/components/EnterName/EnterName';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Container />}>
          <Route index element={<Home />} />
          <Route path={'logIn'} element={<EnterName />} />
          <Route path={'selectMultiply'} element={<SelectMultiply />} />
          <Route path={'multiply'} element={<Multiply />} />
          <Route path={'multiply/:numberMultiply'} element={<Multiply />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
