import React, { FC, useEffect, useState } from 'react';
import { randomPosition } from '../../utils/randomPosition/randomPositionMethod';
import { PiecesNumbers } from '../PiecesNumbers/PiecesNumbers';
import { PiecesResults } from '../PiecesResults/PiecesResults';

import './Multiply.css';

interface PropsMultiply {
  numberToMultiply: number;
}

export const Multiply: FC<PropsMultiply> = ({ numberToMultiply }) => {
  const [checkOperation, setCheckOperation] = useState<boolean>(false);
  const [colorCheck, setColorCheck] = useState<string>('#e11a08');
  const [positionNumber, setPositionNumber] = useState<number[]>([]);
  const [positionResults, setPositionResults] = useState<number[]>([]);
  const [randomTablePosition, setRandomTablePosition] = useState<boolean>(false);

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
      <div className={'container-multiply'}>
        <section className={'container-body'}>
          <section className={'container-result'}>
            <h1 id={'title-multiply'}> Tabla del {numberToMultiply}</h1>

            <section className={'results'}>
              <h1 id={'title-result'}>Lista de resultados</h1>
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
          </section>
          <section className={'drag-and-drop-zone'}>
            <ul className={'list-multiply'}>
              {positionNumber.map(value => (
                <li key={value} className={'item-multiply'}>
                  <PiecesNumbers
                    key={value}
                    numberToMultiply={numberToMultiply}
                    value={value}
                    onClickSelection={handledSelection}
                    isDraggable={true}
                  />
                </li>
              ))}
            </ul>

            <ul className={'list-results'}>
              {positionNumber.map(value => (
                <li key={value} className={'item-result'} />
              ))}
            </ul>
          </section>
        </section>
      </div>
    </>
  );
};
