import { FC, useEffect, useState } from 'react';
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
    // Initialize resultsCorrect with all positions (1-10) to match multiplyNumbers
    // This ensures all drop zones are visible, matching the structure in MultiplyMobile
    const initialResultsCorrect: Record<number, boolean> = {};
    position.forEach((valueKey: number) => {
      initialResultsCorrect[valueKey] = false;
    });
    setResultsCorrect(initialResultsCorrect);

    // Initialize multiplyNumbers with all positions
    const initialMultiplyNumbers: Record<number, boolean> = {};
    position.forEach((valueKey: number) => {
      initialMultiplyNumbers[valueKey] = false;
    });
    setMultiplyNumbers(initialMultiplyNumbers);
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
    if (!touch) return;
    
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
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full max-w-[95%] lg:max-w-[90%] xl:max-w-[85%] 2xl:max-w-[80%]">
      {/* Left Section: Multiplication Problems List with Drop Zones */}
      <article className="flex flex-row gap-4 w-full lg:w-auto bg-second border-2 border-main rounded-2xl shadow-main p-4 lg:p-6 items-start">
        {/* Problems List */}
        <ul className="flex flex-col gap-2 lg:gap-3 list-none flex-1 lg:flex-none lg:min-w-[200px]">
          {Object.entries(multiplyNumbers)
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .map(value =>
              !value[1] ? (
                <li key={Number(value[0])} className="flex-shrink-0">
                  <PiecesNumbers
                    numberToMultiply={Number(numberMultiply)}
                    value={Number(value[0])}
                    checkOperation={false}
                  />
                </li>
              ) : (
                <li key={Number(value[0])} className="flex-shrink-0">
                  <PiecesNumbers
                    numberToMultiply={Number(numberMultiply)}
                    value={Number(value[0])}
                    checkOperation={true}
                  />
                </li>
              )
            )}
        </ul>

        {/* Drop Zones - Map from multiplyNumbers to ensure all 10 zones are visible */}
        <ul className="flex flex-col gap-2 lg:gap-3 list-none lg:min-w-[200px] justify-start">
          {Object.entries(multiplyNumbers)
            .sort((a, b) => Number(a[0]) - Number(b[0]))
            .map(value => {
              const numberValue = Number(value[0]);
              const isCorrect = resultsCorrect[numberValue] === true;
              
              // Show drop zone for all multiplyNumbers (1-10), matching the order and height
              return !isCorrect ? (
                <li
                  key={numberValue}
                  id={`number-index-${numberValue}`}
                  className="piece-size border-2 border-dashed border-main rounded-lg flex items-center justify-center bg-main/10 hover:bg-main/20 transition-colors flex-shrink-0 m-1 sm:m-2"
                  data-drop-zone
                  onDragOver={onDragOverEvent}
                  onDrop={onDropEvent}
                  onTouchEnd={onTouchEndEvent}
                  aria-label={`Zona de destino para resultado ${numberValue}`}
                />
              ) : (
                <li key={numberValue} className="flex-shrink-0">
                  <PiecesResults
                    numberToMultiply={Number(numberMultiply)}
                    value={numberValue}
                    checkResult={true}
                  />
                </li>
              );
            })}
        </ul>
      </article>

      {/* Right Section: Game Area */}
      <article className="flex flex-col flex-1 gap-4 lg:gap-6">
        {/* Title */}
        <div className="bg-second border-2 border-main rounded-2xl shadow-main p-4 lg:p-6 text-center">
          <h1 className="text-xl lg:text-2xl xl:text-3xl text-main font-bold">
            Tabla del {numberMultiply}
          </h1>
        </div>

        {/* Results Grid */}
        <section className="flex flex-col bg-second border-2 border-main rounded-2xl shadow-main p-4 lg:p-6">
          <h2 className="text-lg lg:text-xl text-center text-main font-bold mb-4 lg:mb-6 pb-2 border-b-2 border-main">
            Lista de resultados
          </h2>
          <div className="grid grid-cols-3 gap-3 lg:gap-4 xl:gap-5">
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
          </div>
        </section>
      </article>
    </div>
  );
};
