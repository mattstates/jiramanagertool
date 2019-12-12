import './LineChart.scss';
import { axisBottom, axisLeft } from 'd3-axis';
import { ChartDataPoint } from '../../types/ChartTypes';
import { line, curveMonotoneX } from 'd3-shape';
import { MMM_D_YY } from '../../constants/dateFormats';
import { predictY } from '../../utils/predictY';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import format from 'date-fns/format';
import React, { useEffect, useRef } from 'react';

export interface ILineChartProps {
    chartId: string;
    chartTitle: string;
    data: ChartDataPoint[];
    lineColor?: string;
    tooltipPrecision?: number;
    xLabel?: string;
    yLabel: string;
    yMax?: number;
    yMin?: number;
}

function getBaseChartWidth(percentage: number = 70, lowerThreshold: number = 600, upperThreshold: number = 960) {
    const dynamicWidth = window.innerWidth * (percentage / 100);

    switch (true) {
        case dynamicWidth > lowerThreshold && dynamicWidth < upperThreshold:
            return dynamicWidth;
        case dynamicWidth < lowerThreshold:
            return lowerThreshold;
        case dynamicWidth > upperThreshold:
            return upperThreshold;
    }
}

// Chart Constants
const margin = { top: 30, right: 20, bottom: 30, left: 50 };
const width = getBaseChartWidth() - margin.left - margin.right;
const height = 270 - margin.top - margin.bottom;
const lineWidth = 2;
const circleWidth = 4;
const Y_TICK_THRESHOLD = 5;

export const LineChart: React.FC<ILineChartProps> = ({
    data,
    chartId,
    chartTitle,
    lineColor,
    tooltipPrecision = 0,
    yMax,
    yMin = 0,
    yLabel,
    xLabel = 'Interval End Date'
}) => {
    const container = useRef(null);

    useEffect(() => {
        const xScale = scaleLinear()
            .domain([0, data.length - 1]) // input
            .range([0, width]); // output

        const yScale = scaleLinear()
            .domain([
                yMin,
                yMax ||
                    (() => {
                        const max = Math.ceil(
                            Math.max(...data.map((data: ChartDataPoint): number => data.info)) * 1.33
                        );
                        return max > Y_TICK_THRESHOLD - 1 ? max : Y_TICK_THRESHOLD;
                    })()
            ]) // input
            .range([height, 0]); // output

        const pathData: Array<number[]> = data.map((data: ChartDataPoint, i): number[] => {
            return [i, data.info];
        });

        const chartLine = line()
            .x(function(d: [number, number]) {
                return xScale(d[0]);
            })
            .y(function(d: [number, number]) {
                return yScale(d[1]);
            })
            .curve(curveMonotoneX);

        const trendLine = line()
            .x(function(d: [number, number]) {
                return xScale(d[0]);
            })
            .y(function(d: [number, number]) {
                const yPoint = predictY(pathData, d[0]);
                return yScale(yPoint >= yMin ? yPoint : yMin);
            })
            .curve(curveMonotoneX);

        const svgContainer = select(container.current);

        const tooltip = select(`div.${chartId}.tooltip`);

        // Main Graph Body
        svgContainer
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g');

        // X Axis line
        svgContainer
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
            .call(
                axisBottom(xScale)
                    .tickValues(data.map((_d: ChartDataPoint, i: number) => i))
                    .tickFormat((_d, i) => format(data[i].date, MMM_D_YY))
            );

        // Y Axis Line
        svgContainer
            .append('g')
            .attr('class', 'y axis')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .call(
                axisLeft(yScale).ticks(
                    (() => {
                        return data.length > Y_TICK_THRESHOLD ? Y_TICK_THRESHOLD : data.length + 1;
                    })(),
                    's'
                )
            );

        // X Axis Label
        svgContainer
            .append('text')
            .attr('transform', `translate(${width / 2 + 25}, ${height + margin.top + 80})`)
            .style('text-anchor', 'middle')
            .text(xLabel);

        // Y Axis Label
        svgContainer
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0)
            .attr('x', 0 - height / 2 - 25)
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text(yLabel);

        // Path Lines
        svgContainer
            .append('path')
            .datum(pathData)
            .attr('class', 'line')
            .style('stroke', lineColor || '#000000')
            .style('stroke-width', lineWidth)
            .style('fill', 'none')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .attr('d', chartLine);

        svgContainer
            .append('path')
            .datum(pathData)
            .attr('class', 'line')
            .style('stroke', lineColor || '#000000')
            .style('stroke-dasharray', '8 8')
            .style('stroke-width', 1)
            .style('opacity', '.6')
            .style('fill', 'none')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .attr('d', trendLine);

        if (yMin < 0) {
            const zeroLineData = data.map((_d, i) => {
                return [i, 0];
            });

            const zeroLine = line()
                .x(function(d) {
                    return xScale(d[0]);
                })
                .y(function() {
                    return yScale(0);
                });

            svgContainer
                .append('path')
                .datum(zeroLineData)
                .attr('class', 'line')
                .style('stroke', '#000000')
                .style('stroke-dasharray', '10 10')
                .style('stroke-width', 0.5)
                .style('opacity', '.6')
                .style('fill', 'none')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)
                .attr('d', zeroLine);
        }

        // SVG Circles
        svgContainer
            .selectAll('.dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', function(_d, i) {
                return xScale(i);
            })
            .attr('cy', function(d) {
                return yScale(d.info);
            })
            .attr('r', circleWidth)
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .on('mouseover', function(d) {
                tooltip
                    .style('top', `${Number(this.getAttribute('cy')) + 10}px`)
                    .style('left', `${Number(this.getAttribute('cx')) - 30}px`)
                    .html(
                        `
                    Date: ${format(d.date, MMM_D_YY)}<br/>
                    Value: ${d.info.toFixed(tooltipPrecision)}
                `
                    )
                    .style('opacity', '1');
            })
            .on('mouseout', function() {
                tooltip
                    .style('opacity', '0')
                    .style('top', '-1000px')
                    .style('left', '-1000px');
            });

        return () => {
            container.current.innerHTML = '';
        };
    }, [data]);

    return (
        <div className="chartContainer">
            <div className={`${chartId} tooltip`} />
            <h2>{chartTitle}</h2>
            <svg ref={container} id={chartId} />
        </div>
    );
};
