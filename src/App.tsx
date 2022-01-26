import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Container } from './infrastructure/views/Container/Container';
import { Home } from './infrastructure/components/Home/Home';
import { SignIn } from './infrastructure/components/SignIn/SignIn';
import { LogIn } from './infrastructure/components/LogIn/LogIn';
import { SelectMultiply } from './infrastructure/components/SelectMultiply/SelectMultiply';
import { Multiply } from './infrastructure/components/Multiply/Multiply';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Container />}>
          <Route index element={<Home />} />
          <Route path={'signIn'} element={<SignIn />} />
          <Route path={'logIn'} element={<LogIn />} />
          <Route path={'selectMultiply'} element={<SelectMultiply />} />
          <Route
            path={'multiply:numberMultiply'}
            element={<Multiply numberToMultiply={Number(':numberMultiply')} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
