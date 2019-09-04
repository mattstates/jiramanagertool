import React from 'react';
import { LineChart } from './LineChart';
import { JiraIssue, JiraResponse } from '../../types/jiraTypes';
import { ChartData, ChartDataPoint } from '../../types/chartTypes';

interface ITasksCompletedProps {
    data: ChartData;
}

export const TasksCompleted: React.FC<ITasksCompletedProps> = ({ data }) => {

    const formattedData: ChartDataPoint[] = Object.entries(data).reduce(
        (acc: ChartDataPoint[], cur: [string, JiraResponse]): ChartDataPoint[] => {
            return [
                ...acc,
                {
                    date: cur[0],
                    info: cur[1].issues.length
                }
            ];
        },
        []
    ).reverse();

    return (
        <LineChart chartId={'tasksCompletedChart'} chartTitle={'Total Completed Tasks'} data={formattedData} lineColor={'#111'} />
    );
};
