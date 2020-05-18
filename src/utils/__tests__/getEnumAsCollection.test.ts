import getEnumValuesAsCollection from '../getEnumAsCollection';

enum TestEnum {
    IAmAKey = 'I Am A Key',
    IAmASecondKey = 'I Am A Second Key',
    Something = 5,
    Item
}

describe('getEnumValuesAsCollection', () => {
    const collection = getEnumValuesAsCollection(TestEnum);

    test('Accepts string enum with spaces', () => {
        expect(collection.length).toBe(4);
    });

    test('Accepts Heterogeneous enum', () => {
        expect(collection[0]).toBe('I Am A Key');
        expect(collection[1]).toBe('I Am A Second Key');
        expect(collection[2]).toBe(5);
        expect(collection[3]).toBe(6);
    });
});
