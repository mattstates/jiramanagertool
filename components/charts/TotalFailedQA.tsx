import React from 'react';
import { LineChart } from './LineChart.tsx';

interface ITotalFailedQAProps {
    data: any;
}

// customfield_13381
export const TotalFailedQA: React.FC<ITotalFailedQAProps> = ({ data }) => {
    const formattedData: { date: string; info: number }[] = Object.entries(data)
        .reduce((acc: { date: string; info: number }[], cur: [string, { issues: any }]) => {
            return [
                ...acc,
                {
                    date: cur[0],
                    info: cur[1].issues.reduce((total: number, issue: any) => {
                        total += issue.fields.customfield_13381;

                        return total;
                    }, 0)
                }
            ];
        }, [])
        .reverse();

    return <LineChart chartId={'totalFailedQAChart'} chartTitle={'Total Times Failed QA'} data={formattedData} lineColor={'#0000cc'} />;
};
