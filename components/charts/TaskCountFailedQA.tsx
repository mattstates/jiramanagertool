import React from 'react';
import { LineChart } from './LineChart.tsx';

interface ITaskCountFailedQAProps {
    data: any;
}

// customfield_13381
export const TaskCountFailedQA: React.FC<ITaskCountFailedQAProps> = ({ data }) => {
    const formattedData: { date: string; info: number }[] = Object.entries(data)
        .reduce((acc: { date: string; info: number }[], cur: [string, { issues: any }]) => {
            return [
                ...acc,
                {
                    date: cur[0],
                    info:
                        Number(
                            (
                                (cur[1].issues.reduce((total: number, issue: any) => {
                                    if (issue.fields.customfield_13381) {
                                        total++;
                                    }
                                    return total;
                                }, 0) /
                                    cur[1].issues.length) *
                                100
                            ).toFixed(2)
                        ) || 0
                }
            ];
        }, [])
        .reverse();

    return (
        <LineChart chartId={'taskCountFailedQAChart'} chartTitle={'Percentage of Tasks with Failed QA'} data={formattedData} lineColor={'#0000ff'} yMax={100} />
    );
};
