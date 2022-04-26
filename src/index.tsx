import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Container } from './infrastructure/views/Container/Container';
import { Home } from './infrastructure/components/Home/Home';
import { LogIn } from './infrastructure/components/LogIn/LogIn';
import { SelectMultiply } from './infrastructure/components/SelectMultiply/SelectMultiply';
import { Multiply } from './infrastructure/components/Multiply/Multiply';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/multiply'} element={<Container />}>
          <Route index element={<Home />} />
          <Route path={'logIn'} element={<LogIn />} />
          <Route path={'selectMultiply'} element={<SelectMultiply />} />
          <Route path={'multiplyGame'} element={<Multiply />} />
          <Route path={'multiplyGame/:numberMultiply'} element={<Multiply />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
