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
        <header className={'header-multiply'}>
          <section className={'results'}>
            <h1 className={'tittles'}>Resultados de la Multiplicación</h1>
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
        <section className={'drag-and-drop-zone'}>
          <h1 className={'tittles'}>Tabla del {numberToMultiply}</h1>
          <section className={'container-drag-and-drop'}>
            <table className={'tablet-zone'}>
              <tbody>
                <tr>
                  {positionNumber.map(value => (
                    <td className={'cell-multiply'}>
                      <PiecesNumbers
                        key={value}
                        numberToMultiply={numberToMultiply}
                        value={value}
                        onClickSelection={handledSelection}
                        isDraggable={true}
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  {positionNumber.map(value => (
                    <td className={'cell-results'} key={value}/>
                  ))}
                </tr>
              </tbody>
            </table>
          </section>
        </section>
      </div>
    </>
  );
};
