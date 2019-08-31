import { JiraResponse } from './jiraTypes.ts';

export type ChartData = {
    [key: string]: JiraResponse;
};

export type ChartDataPoint = {
    date: string;
    info: number;
};
