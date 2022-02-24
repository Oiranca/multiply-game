import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import './EnterName.css';
import Logo from '../../../assets/img/logo.png';

export const EnterName: FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/selectMultiply');
  };
  return (
    <section className={'container-enter-name'}>
      <header id={'header-enter-name'}>
        <h1 id={'title-enter-name'}>Nombre de usuario</h1>
      </header>
      <section className={'body-enter-name'}>
        <section id={'image-logo'}>
          <img id={'logo'} src={Logo} alt={'Logo'} />
        </section>
          <form className={'form-enter-name'}onSubmit={handleNavigation}>
            <section className={'section-enter-name'}>
              <input type={'text'} className={'enter-name-input'} />
            </section>
            <section className={'section-enter-name'}>
              <button type={'submit'} id={'button-enter'}>
                Aceptar
              </button>
            </section>
          </form>
      </section>
    </section>
  );
};
