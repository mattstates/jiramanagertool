import React, { useRef } from 'react';
import { LineChart } from './LineChart.tsx';

interface ITotalFailedCodeReviewProps {
    data: any;
}

// customfield_13380
export const TotalFailedCodeReview: React.FC<ITotalFailedCodeReviewProps> = ({ data }) => {
    const container = useRef(null);
    const formattedData: { date: string; info: number }[] = Object.entries(data)
        .reduce((acc: { date: string; info: number }[], cur: [string, { issues: any }]) => {
            return [
                ...acc,
                {
                    date: cur[0],
                    info: cur[1].issues.reduce((total: number, issue: any) => {
                        total += issue.fields.customfield_13380;

                        return total;
                    }, 0)
                }
            ];
        }, [])
        .reverse();

    return <LineChart chartId={'totalFailedCodeReviewChart'} chartTitle={'Total Times Failed Code Review'} data={formattedData} lineColor={'#cc0000'} />;
};
