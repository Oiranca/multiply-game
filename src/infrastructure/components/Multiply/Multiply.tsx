import React, { FC, useEffect, useState } from 'react';
import { randomPosition } from '../../utils/randomPosition/randomPositionMethod';
import { getOrder } from '../../utils/OrderPosition/OrderPosition';

import { PiecesNumbers } from '../PiecesNumbers/PiecesNumbers';
import { PiecesResults } from '../PiecesResults/PiecesResults';

import './Multiply.css';

interface PropsMultiply {
  numberToMultiply: number;
}

const position = randomPosition(1, 11).sort(getOrder());
const positionResults = randomPosition(1, 11);

export const Multiply: FC<PropsMultiply> = ({ numberToMultiply }) => {
  const [resultsCorrect, setResultsCorrect] = useState<Record<number, boolean>>({});

  useEffect(() => {
    positionResults.map((valueKey: number) =>
      setResultsCorrect(resultsCorrect => ({ ...resultsCorrect, [valueKey]: false }))
    );
  }, []);

  const indexNumber = (e: React.DragEvent) => {
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

  const onDragStartEvent = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', `${indexNumber(e)}`);
  };

  const onDragOverEvent = (e: React.DragEvent) => {
    e.preventDefault();
  };
  // Todo buscar y comnprobar el resultado para cambiar le check
  const onDropEvent = (e: React.DragEvent) => {
    e.preventDefault();
    const dataDragEvent = e.dataTransfer.getData('text');
    const dataDropEvent = indexNumber(e);
    if (dataDragEvent === dataDropEvent) {
      setResultsCorrect({ ...resultsCorrect, [dataDropEvent]: true });
    }
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
              {position.map(value => (
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
              {Object.entries(resultsCorrect).map(value =>
                !value[1] ? (
                  <li
                    key={Number(value[0])}
                    id={`number-index-${value[0]}`}
                    className={`drop-zone-result`}
                    onDragOver={onDragOverEvent}
                    onDrop={onDropEvent}
                  />
                ) : (
                  <li
                    key={Number(value[0])}
                    id={`number-index-${value[0]}`}
                    className={`item-result`}
                  >
                    <PiecesResults
                      key={Number(value[0])}
                      numberToMultiply={numberToMultiply}
                      value={Number(value[0])}
                    />
                  </li>
                )
              )}
            </ul>
          </section>
        </section>
      </div>
    </>
  );
};
