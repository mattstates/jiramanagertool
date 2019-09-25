import '../styles/reset.scss';
import './App.scss';
import { AverageOriginalEstimate } from './charts/AverageOriginalEstimate';
import { ChartData } from '../types/ChartTypes';
import { Criterias } from '../enums/Criterias';
import { EstimationAccuracy } from './charts/EstimationAccuracy';
import { JiraQueryBuilderForm } from './JiraQueryBuilderForm';
import { JiraResponse } from '../types/JiraTypes';
import { Loader } from './Loader';
import { TaskCountFailedCodeReview } from './charts/TaskCountFailedCodeReview';
import { TaskCountFailedQA } from './charts/TaskCountFailedQA';
import { TasksCompleted } from './charts/TasksCompleted';
import { TaskVelocity } from './charts/TaskVelocity';
import { TimeLogged } from './charts/TimeLogged';
import { TimeVelocity } from './charts/TimeVelocity';
import { TotalFailedCodeReview } from './charts/TotalFailedCodeReview';
import { TotalFailedDeployment } from './charts/TotalFailedDeployment';
import { TotalFailedQA } from './charts/TotalFailedQA';
import { TotalTimeOriginalEstimate } from './charts/TotalTimeOriginalEstimate';
import { urlBuilder } from '../secrets';
import React, { Fragment, useEffect, useState } from 'react';

export interface IAppState {
    assignee: string;
    criterias: Array<Criterias>;
    dateRanges: Array<[string, string]>;
}

export function App() {
    const [appState, updateAppState] = useState<IAppState>({
        assignee: '',
        criterias: [],
        dateRanges: []
    });
    const [loading, updateLoading] = useState<boolean>(false);
    const [vizualizationData, updateVizData] = useState<ChartData>({});

    useEffect(() => {
        updateLoading(true);
        updateVizData({});

        (async () => {
            let responseData: Array<JiraResponse[]>;

            try {
                responseData = await getJiraResponseData(appState.assignee, appState.dateRanges);
            } catch (error) {
                console.log(error.message);
            }

            const formattedData: ChartData = appState.dateRanges.reduce(
                (hash: ChartData, dateRange, i): ChartData => {
                    // Not sure why TypeScript doesn't want to accept .reduce without an initial value param.
                    hash[dateRange[1]] = responseData[i].reduce<JiraResponse>(
                        (responseAccumlator, jiraResponse): JiraResponse => {
                            return {
                                ...responseAccumlator,
                                issues: [...responseAccumlator.issues, ...jiraResponse.issues]
                            };
                        },
                        {
                            expand: '',
                            issues: [],
                            maxResults: 0,
                            startAt: 0,
                            total: 0
                        }
                    );
                    return hash;
                },
                {}
            );

            updateVizData(formattedData);
            updateLoading(false);
        })();
    }, [appState.dateRanges, appState.assignee, appState.criterias]);

    //TODO: Loop through an array of urls and map them to a Result element to show what the JQL query was for the result...
    const isVisDataAvailable = Object.keys(vizualizationData).length > 0;

    let charts: JSX.Element[];

    if (!loading && isVisDataAvailable) {
        charts = appState.criterias.map((criteria, i) => {
            return mapCriteriaToChartComponent({
                criteria,
                data: vizualizationData,
                key: `${criteria.toString()}${i}`
            });
        });
    }

    return (
        <Fragment>
            <h3>Customize Your Search</h3>
            <JiraQueryBuilderForm callback={updateAppState} />
            {loading ? <Loader /> : charts}
        </Fragment>
    );
}

function mapCriteriaToChartComponent({
    criteria,
    data,
    key
}: {
    criteria: Criterias;
    data: ChartData;
    key: string;
}): JSX.Element {
    switch (criteria) {
        case Criterias.EstimationAccuracy:
            return <EstimationAccuracy data={data} key={key} />;
        case Criterias.TaskCountFailedCodeReview:
            return <TaskCountFailedCodeReview data={data} key={key} />;
        case Criterias.TaskCountFailedQA:
            return <TaskCountFailedQA data={data} key={key} />;
        case Criterias.TasksCompleted:
            return <TasksCompleted data={data} key={key} />;
        case Criterias.TimeLogged:
            return <TimeLogged data={data} key={key} />;
        case Criterias.TotalFailedCodeReview:
            return <TotalFailedCodeReview data={data} key={key} />;
        case Criterias.TotalFailedDeployment:
            return <TotalFailedDeployment data={data} key={key} />;
        case Criterias.TotalFailedQA:
            return <TotalFailedQA data={data} key={key} />;
        case Criterias.TimeVelocity:
            return <TimeVelocity data={data} key={key} />;
        case Criterias.AverageOriginalEstimate:
            return <AverageOriginalEstimate data={data} key={key} />;
        case Criterias.TaskVelocity:
            return <TaskVelocity data={data} key={key} />;
        case Criterias.TotalTimeOriginalEstimate:
            return <TotalTimeOriginalEstimate data={data} key={key} />;
    }
}

/**
 * @description Fetches all results in the event that there are more issues than the max results query param allows. Has a dependency on urlBuilder()
 */
async function getJiraResponseData(assignee: string, dateRanges: Array<[string, string]>) {
    // TODO: Handle fetching errors.
    const initialPromises = dateRanges.map(async dateRange => {
        const response = await fetch(urlBuilder(assignee, dateRange[0], dateRange[1], 0));
        const json: JiraResponse = await response.json();
        return json;
    });

    const initialResponses = await Promise.all<JiraResponse>(initialPromises);

    const subsequentPromises = initialResponses.map(
        async (initialResponse, responseIndex): Promise<JiraResponse[]> => {
            const { maxResults, total } = initialResponse;
            const apiCallCount = Math.floor(total / maxResults);
            let remainingResults: Promise<JiraResponse>[] = [
                new Promise<JiraResponse>((resolve, _reject) => {
                    resolve(initialResponse);
                })
            ];
            if (apiCallCount > 0) {
                remainingResults = [
                    ...remainingResults,
                    ...new Array(apiCallCount).fill(null).map(async (_element, i) => {
                        const response = await fetch(
                            urlBuilder(
                                assignee,
                                dateRanges[responseIndex][0],
                                dateRanges[responseIndex][1],
                                (i + 1) * maxResults
                            )
                        );
                        const json: JiraResponse = await response.json();
                        return json;
                    })
                ];
            }

            return await Promise.all<JiraResponse>(remainingResults);
        }
    );
    const subsequentResponses = await Promise.all(subsequentPromises);

    return subsequentResponses;
}
