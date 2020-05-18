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
    const CIRCLE_TAGNAME = 'circle';
    const TOOLTIP_CLASSNAME = 'tooltip';
    const VISIBILITY_DEFINITION = 'opacity: 1';
    const STYLE_ATTRIBUTE_NAME = 'style';

    test('Renders SVG Circle for each data point', () => {
        const { container } = render(<LineChart {...PROPS} />);
        expect(container.getElementsByTagName('circle')).toHaveLength(PROPS.data.length);
    });

    test(`Hover <${CIRCLE_TAGNAME}> toggles .${TOOLTIP_CLASSNAME} opacity`, () => {
        const { container } = render(<LineChart {...PROPS} />);
        const circles = container.getElementsByTagName(CIRCLE_TAGNAME);
        const tooltips = container.getElementsByClassName(TOOLTIP_CLASSNAME);
        const TEST_INDEX = 0;
        const circle = circles[TEST_INDEX];
        const tooltip = tooltips[TEST_INDEX];

        expect(tooltip.getAttribute(STYLE_ATTRIBUTE_NAME)).toBe(null);

        fireEvent.mouseOver(circle);

        expect(tooltip.getAttribute(STYLE_ATTRIBUTE_NAME).indexOf(VISIBILITY_DEFINITION) > -1).toBe(
            true
        );
        expect(
            Array.from(tooltips).filter(tooltip => {
                return (
                    tooltip.getAttribute(STYLE_ATTRIBUTE_NAME) &&
                    tooltip.getAttribute(STYLE_ATTRIBUTE_NAME).indexOf(VISIBILITY_DEFINITION) > -1
                );
            })
        ).toHaveLength(1);

        fireEvent.mouseLeave(circle);

        expect(
            tooltip.getAttribute(STYLE_ATTRIBUTE_NAME).indexOf(VISIBILITY_DEFINITION) === -1
        ).toBe(true);
    });

    test(`Only one .${TOOLTIP_CLASSNAME} can be visible on <${CIRCLE_TAGNAME}> hover`, () => {
        const { container } = render(<LineChart {...PROPS} />);
        const circles = container.getElementsByTagName(CIRCLE_TAGNAME);
        const tooltips = container.getElementsByClassName(TOOLTIP_CLASSNAME);
        const TEST_INDEX = 0;
        const circle = circles[TEST_INDEX];

        fireEvent.mouseOver(circle);

        // Only one .tooltip haa a visible opacity
        expect(
            Array.from(tooltips).filter(tooltip => {
                return (
                    tooltip.getAttribute(STYLE_ATTRIBUTE_NAME) &&
                    tooltip.getAttribute(STYLE_ATTRIBUTE_NAME).indexOf(VISIBILITY_DEFINITION) > -1
                );
            })
        ).toHaveLength(1);

        fireEvent.mouseLeave(circle);

        // No .tooltip elements have a visible opacity
        expect(
            Array.from(tooltips).every(tooltip => {
                return (
                    tooltip.getAttribute(STYLE_ATTRIBUTE_NAME) === null ||
                    tooltip.getAttribute(STYLE_ATTRIBUTE_NAME).indexOf(VISIBILITY_DEFINITION) === -1
                );
            })
        ).toBe(true);
    });
});
