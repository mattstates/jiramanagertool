import { JiraResponse } from './JiraTypes';

export type ChartData = {
    [endDate: string]: JiraResponse;
};

export type ChartDataPoint = {
    date: string;
    info: number;
};
