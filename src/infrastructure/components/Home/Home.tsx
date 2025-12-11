import React, { FC, useEffect, useState } from 'react';
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

  const indexNumber = (e: React.MouseEvent) => {
    const item = e.currentTarget.id;

    return item
      .split('-')
      .filter(item => !isNaN(Number(item)))
      .toString();
  };

  const onSelectMultiply = (event: React.MouseEvent) => {
    const numberMultiply = indexNumber(event);
    navigate(`/multiply/${numberMultiply}`);
  };

  return (
    <main className="flex flex-col items-center w-full max-w-[90%] md:max-w-[80%] lg:max-w-[60%] bg-second border-2 border-main shadow-main m-4 text-center">
      <header className="text-main text-2xl md:text-3xl font-bold py-4">
        <h1>Selecciona una Tabla</h1>
      </header>

      <section className="flex flex-col items-center w-[90%] my-4">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-6 my-4 md:my-8 mx-2 md:mx-4">
          {Object.entries(elementToSelect).map(value => (
            <article
              key={Number([value[0]])}
              id={`multiply-index-${value[0]}`}
              className="flex flex-col justify-between items-center p-2 md:p-4 m-1 md:m-2 bg-main text-second border-2 border-second rounded-tl-2xl rounded-tr-2xl shadow-main cursor-pointer hover:bg-second hover:border-4 hover:border-dashed hover:border-main hover:text-main hover:rounded-none hover:rounded-bl-2xl hover:rounded-br-2xl hover:shadow-second transition-all duration-200"
              onClick={onSelectMultiply}
            >
              <p className="text-base md:text-xl font-bold my-1 md:my-2">
                {[value[1] as string]}
              </p>
              <p className="text-base md:text-xl font-bold my-1 md:my-2">{[value[0]]}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="my-4 md:my-8">
        <img id="home-logo" src={Logo} alt="Logo" className="w-16 h-16 md:w-24 md:h-20" />
      </footer>
    </main>
  );
};
