import React, { FC, useEffect, useState } from 'react';

interface PropsPiecesNumber {
  numberToMultiply: number;
  value: number;
  checkOperation?: boolean;
  onClickTable?: (event: React.MouseEvent) => void;
}

export const PiecesNumbers: FC<PropsPiecesNumber> = ({
  numberToMultiply,
  value,
  checkOperation = false,
  onClickTable
}) => {
  const [values] = useState<number>(value);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setIsCorrect(!!checkOperation);
  }, [checkOperation]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClickTable) {
      e.preventDefault();
      onClickTable(e as any);
    }
  };

  const operationText = `${numberToMultiply} por ${values}`;

  return (
    <article
      className="piece-base rounded-tl-lg rounded-br-2xl piece-interactive"
      id={`number-index-${values}`}
      onClick={onClickTable}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Operación: ${operationText}`}
      aria-pressed={isCorrect}
    >
      <span
        className={`w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 rounded-full 
                    ${isCorrect ? 'bg-success' : 'bg-error'}
                    transition-colors duration-300`}
        aria-hidden="true"
      />
      <span className="font-bold text-sm sm:text-base md:text-sm lg:text-base select-none">
        {`${numberToMultiply}×${values}`}
      </span>
    </article>
  );
};
