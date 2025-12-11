import { FC, useEffect, useState } from 'react';

interface PropsResult {
  numberToMultiply: number;
  value?: number;
  onDragStart?: (e: React.DragEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  isDraggable?: boolean;
  checkResult?: boolean;
  onClickResult?: (event: React.MouseEvent) => void;
}

export const PiecesResults: FC<PropsResult> = ({
  numberToMultiply,
  value,
  onDragStart,
  onTouchStart,
  isDraggable = false,
  checkResult = false,
  onClickResult
}) => {
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setIsCorrect(!!checkResult);
  }, [checkResult]);

  const calculateResults = (numberToMultiply: number, values: number) => {
    return values * numberToMultiply;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClickResult) {
      e.preventDefault();
      onClickResult(e as any);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (onTouchStart && isDraggable) {
      e.preventDefault();
      onTouchStart(e);
    }
  };

  const result = value !== undefined ? calculateResults(numberToMultiply, value) : null;
  const resultText = result !== null ? `igual a ${result}` : 'espacio vacío';

  const baseClasses =
    'piece-base rounded-tr-lg rounded-bl-2xl piece-interactive';
  const cursorClass = isDraggable ? 'cursor-move touch-none' : 'cursor-pointer';

  return value !== undefined ? (
    <article
      className={`${baseClasses} ${cursorClass}`}
      id={`result-index-${value}`}
      onDragStart={onDragStart}
      onTouchStart={handleTouchStart}
      draggable={isDraggable}
      onClick={onClickResult}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Resultado: ${resultText}`}
      aria-grabbed={isDraggable}
    >
      <span className="font-bold text-sm sm:text-base md:text-sm lg:text-base select-none">
        = {result}
      </span>
      <span
        className={`w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 rounded-full ${isCorrect ? 'bg-success' : 'bg-error'} transition-colors duration-300`}
        aria-hidden="true"
      />
    </article>
  ) : (
    <article
      className="flex justify-evenly items-center m-1 sm:m-2 piece-size bg-main/30 text-second/50 rounded-tr-lg rounded-bl-2xl border-2 border-dashed border-main/50"
      id={`result-index-empty`}
      aria-hidden="true"
    ></article>
  );
};
