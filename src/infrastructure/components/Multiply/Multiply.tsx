import React, { FC, useEffect, useState } from 'react';
import { randomPosition } from '../../utils/randomPosition/randomPositionMethod';
import { PiecesNumbers } from '../PiecesNumbers/PiecesNumbers';

import './Multiply.css';
import { PiecesResults } from '../PiecesResults/PiecesResults';

interface PropsMultiply {
  numberToMultiply: number;
}

export const Multiply: FC<PropsMultiply> = ({ numberToMultiply }) => {
  const [checkOperation, setCheckOperation] = useState<boolean>(false);
  const [colorCheck, setColorCheck] = useState<string>('#e11a08');
  const [positionNumber, setPositionNumber] = useState<number[]>([]);
  const [positionResults, setPositionResults] = useState<number[]>([]);
  const [randomTablePosition, setRandomTablePosition] = useState<boolean>(true);

  useEffect(() => {
    !checkOperation ? setColorCheck('#e11a08') : setColorCheck('#33e014');
  }, [checkOperation]);

  const getOrder = () => (firstPosition: number, otherPosition: number) => {
    return firstPosition - otherPosition;
  };

  useEffect(() => {
    if (randomTablePosition) {
      setPositionNumber(randomPosition(1, 11));
      setPositionResults(randomPosition(1, 11));
    }
    if (!randomTablePosition) {
      setPositionNumber(randomPosition(1, 11).sort(getOrder()));
      setPositionResults(randomPosition(1, 11).sort(getOrder()));
    }
  }, [randomTablePosition]);
  /*TODO:realizar drag a drop*/
  const handledSelection = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    console.log(e.currentTarget.id);
  };

  return (
    <>
      <header className={'header-multiply'}>
        <section className={'multiply'}><h1 className={'tittles'}>Tabla de Multiplicar</h1>
        <article className={'multiply-pieces'}>
          {positionNumber.map(value => (
            <PiecesNumbers
              key={value}
              numberToMultiply={numberToMultiply}
              value={value}
              onClickSelection={handledSelection}
              isDraggable={true}
            />
          ))}
        </article>
        </section>
        <section className={'results'}><h1 className={'tittles'}>Resultados de la Multiplicación</h1>
        <article className={'results-pieces'}>
          {positionResults.map(value => (
            <PiecesResults
              key={value}
              numberToMultiply={numberToMultiply}
              value={value}
              onClickSelection={handledSelection}
              isDraggable={true}
            />
          ))}
        </article>
        </section>
      </header>
    </>
  );
};
