import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { randomPosition } from '../../../method/RandomPosition/RandomPositionMethod';
import { getOrder } from '../../../method/OrderPosition/OrderPosition';
import { PiecesResults } from '../../PiecesResults/PiecesResults';
import { PiecesNumbers } from '../../PiecesNumbers/PiecesNumbers';

import './MultiplyMobile.css';

export const MultiplyMobile: FC = () => {
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
  }, [position, positionResults]);

  const handleSelectResult = (event: React.MouseEvent) => {
    console.log(event.target);
  };

  return (
    <div className={'container-mobile'}>
      <header className={'header-mobile'}>
        <h1 id={'title'}> Tabla del {numberMultiply}</h1>
        <h4 id={'information'}>
          Selecciona un resultado y luego la multiplicación que creas correcta
        </h4>
      </header>
      <section className={'body-mobile-container'}>
        <article className={'result'}>
          <section className={'content'}>
            <h1 className={'title-pieces'}>Resultados</h1>
            <section className={'piece'}>
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
        <article className={'content-table'}>
          <h1 className={'title-pieces'}>Tabla</h1>
          <section className={'table-piece'}>
            <div>
              {Object.entries(multiplyNumbers).map(value =>
                !value[1] ? (
                  <div key={Number(value[0])} className={'pieces'}>
                    <PiecesNumbers
                      key={Number(value[0])}
                      numberToMultiply={Number(numberMultiply)}
                      value={Number(value[0])}
                      checkOperation={false}
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

            <div>
              {Object.entries(resultsCorrect).map(value =>
                !value[1] ? (
                  <div
                    key={Number(value[0])}
                    id={`number-index-${value[0]}`}
                    className={`item-result`}
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
