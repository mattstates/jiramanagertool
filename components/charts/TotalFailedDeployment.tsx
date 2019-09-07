import React from 'react';
import { ChartData, ChartDataPoint } from '../../types/ChartTypes';
import { JiraResponse } from '../../types/JiraTypes';
import { LineChart } from './LineChart';
import { getFailedStakeHolderCount } from '../../utils/getFailedStakeholderCount';

interface ITotalFailedDeploymentProps {
    data: ChartData;
}

// customfield_13380
export const TotalFailedDeployment: React.FC<ITotalFailedDeploymentProps> = ({ data }) => {
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
