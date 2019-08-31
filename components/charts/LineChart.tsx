import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { ChartDataPoint } from '../../types/chartTypes';
import { predictY } from '../../utils/predictY.ts';
import './LineChart.scss';
import { number } from 'prop-types';

interface ILineChartProps {
    chartId: string;
    chartTitle: string;
    data: ChartDataPoint[];
    lineColor?: string;
    tooltipPrecision?: number;
    yMax?: number;
    yMin?: number;
}

// Chart Constants
const margin = { top: 30, right: 20, bottom: 30, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 270 - margin.top - margin.bottom;
const lineWidth = 2;
const circleWidth = 4;
const Y_TICK_THRESHOLD = 5;


export const LineChart: React.FC<ILineChartProps> = ({ data, chartId, chartTitle, lineColor, tooltipPrecision = 0, yMax, yMin = 0 }) => {
    const container = useRef(null);

    useEffect(() => {
        const xScale = d3
            .scaleLinear()
            .domain([0, data.length - 1]) // input
            .range([0, width]); // output

        const yScale = d3
            .scaleLinear()
            .domain([yMin, yMax || Math.max(...data.map((data: ChartDataPoint): number => data.info))]) // input
            .range([height, 0]); // output

        const pathData: Array<number[]> = data.map((data: ChartDataPoint, i): number[] => {
            return [i, data.info];
        });

        const line = d3
            .line()
            .x(function(d: [number, number], i) {
                return xScale(d[0]);
            })
            .y(function(d: [number, number]) {
                return yScale(d[1]);
            })
            .curve(d3.curveMonotoneX);

        const trendLine = d3
            .line()
            .x(function(d: [number, number], i) {
                return xScale(d[0]);
            })
            .y(function(d: [number, number]) {
                return yScale(predictY(pathData, d[0]));
            })
            .curve(d3.curveMonotoneX);

        const svgContainer = d3.select(container.current);

        const tooltip = d3.select(`div.${chartId}.tooltip`);

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
                d3
                    .axisBottom(xScale)
                    .tickValues(data.map((d: ChartDataPoint, i: number) => i))
                    .tickFormat((d, i) => data[i].date)
            );

        // Y Axis Line
        svgContainer
            .append('g')
            .attr('class', 'y axis')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .call(d3.axisLeft(yScale).ticks((() => {
                return data.length > Y_TICK_THRESHOLD ? Y_TICK_THRESHOLD : data.length + 1;
            })(), 's'));

        // Path Lines
        svgContainer
            .append('path')
            .datum(pathData)
            .attr('class', 'line')
            .style('stroke', lineColor || '#000000')
            .style('stroke-width', lineWidth)
            .style('fill', 'none')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .attr('d', line);

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
            const zeroLineData = data.map((data, i) => {
                return [i, 0];
            });

            const zeroLine = d3
                .line()
                .x(function(d, i) {
                    return xScale(d[0]);
                })
                .y(function(d) {
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
            .attr('cx', function(d, i) {
                return xScale(i);
            })
            .attr('cy', function(d) {
                return yScale(d.info);
            })
            .attr('r', circleWidth)
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .on('mouseover', function(d, ...args) {
                tooltip.style('top', `${Number(this.getAttribute('cy')) + 70}px`);
                tooltip.style('left', `${Number(this.getAttribute('cx')) - 25}px`);
                tooltip
                    .html(
                        `
                    Date: ${d.date}<br/>
                    Value: ${d.info.toFixed(tooltipPrecision)}
                `
                    )
                    .style('opacity', '1');
            })
            .on('mouseout', function(d) {
                tooltip.style('opacity', '0');
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
