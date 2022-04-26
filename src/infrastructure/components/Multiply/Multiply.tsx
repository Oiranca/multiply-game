import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { randomPosition } from '../../utils/RandomPosition/RandomPositionMethod';
import { getOrder } from '../../utils/OrderPosition/OrderPosition';
import { PiecesNumbers } from '../PiecesNumbers/PiecesNumbers';
import { PiecesResults } from '../PiecesResults/PiecesResults';

import './Multiply.css';

export const Multiply: FC = () => {
  const { numberMultiply } = useParams();
  const [resultsCorrect, setResultsCorrect] = useState<Record<number, boolean>>({});
  const [multiplyNumbers, setMultiplyNumbers] = useState<Record<number, boolean>>({});
  const [position] = useState<number[]>(randomPosition(1, 11).sort(getOrder()));
  const [positionResults, setPositionResults] = useState<number[]>(randomPosition(1, 11));

  useEffect(() => {
    positionResults.map((valueKey: number) =>
      setResultsCorrect(resultsCorrect => ({ ...resultsCorrect, [valueKey]: false }))
    );

    position.map((valueKey: number) =>
      setMultiplyNumbers(multiplyNumbers => ({ ...multiplyNumbers, [valueKey]: false }))
    );
  }, []);

  const indexNumber = (e: React.DragEvent) => {
    const item = e.currentTarget.id;

    return item
      .split('-')
      .filter(item => !isNaN(Number(item)))
      .toString();
  };

  const onDragStartEvent = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', `${indexNumber(e)}`);
  };

  const onDragOverEvent = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const deleteResultCorrect = (dataDropEvent: string) => {
    const numberToDelete = Number(dataDropEvent);
    return positionResults.filter(itemToDelete => itemToDelete !== numberToDelete);
  };

  const onDropEvent = (e: React.DragEvent) => {
    e.preventDefault();
    const dataDragEvent = e.dataTransfer.getData('text');
    const dataDropEvent = indexNumber(e);
    if (dataDragEvent === dataDropEvent) {
      setResultsCorrect({ ...resultsCorrect, [dataDropEvent]: true });
      setMultiplyNumbers({ ...multiplyNumbers, [dataDropEvent]: true });
      setPositionResults(deleteResultCorrect(dataDropEvent));
    }
  };

  return (
    <>
      <div className={'container-multiply'}>
          <article className={'container-result'}>
            <h1 id={'title-multiply'}> Tabla del {numberMultiply}</h1>
            <section className={'results'}>
              <h1 id={'title-result'}>Lista de resultados</h1>
              <section className={'results-pieces'}>
                {positionResults.map(value => (
                  <PiecesResults
                    key={value}
                    numberToMultiply={Number(numberMultiply)}
                    value={value}
                    onDragStart={onDragStartEvent}
                    isDraggable={true}
                  />
                ))}
              </section>
            </section>
          </article>
          <article className={'drag-and-drop-zone'}>
            <ul className={'list-multiply'}>
              {Object.entries(multiplyNumbers).map(value =>
                !value[1] ? (
                  <li key={Number(value[0])} className={'item-multiply'}>
                    <PiecesNumbers
                      key={Number(value[0])}
                      numberToMultiply={Number(numberMultiply)}
                      value={Number(value[0])}
                      checkOperation={false}
                    />
                  </li>
                ) : (
                  <li key={Number(value[0])} className={'item-multiply'}>
                    <PiecesNumbers
                      key={Number(value[0])}
                      numberToMultiply={Number(numberMultiply)}
                      value={Number(value[0])}
                      checkOperation={true}
                    />
                  </li>
                )
              )}
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
                      numberToMultiply={Number(numberMultiply)}
                      value={Number(value[0])}
                      checkResult={true}
                    />
                  </li>
                )
              )}
            </ul>
          </article>
      </div>
    </>
  );
};
