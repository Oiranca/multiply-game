import { useOperationMultiply } from "./useOperationMultiply";

describe('should return index umber', () => {
  test('is index number', () => {
    const idString = 'index-result-2';

    const indexNumber = useOperationMultiply(idString);

    expect(indexNumber).toEqual('2');
  });
});
