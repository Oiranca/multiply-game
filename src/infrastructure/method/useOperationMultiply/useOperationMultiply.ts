const indexNumber = (idString: string) => {
  return idString
    .split('-')
    .filter(id => !isNaN(Number(id)))
    .toString();
};

const deleteResultCorrect = (item: string, positionResults: number[]) => {
  const numberToDelete = Number(item);
  return positionResults.filter(
    (itemToDelete: number) => itemToDelete !== numberToDelete
  );
};

export const useOperationMultiply = { indexNumber, deleteResultCorrect };
