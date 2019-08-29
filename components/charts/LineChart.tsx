import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { predictY } from '../../utils/predictY.ts';
import './LineChart.scss';

interface ILineChartProps {
    chartId: string;
    chartTitle: string;
    data: DataPoint[];
    lineColor?: string;
    tooltipPrecision?: number;
    yMax?: number;
}

type DataPoint = {
    date: string;
    info: number;
};

// Chart Constants
const margin = { top: 30, right: 20, bottom: 30, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 270 - margin.top - margin.bottom;
const lineWidth = 2;
const circleWidth = 4;

export const LineChart: React.FC<ILineChartProps> = ({ data, chartId, chartTitle, lineColor, tooltipPrecision = 0, yMax }) => {
    const container = useRef(null);

    useEffect(() => {
        const xScale = d3
            .scaleLinear()
            .domain([0, data.length - 1]) // input
            .range([0, width]); // output

        const yScale = d3
            .scaleLinear()
            .domain([0, yMax || Math.max(...data.map((data) => data.info))]) // input
            .range([height, 0]); // output

        // 7. d3's line generator
        const pathData = data.map((data, i) => {
            return [i, data.info];
        });

        const line = d3
            .line()
            .x(function(d, i) {
                return xScale(d[0]);
            }) // set the x values for the line generator
            .y(function(d) {
                return yScale(d[1]);
            }) // set the y values for the line generator
            .curve(d3.curveMonotoneX); // apply smoothing to the line

        const trendLine = d3
            .line()
            .x(function(d, i) {
                return xScale(d[0]);
            }) // set the x values for the line generator
            .y(function(d) {
                return yScale(predictY(pathData, d[0]));
            }) // set the y values for the line generator
            .curve(d3.curveMonotoneX); // apply smoothing to the line

        // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number

        // 1. Select the container
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
                    .tickValues(data.map((d, i) => i))
                    .tickFormat((d, i) => data[i].date)
            ); // Create an axis component with d3.axisBottom

        // Y Axis Line
        svgContainer
            .append('g')
            .attr('class', 'y axis')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .call(d3.axisLeft(yScale).ticks(5, 's'));

        // Path Line
        svgContainer
            .append('path')
            .datum(pathData) // 10. Binds data to the line
            .attr('class', 'line') // Assign a class for styling
            .style('stroke', lineColor || '#000000')
            .style('stroke-width', lineWidth)
            .style('fill', 'none')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .attr('d', line); // 11. Calls the line generator

        svgContainer
            .append('path')
            .datum(pathData) // 10. Binds data to the line
            .attr('class', 'line') // Assign a class for styling
            .style('stroke', lineColor || '#000000')
            .style('stroke-dasharray', '8 8')
            .style('stroke-width', 1)
            .style('opacity', '.6')
            .style('fill', 'none')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .attr('d', trendLine); // 11. Calls the line generator

        // Circles
        svgContainer
            .selectAll('.dot')
            .data(data)
            .enter()
            .append('circle') // Uses the enter().append() method
            .attr('class', 'dot') // Assign a class for styling
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
