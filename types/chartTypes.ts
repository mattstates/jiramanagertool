import { JiraResponse } from './jiraTypes';

export type ChartData = {
    [endDate: string]: JiraResponse;
};

export type ChartDataPoint = {
    date: string;
    info: number;
};
