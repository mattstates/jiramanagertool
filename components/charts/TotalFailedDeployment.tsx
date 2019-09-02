import React, { useRef } from 'react';
import { ChartData, ChartDataPoint } from '../../types/chartTypes';
import { JiraIssue, JiraResponse, JiraIssueField } from '../../types/jiraTypes';
import { LineChart } from './LineChart.tsx';
import { getFailedStakeHolderCount } from '../../utils/getFailedStakeholderCount.ts';

interface ITotalFailedDeploymentProps {
    data: ChartData;
}

// customfield_13380
export const TotalFailedDeployment: React.FC<ITotalFailedDeploymentProps> = ({ data }) => {
    const container = useRef(null);
    const formattedData: ChartDataPoint[] = Object.entries(data)
        .reduce((acc: ChartDataPoint[], cur: [string, JiraResponse]): ChartDataPoint[] => {
            return [
                ...acc,
                {
                    date: cur[0],
                    info: getFailedStakeHolderCount(cur[1].issues)
                }
            ];
        }, [])
        .reverse();

    return <LineChart chartId={'totalFailedDeploymentChart'} chartTitle={'Total Times Failed Stakeholder Test'} data={formattedData} lineColor={'#6633aa'} />;
};
