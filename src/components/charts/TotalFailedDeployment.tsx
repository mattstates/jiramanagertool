import { ChartData, ChartDataPoint } from '../../types/ChartTypes';
import { Description } from './Description';
import { getFailedStakeHolderCount } from '../../utils/getFailedStakeholderCount';
import { JiraResponse } from '../../types/JiraTypes';
import { LineChart } from './LineChart';
import React from 'react';

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

    return (
        <div>
            <LineChart
                chartId={'totalFailedDeploymentChart'}
                chartTitle={'Failed Stakeholder Test'}
                data={formattedData}
                lineColor={'#6633aa'}
                yLabel={'Total'}
            />
            <Description
                description={`
Count of the number of tasks that have ever transitioned to a Failed Stakeholder status.`}
                calculatedBy={`Count of tasks that have transitioned to "Failed Stakeholder" status`}
            />
        </div>
    );
};
