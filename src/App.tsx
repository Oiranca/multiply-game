import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Container } from './infrastructure/views/Container/Container';
import { Home } from './infrastructure/components/Home/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Container />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
