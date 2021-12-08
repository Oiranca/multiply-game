import React, { FC, useEffect, useState } from 'react';

import './PiecesResults.css';

interface PropsResult {
  numberToMultiply: number;
  value: number;
  onClickSelection: (e: React.MouseEvent) => void;
  isDraggable:boolean

}

export const PiecesResults: FC<PropsResult> = ({
  numberToMultiply,
  value,
  onClickSelection,isDraggable
}) => {
  const [checkResult, setCheckResult] = useState<boolean>(false);
  const [colorCheck, setColorCheck] = useState<string>('#e11a08');
  useEffect(() => {
    !checkResult ? setColorCheck('#e11a08') : setColorCheck('#33e014');
  }, [checkResult]);

  const calculateResults = (numberToMultiply: number, values: number) => {
    return values * numberToMultiply;
  };

  return (
    <article className={'pieces-result'} id={`result-index-${value}`} onClick={onClickSelection} draggable={isDraggable}>
      <section className={'result'}>
        = {calculateResults(numberToMultiply, value)}
      </section>
      <section className={'result-check'} style={{ background: colorCheck }} />
    </article>
  );
};
