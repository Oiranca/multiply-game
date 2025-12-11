import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { randomPosition } from '../../../method/RandomPosition/RandomPositionMethod';
import { getOrder } from '../../../method/OrderPosition/OrderPosition';
import { PiecesNumbers } from '../../PiecesNumbers/PiecesNumbers';
import { PiecesResults } from '../../PiecesResults/PiecesResults';
import { updateMultiplicationTable } from '../../../../services/localStorage.service';

import { useOperationMultiply } from '../../../method/useOperationMultiply/useOperationMultiply';

export const MultiplyWeb: FC = () => {
  const { numberMultiply } = useParams();
  const { indexNumber, deleteResultCorrect } = useOperationMultiply;

  const [resultsCorrect, setResultsCorrect] = useState<Record<number, boolean>>({});
  const [multiplyNumbers, setMultiplyNumbers] = useState<Record<number, boolean>>({});
  const [position] = useState<number[]>(randomPosition(1, 11).sort(getOrder()));
  const [positionResults, setPositionResults] = useState<number[]>(randomPosition(1, 11));
  const [draggedValue, setDraggedValue] = useState<string | null>(null);

  useEffect(() => {
    positionResults.map((valueKey: number) =>
      setResultsCorrect((resultsCorrect: Record<number, boolean>) => ({
        ...resultsCorrect,
        [valueKey]: false
      }))
    );

    position.map((valueKey: number) =>
      setMultiplyNumbers((multiplyNumbers: Record<number, boolean>) => ({
        ...multiplyNumbers,
        [valueKey]: false
      }))
    );
  }, [position, positionResults]);

  const onDragStartEvent = (e: React.DragEvent) => {
    const idString = e.currentTarget.id;
    e.dataTransfer.setData('text/plain', `${indexNumber(idString)}`);
  };

  const onTouchStartEvent = (e: React.TouchEvent) => {
    const idString = e.currentTarget.id;
    setDraggedValue(indexNumber(idString));
  };

  const onDragOverEvent = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDropEvent = (e: React.DragEvent) => {
    e.preventDefault();
    const idString = e.currentTarget.id;

    const dataDragEvent = e.dataTransfer.getData('text');
    const dataDropEvent = indexNumber(idString);
    if (dataDragEvent === dataDropEvent) {
      setResultsCorrect({ ...resultsCorrect, [dataDropEvent]: true });
      setMultiplyNumbers({ ...multiplyNumbers, [dataDropEvent]: true });
      setPositionResults(deleteResultCorrect(dataDropEvent, positionResults));
    }
  };

  const onTouchEndEvent = (e: React.TouchEvent) => {
    if (!draggedValue) return;

    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (element) {
      const dropZone = element.closest('[data-drop-zone]');
      if (dropZone) {
        const idString = dropZone.id;
        const dataDropEvent = indexNumber(idString);
        
        if (draggedValue === dataDropEvent) {
          setResultsCorrect({ ...resultsCorrect, [dataDropEvent]: true });
          setMultiplyNumbers({ ...multiplyNumbers, [dataDropEvent]: true });
          setPositionResults(deleteResultCorrect(dataDropEvent, positionResults));
        }
      }
    }
    
    setDraggedValue(null);
  };

  // Track completion and save to localStorage
  useEffect(() => {
    if (positionResults.length === 0 && numberMultiply) {
      updateMultiplicationTable(Number(numberMultiply));
    }
  }, [positionResults, numberMultiply]);

  return (
    <div className="flex flex-row-reverse justify-evenly items-center border-2 border-main rounded-2xl shadow-main">
      <article className="flex flex-row flex-wrap justify-center items-center max-w-[50%] min-w-[30%]">
        <h1 className="text-2xl text-center text-main bg-second max-w-[70%] min-w-[50%] p-8 border-2 border-main rounded-b-2xl">
          Tabla del {numberMultiply}
        </h1>
        <section className="flex flex-col justify-around items-center bg-second m-4 p-4 border-2 border-main rounded-2xl">
          <h1 className="text-base text-center text-main bg-second w-[calc(80%-10%)] p-8 m-8 border-2 border-main rounded-[5rem]">
            Lista de resultados
          </h1>
          <section className="grid grid-cols-3 grid-rows-[repeat(auto-fit,1fr)] m-4">
            {positionResults.map(value => (
              <PiecesResults
                key={value}
                numberToMultiply={Number(numberMultiply)}
                value={value}
                onDragStart={onDragStartEvent}
                onTouchStart={onTouchStartEvent}
                isDraggable={true}
              />
            ))}
          </section>
        </section>
      </article>
      <article className="flex flex-row m-8 p-4 border-2 border-main bg-second rounded-2xl">
        <ul className="flex flex-col justify-center list-none">
          {Object.entries(multiplyNumbers).map(value =>
            !value[1] ? (
              <li key={Number(value[0])} className="border border-gray-400 rounded-lg m-2">
                <PiecesNumbers
                  key={Number(value[0])}
                  numberToMultiply={Number(numberMultiply)}
                  value={Number(value[0])}
                  checkOperation={false}
                />
              </li>
            ) : (
              <li key={Number(value[0])} className="border border-gray-400 rounded-lg m-2">
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

        <ul className="flex flex-col justify-between list-none">
          {Object.entries(resultsCorrect).map(value =>
            !value[1] ? (
              <li
                key={Number(value[0])}
                id={`number-index-${value[0]}`}
                className="border border-gray-400 rounded-lg w-22 h-10 m-2"
                data-drop-zone
                onDragOver={onDragOverEvent}
                onDrop={onDropEvent}
                onTouchEnd={onTouchEndEvent}
              />
            ) : (
              <li
                key={Number(value[0])}
                id={`number-index-${value[0]}`}
                className="border border-gray-400 rounded-lg m-2"
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
  );
};
