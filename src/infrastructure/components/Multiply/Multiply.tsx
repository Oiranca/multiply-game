import React, { DragEventHandler, FC, useEffect, useState } from 'react';
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
  const [dragItems, setDragItems] = useState<Element[]>([]);

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

  const indexNumber = (e: React.DragEvent) => {
    const item = e.currentTarget.id;

    let index: number;

    return item
      .split('-')
      .map(a => {
        if (!isNaN(Number(a))) {
          index = Number(a);
        }
        return index;
      })
      .find(indexValue => indexValue !== undefined);
  };

  /*TODO:realizar drag a drop*/
  const onDragStartEvent = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', '');
    console.log(indexNumber(e));
    return indexNumber(e);
  };

  const onDragOverEvent = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const onDropEvent = (e: React.DragEvent) => {
    e.preventDefault();
    return indexNumber(e);
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
                    onDragStart={onDragStartEvent}
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
                  />
                </li>
              ))}
            </ul>

            <ul className={'list-results'}>
              {positionNumber.map(value => (
                <li
                  key={value}
                  id={`number-index-${value}`}
                  className={'drop-zone-result'}
                  onDragOver={onDragOverEvent}
                  onDrop={onDropEvent}
                />
              ))}
            </ul>
          </section>
        </section>
      </div>
    </>
  );
};
