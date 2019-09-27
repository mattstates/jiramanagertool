import { getYMaxThreshold } from "../getYMaxThreshold";

describe('getYMaxThreshold', () => {
    const dataMax = 5;
    const yThreshold = 5;
    const yPadding = 5;

    test('dataMax + yPadding is returned when it is greater than or equal to the yThreshold', () => {
        expect(getYMaxThreshold({dataMax, yThreshold, yPadding})).toBe(10)
    })
    test('yThreshold is returned when dataMax is less than the yThreshold', () => {
        expect(getYMaxThreshold({dataMax: 3, yThreshold, yPadding})).toBe(5)
    })
    test('dataMax + 1 is returned when it is greater than or equal to the yThreshold and no yPadding is passed', () => {
        expect(getYMaxThreshold({dataMax, yThreshold})).toBe(6)
    })
})