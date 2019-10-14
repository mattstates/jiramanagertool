import React from 'react';
import { render } from '@testing-library/react';
import { LineChart, ILineChartProps } from '../LineChart';
import { ChartDataPoint } from '../../../types/ChartTypes';

const mockDataPoints: ChartDataPoint[] = [
    {
        date: '2019-10-10',
        info: 5
    },
    {
        date: '2019-11-10',
        info: 10
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
});
