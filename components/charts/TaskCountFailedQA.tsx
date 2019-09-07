import React from 'react';
import { LineChart } from './LineChart';
import { ChartDataPoint, ChartData } from '../../types/ChartTypes';
import { JiraIssue, JiraResponse } from '../../types/JiraTypes';

interface ITaskCountFailedQAProps {
    data: ChartData;
}

// customfield_13381
export const TaskCountFailedQA: React.FC<ITaskCountFailedQAProps> = ({ data }) => {
    const formattedData: ChartDataPoint[] = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]): ChartDataPoint[] => {
        return [
                ...acc,
                {
                    date: cur[0],
                    info:
                        Number(
                            (
                                (cur[1].issues.reduce((total: number, issue: JiraIssue) => {
                                    if (issue.fields.customfield_13381) {
                                        total++;
                                    }
                                    return total;
                                }, 0) / cur[1].issues.length) * 100
                            ).toFixed(2)
                        ) || 0
                }
            ];
        }, [])
        .reverse();

    return (
        <LineChart chartId={'taskCountFailedQAChart'} chartTitle={'Percentage of Tasks with Failed QA'} data={formattedData} lineColor={'#0000ff'} yMax={100} tooltipPrecision={2}  />
    );
};
