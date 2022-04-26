import React, { FC, useEffect, useState } from 'react';
import './Home.css';
import Logo from '../../../assets/img/logo.png';
import { useNavigate } from 'react-router-dom';

export const Home: FC = () => {
  const [elementToSelect, setElementToSelect] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setElementToSelect(elementToSelect => ({
        ...elementToSelect,
        [i + 1]: `Tabla del`
      }));
    }
  }, []);
  const indexNumber = (e: React.MouseEvent<HTMLElement>) => {
    const item = e.currentTarget.id;

    return item
      .split('-')
      .filter(item => !isNaN(Number(item)))
      .toString();
  };
  const onSelectMultiply = (event: React.MouseEvent<HTMLElement>) => {
    const numberMultiply = indexNumber(event);
    navigate(`/multiply-game/multiply/${numberMultiply}`);
  };
  return (
    <div className={'container-home'}>
      <header className={'header-home'}>
        <h1>Selecciona una Tabla</h1>
      </header>
      <section className={'select-multiply'}>
        <section className={'container-select-multiply'}>
          {Object.entries(elementToSelect).map(value => (
            <section
              key={Number([value[0]])}
              id={`multiply-index-${value[0]}`}
              className={'multiply'}
              onClick={onSelectMultiply}
            >
              <p id={'header-multiply'}>{[value[1]]}</p>
              <p id={'header-multiply'}>{[value[0]]}</p>

            </section>
          ))}
        </section>
      </section>
      <footer className={'footer-home'}>
        <img id={'home-logo'} src={Logo} alt={'Logo'} />
      </footer>
    </div>
  );
};
