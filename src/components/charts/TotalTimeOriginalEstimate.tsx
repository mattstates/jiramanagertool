import { ChartData, ChartDataPoint } from '../../types/ChartTypes';
import { Description } from './Description';
import { JiraIssue, JiraIssueField, JiraResponse } from '../../types/JiraTypes';
import { LineChart } from './LineChart';
import React from 'react';

interface ITotalTimeOriginalEstimateProps {
    data: ChartData;
}

// TODO: Possibly change the aggregation to only count timeoriginalestimates where the author in the changelog matches the assignee of the task.
// or show both / toggle that information.

export const TotalTimeOriginalEstimate: React.FC<ITotalTimeOriginalEstimateProps> = ({ data }) => {
    const formattedData = Object.entries(data)
        .reduce<ChartDataPoint[]>((acc: ChartDataPoint[], cur: [string, JiraResponse]) => {
            const mappedIssues = cur[1].issues.map(
                (issue: JiraIssue): JiraIssueField => issue.fields
            );

            // TODO: See previous TODO item.
            // const assignees = Array.from(
            //     mappedIssues.reduce((assigneeCollection: Set<string>, issue: JiraIssueField): Set<
            //         string
            //     > => {
            //         assigneeCollection.add(issue.assignee.name);
            //         return assigneeCollection;
            //     }, new Set())
            // );

            return [
                ...acc,
                {
                    // { date: string, info: totalTimeInSeconds / (60 * 60)}
                    date: cur[0],
                    info:
                        mappedIssues.reduce<number>((total: number, issue: JiraIssueField) => {
                            return total + issue.timeoriginalestimate;
                        }, 0) / 3600
                }
            ];
        }, [])
        .reverse();

    return (
        <div>
            <LineChart
                chartId={'totalTimeOriginalEstimateChart'}
                chartTitle={'Total Time Estimated'}
                data={formattedData}
                lineColor={'#d0c32a'}
                yLabel={'Hours'}
            />
            <Description
                description={`
The aggregate of the time estimates on tasks in the result set in hours.`}
                calculatedBy={`Total of timeoriginalestimate on the tasks returned.`}
                // footNote={`*Does not include time logged on the same tasks by someone who is not the assignee.`}
            />
        </div>
    );
};
