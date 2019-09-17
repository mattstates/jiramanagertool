import { ChartData, ChartDataPoint } from '../../types/ChartTypes';
import { Description } from './Description';
import { JiraResponse } from '../../types/JiraTypes';
import { LineChart } from './LineChart';
import React from 'react';

interface ITasksCompletedProps {
    data: ChartData;
}

export const TasksCompleted: React.FC<ITasksCompletedProps> = ({ data }) => {
    const formattedData: ChartDataPoint[] = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]): ChartDataPoint[] => {
            return [
                ...acc,
                {
                    date: cur[0],
                    info: cur[1].issues.length
                }
            ];
        }, [])
        .reverse();

    return (
        <div>
            <LineChart
                chartId={'tasksCompletedChart'}
                chartTitle={'Total Completed Tasks'}
                data={formattedData}
                lineColor={'#111'}
                yLabel={'Total'}
            />
            <Description
                description={`
The total number of tasks completed in the time interval.`}
                calculatedBy={`Number of tasks in the result set`}
                footNote={`*Tasks show up here based on when they transitioned to a "Done" status and if they are currently in a "Done" status.`}
            />
        </div>
    );
};
