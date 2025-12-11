import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { randomPosition } from '../../../method/RandomPosition/RandomPositionMethod';
import { getOrder } from '../../../method/OrderPosition/OrderPosition';
import { PiecesResults } from '../../PiecesResults/PiecesResults';
import { PiecesNumbers } from '../../PiecesNumbers/PiecesNumbers';
import { updateMultiplicationTable } from '../../../../services/localStorage.service';

import { useOperationMultiply } from '../../../method/useOperationMultiply/useOperationMultiply';

export const MultiplyMobile: FC = () => {
  const { numberMultiply } = useParams();
  const { indexNumber, deleteResultCorrect } = useOperationMultiply;
  const [resultsCorrect, setResultsCorrect] = useState<Record<number, boolean>>({});
  const [multiplyNumbers, setMultiplyNumbers] = useState<Record<number, boolean>>({});
  const [position] = useState<number[]>(randomPosition(1, 11).sort(getOrder()));
  const [positionResults, setPositionResults] = useState<number[]>(randomPosition(1, 11));
  const [selectItemMultiply, setSelectItemMultiply] = useState<Record<string, string>>({
    tableItem: '',
    resultItem: ''
  });

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
  const operation = (itemResult: string, itemTable: string) => {
    if (itemResult === itemTable || itemTable === itemResult) {
      setResultsCorrect({ ...resultsCorrect, [itemResult]: true });
      setMultiplyNumbers({ ...multiplyNumbers, [itemResult]: true });
      setPositionResults(deleteResultCorrect(itemTable, positionResults));
      setSelectItemMultiply({
        resultItem: '',
        tableItem: ''
      });
    }
  };
  const handleSelectResult = (event: React.MouseEvent) => {
    const idString = event.currentTarget.id;
    const index = indexNumber(idString);
    setSelectItemMultiply({
      ...selectItemMultiply,
      resultItem: index
    });
    if (selectItemMultiply.tableItem !== '') {
      operation(index, selectItemMultiply.tableItem);
    }
  };

  const handleMultiplyTable = (event: React.MouseEvent) => {
    const idString = event.currentTarget.id;
    const index = indexNumber(idString);
    setSelectItemMultiply({
      ...selectItemMultiply,
      tableItem: index
    });
    if (selectItemMultiply.resultItem !== '') {
      operation(selectItemMultiply.resultItem, index);
    }
  };

  // Track completion and save to localStorage
  useEffect(() => {
    if (positionResults.length === 0 && numberMultiply) {
      updateMultiplicationTable(Number(numberMultiply));
    }
  }, [positionResults, numberMultiply]);

  return (
    <div className="flex flex-col flex-wrap justify-center content-center">
      <header className="flex flex-col items-center">
        <h1 className="text-base text-center text-main bg-second max-w-[70%] min-w-[50%] p-2 border-2 border-main rounded-b-2xl">
          Tabla del {numberMultiply}
        </h1>
        <h4 className="text-center m-0 text-xs font-variant-all-petite-caps">
          Selecciona un resultado y luego la multiplicación que creas correcta
        </h4>
      </header>
      <section className="flex flex-row-reverse flex-nowrap justify-between gap-4 my-4">
        <article className="flex flex-row flex-wrap justify-center items-center max-w-[50%] min-w-[30%]">
          <section className="flex flex-col justify-around items-center bg-second border-2 border-main rounded-2xl">
            <h1 className="text-base text-center text-main bg-second p-2 m-2 border-2 border-main rounded-[5rem]">
              Resultados
            </h1>
            <section className="grid grid-cols-1 m-1">
              {positionResults.map(value => (
                <PiecesResults
                  key={value}
                  numberToMultiply={Number(numberMultiply)}
                  value={value}
                  onClickResult={handleSelectResult}
                />
              ))}
            </section>
          </section>
        </article>
        <article className="flex flex-col items-center bg-second border-2 border-main rounded-2xl">
          <h1 className="text-base text-center text-main bg-second p-2 m-2 border-2 border-main rounded-[5rem]">
            Tabla
          </h1>
          <section className="grid grid-cols-2 m-1">
            <div className="grid grid-cols-1 m-1">
              {Object.entries(multiplyNumbers).map(value =>
                !value[1] ? (
                  <div key={Number(value[0])} className="m-1">
                    <PiecesNumbers
                      key={Number(value[0])}
                      numberToMultiply={Number(numberMultiply)}
                      value={Number(value[0])}
                      checkOperation={false}
                      onClickTable={handleMultiplyTable}
                    />
                  </div>
                ) : (
                  <div key={Number(value[0])}>
                    <PiecesNumbers
                      key={Number(value[0])}
                      numberToMultiply={Number(numberMultiply)}
                      value={Number(value[0])}
                      checkOperation={true}
                    />
                  </div>
                )
              )}
            </div>

            <div className="grid grid-cols-1 m-1">
              {Object.entries(resultsCorrect).map(value =>
                !value[1] ? (
                  <PiecesResults
                    key={Number(value[0])}
                    numberToMultiply={Number(numberMultiply)}
                    checkResult={false}
                  />
                ) : (
                  <PiecesResults
                    key={Number(value[0])}
                    numberToMultiply={Number(numberMultiply)}
                    value={Number(value[0])}
                    checkResult={true}
                  />
                )
              )}
            </div>
          </section>
        </article>
      </section>
    </div>
  );
};
