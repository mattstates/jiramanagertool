import { ChartData, ChartDataPoint } from '../../types/ChartTypes';
import { Description } from './Description';
import { JiraIssue, JiraResponse } from '../../types/JiraTypes';
import { LineChart } from './LineChart';
import React from 'react';

interface ITotalFailedQAProps {
    data: ChartData;
}

// customfield_13381
export const TotalFailedQA: React.FC<ITotalFailedQAProps> = ({ data }) => {
    const formattedData: ChartDataPoint[] = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]): ChartDataPoint[] => {
            return [
                ...acc,
                {
                    date: cur[0],
                    info: cur[1].issues.reduce((total: number, issue: JiraIssue): number => {
                        total += issue.fields.customfield_13381;

                        return total;
                    }, 0)
                }
            ];
        }, [])
        .reverse();

    return (
        <div>
            <LineChart
                chartId={'totalFailedQAChart'}
                chartTitle={'Failed QA'}
                data={formattedData}
                lineColor={'#0000cc'}
                yLabel={'Total'}
            />
            <Description
                description={`
                    Count of the number of times tasks have failed QA.`}
                calculatedBy={`Aggregate of all tasks failed QA count`}
                footNote={`*Each instance of failed QA is counted.`}
            />
        </div>
    );
};
