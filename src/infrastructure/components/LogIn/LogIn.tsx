import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../../assets/img/logo.png';
import './LogIn.css';

export const LogIn: FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/multiply/selectMultiply');
  };
  return (
    <div className={'container-log-in'}>
      <header id={'header-log-in'}>
        <h1 id={'title-log-in'}>Nombre de usuario</h1>
      </header>
      <article className={'body-log-in'}>
        <section id={'image-logo'}>
          <img id={'logo'} src={Logo} alt={'Logo'} />
        </section>
        <section className={'form-log-in'}>
          <form className={'form-log-in'} onSubmit={handleNavigation}>
            <section className={'section-log-in'}>
              <input type={'text'} className={'log-in-input'} />
            </section>
            <section className={'section-log-in'}>
              <button type={'submit'} id={'button-log-in'}>
                Aceptar
              </button>
            </section>
          </form>
        </section>
      </article>
    </div>
  );
};
