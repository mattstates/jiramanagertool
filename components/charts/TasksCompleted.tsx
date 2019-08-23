import React from 'react';
import { LineChart } from './LineChart.tsx';

interface ITasksCompletedProps {
    data: any;
}

const testData: { date: string; info: number }[] = [
    { date: '2019-08-05', info: 7 },
    { date: '2019-07-05', info: 12 },
    { date: '2019-06-05', info: 10 },
    { date: '2019-05-05', info: 25 },
    { date: '2019-04-05', info: 3 },
    { date: '2019-03-05', info: 7 },
    { date: '2019-02-05', info: 12 },
    { date: '2019-01-05', info: 10 },
    { date: '2018-12-05', info: 25 },
    { date: '2018-11-05', info: 3 },
    { date: '2018-10-05', info: 20 }
].reverse();

export const TasksCompleted: React.FC<ITasksCompletedProps> = ({ data }) => {

    const formattedData: { date: string; info: number }[] = Object.entries(data).reduce(
        (acc: { date: string; info: number }[], cur: [string, { issues: any }]) => {
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
