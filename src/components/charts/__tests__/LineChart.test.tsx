import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LineChart, ILineChartProps } from '../LineChart';
import { ChartDataPoint } from '../../../types/ChartTypes';

const mockDataPoints: ChartDataPoint[] = [
    {
        date: '2019-01-01',
        info: 3
    },
    {
        date: '2019-02-01',
        info: 6
    },
    {
        date: '2019-03-01',
        info: 9
    },
    {
        date: '2019-04-01',
        info: 12
    }
];

const PROPS: ILineChartProps = {
    chartId: 'test',
    chartTitle: 'test',
    data: mockDataPoints,
    lineColor: '#000', //optional
    tooltipPrecision: 5, //optional
    xLabel: 'test', //optional
    yLabel: 'test',
    yMax: 100, //optional
    yMin: 5 //optional
};

describe('LineChart', () => {
    test('Renders SVG Circle for each data point', () => {
        const { container } = render(<LineChart {...PROPS} />);
        expect(container.getElementsByTagName('circle')).toHaveLength(PROPS.data.length);
    });

    test('Hover Circle toggles .tooltip opacity', () => {
        const { container } = render(<LineChart {...PROPS} />);
        const circles = container.getElementsByTagName('circle');
        const tooltips = container.getElementsByClassName('tooltip');
        const TEST_INDEX = 0;
        const circle = circles[TEST_INDEX];
        const tooltip = tooltips[TEST_INDEX];

        expect(tooltip.getAttribute('style')).toBe(null);

        fireEvent.mouseOver(circle);

        expect(tooltip.getAttribute('style').indexOf('opacity: 1') > -1).toBe(true);
        expect(
            Array.from(tooltips).filter(tooltip => {
                return (
                    tooltip.getAttribute('style') &&
                    tooltip.getAttribute('style').indexOf('opacity: 1') > -1
                );
            })
        ).toHaveLength(1);

        fireEvent.mouseLeave(circle);

        expect(tooltip.getAttribute('style').indexOf('opacity: 1') === -1).toBe(true);
    });

    test('Only one .tooltip can be visible on <circle> hover', () => {
        const { container } = render(<LineChart {...PROPS} />);
        const circles = container.getElementsByTagName('circle');
        const tooltips = container.getElementsByClassName('tooltip');
        const TEST_INDEX = 0;
        const circle = circles[TEST_INDEX];

        fireEvent.mouseOver(circle);

        // Only one .tooltip haa a visible opacity
        expect(
            Array.from(tooltips).filter(tooltip => {
                return (
                    tooltip.getAttribute('style') &&
                    tooltip.getAttribute('style').indexOf('opacity: 1') > -1
                );
            })
        ).toHaveLength(1);

        fireEvent.mouseLeave(circle);

        // No .tooltip elements have a visible opacity
        expect(
            Array.from(tooltips).every(tooltip => {
                return (
                    tooltip.getAttribute('style') === null ||
                    tooltip.getAttribute('style').indexOf('opacity: 1') === -1
                );
            })
        ).toBe(true);
    });
});
