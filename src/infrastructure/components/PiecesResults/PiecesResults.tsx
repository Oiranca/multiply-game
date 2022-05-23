import React, { FC, useEffect, useState } from 'react';

import './PiecesResults.css';

interface PropsResult {
  numberToMultiply: number;
  value: number;
  onDragStart?: (e: React.DragEvent) => void;
  isDraggable?: boolean;
  checkResult?: boolean;
  onClickResult?: (event: React.MouseEvent) => void;
}

export const PiecesResults: FC<PropsResult> = ({
  numberToMultiply,
  value,
  onDragStart,
  isDraggable,
  checkResult,
  onClickResult
}) => {
  const [colorCheck, setColorCheck] = useState<string>('#e11a08');
  useEffect(() => {
    !checkResult ? setColorCheck('#e11a08') : setColorCheck('#33e014');
  }, [checkResult]);

  const calculateResults = (numberToMultiply: number, values: number) => {
    return values * numberToMultiply;
  };

  return (
    <article
      className={'pieces-result'}
      id={`result-index-${value}`}
      onDragStart={onDragStart}
      draggable={isDraggable}
      onClick={onClickResult}
    >
      <section className={'result'}>
        = {calculateResults(numberToMultiply, value)}
      </section>
      <section className={'result-check'} style={{ background: colorCheck }} />
    </article>
  );
};
