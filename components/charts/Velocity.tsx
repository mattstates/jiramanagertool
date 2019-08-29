import React from 'react';
import getVelocityDivisor from '../../utils/getVelocityDivisor.ts';
import { LineChart } from './LineChart.tsx';

interface IVelocityProps {
    data: any;
}

type JiraIssue = {
    assignee: { name: string };
    worklog: { worklogs: any[] };
};

export const Velocity: React.FC<IVelocityProps> = ({ data }) => {
    const formattedData: { date: string; info: number }[] = Object.entries(data)
        .reduce((acc: { date: string; info: number }[], cur: [string, { issues: any }]) => {
            const mappedIssues: JiraIssue[] = cur[1].issues.map((issue: any) => issue.fields);

            const assignees: string[] = Array.from(
                mappedIssues.reduce((assigneeCollection: Set<string>, issue: JiraIssue) => {
                    assigneeCollection.add(issue.assignee.name);
                    return assigneeCollection;
                }, new Set())
            );

            return [
                ...acc,
                {
                    // { date: string, info: totalTimeInSeconds / (60 * 60)}
                    date: cur[0],
                    info:
                        mappedIssues.reduce((total: number, issue: JiraIssue) => {
                            // We only want time logged by the assignee counted here, not total time on the task
                            return (
                                total +
                                issue.worklog.worklogs
                                    .filter((log: any) => {
                                        return assignees.indexOf(log.updateAuthor.name) > -1;
                                    })
                                    .reduce((timeInSeconds: number, worklog: any) => {
                                        return timeInSeconds + worklog.timeSpentSeconds;
                                    }, 0)
                            );
                        }, 0) /
                        getVelocityDivisor(mappedIssues) /
                        3600
                }
            ];
        }, [])
        .reverse();

    return <LineChart chartId={'velocityChart'} chartTitle={'Velocity on Tasks Completed in the Date Range'} data={formattedData} lineColor={'green'} tooltipPrecision={2} />;
};
