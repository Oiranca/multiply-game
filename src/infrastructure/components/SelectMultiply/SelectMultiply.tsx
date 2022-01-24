import React, { FC, useEffect, useState } from 'react';

import '../SelectMultiply/SelectMultiply.css';

export const SelectMultiply: FC = () => {
  const [elementToSelect, setElementToSelect] = useState({});

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

    let index: string;

    return item
      .split('-')
      .map(arrayItems => {
        if (!isNaN(Number(arrayItems))) {
          index = arrayItems;
        }
        return index;
      })
      .find(indexValue => indexValue !== undefined);
  };
  const onSelectMultiply = (e: React.MouseEvent<HTMLElement>) => {
    const valueMultiply = indexNumber(e);

  };
  return (
    <>
      <section className={'select-multiply'}>
        <header id={'header-tittle'}>
          <h2>Seleciona una tabla de multiplicar</h2>
        </header>

        <section className={'container-select-multiply'}>
          {Object.entries(elementToSelect).map(value => (
            <section
              key={Number([value[0]])}
              id={`multiply-index-${value[0]}`}
              className={'multiply'}
              onClick={onSelectMultiply}
            >
              <p id={'header-multiply'}>{[value[1]]}</p>
              <section>
                <p id={'value-multiply'}>{[value[0]]}</p>
              </section>
            </section>
          ))}
        </section>
      </section>
    </>
  );
};
