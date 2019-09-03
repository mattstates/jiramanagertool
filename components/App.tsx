import React, { Fragment, useEffect, useState } from 'react';
import { Criterias } from '../enums/Criterias';
import { urlBuilder } from '../secrets';
import { ChartData } from '../types/chartTypes';
import { JiraResponse } from '../types/jiraTypes';
import './App.scss';
import { EstimationAccuracy } from './charts/EstimationAccuracy';
import { TaskCountFailedCodeReview } from './charts/TaskCountFailedCodeReview';
import { TaskCountFailedQA } from './charts/TaskCountFailedQA';
import { TasksCompleted } from './charts/TasksCompleted';
import { TimeLogged } from './charts/TimeLogged';
import { TotalFailedCodeReview } from './charts/TotalFailedCodeReview';
import { TotalFailedDeployment } from './charts/TotalFailedDeployment';
import { TotalFailedQA } from './charts/TotalFailedQA';
import { Velocity } from './charts/Velocity';
import { JiraQueryBuilderForm } from './JiraQueryBuilderForm';

export interface IAppState {
    assignee: string;
    dateRanges: Array<[string, string]>;
    criterias: Array<Criterias>;
}

export function App() {
    const [appState, updateAppState] = useState<IAppState>({ assignee: '', dateRanges: [], criterias: [] });
    const [vizualizationData, updateVizData] = useState<ChartData>({});
    const [loading, updateLoading] = useState<boolean>(false);

    console.log(vizualizationData, '<--- vizData');

    useEffect(() => {
        updateLoading(true);
        updateVizData({});

        const data: JiraResponse[] = [];
        const promises = appState.dateRanges.map((dateRange) => {
            return fetch(urlBuilder(appState.assignee, dateRange[0], dateRange[1]))
                .then((response) => response.json())
                .then((json: JiraResponse) => {
                    return json;
                });
        });

        Promise.all(promises)
            .then((results) => {
                results.forEach((result) => {
                    data.push(result);
                });

                const formattedData: ChartData = appState.dateRanges.reduce((hash: ChartData, dateRange, i): ChartData => {
                    hash[dateRange[1]] = data[i];
                    return hash;
                }, {});

                updateVizData(formattedData);
                updateLoading(false);
            })
            .catch((err: any) => {
                updateLoading(false);
            });
    }, [appState.dateRanges, appState.assignee, appState.criterias]);

    //TODO: Loop through an array of urls and map them to a Result element to show what the JQL query was for the result...
    const isVisDataAvailable = Object.keys(vizualizationData).length > 0;

    let charts: JSX.Element[];
    if (!loading && isVisDataAvailable) {
        charts = appState.criterias.map((criteria) => { return mapCriteriaToChartComponent(criteria, vizualizationData) })
    }

    return (
        <Fragment>
            <p>Customize Your Search</p>
            <JiraQueryBuilderForm callback={updateAppState} />
            {loading ? 'LOADING...' : charts}
        </Fragment>
    );
}

function mapCriteriaToChartComponent(criteria: Criterias, data: ChartData): JSX.Element {
    switch (criteria) {
        case Criterias.EstimationAccuracy:
            return <EstimationAccuracy data={data} />
        case Criterias.TaskCountFailedCodeReview:
            return <TaskCountFailedCodeReview data={data} />
        case Criterias.TaskCountFailedQA:
            return <TaskCountFailedQA data={data} />
        case Criterias.TasksCompleted:
            return <TasksCompleted data={data} />
        case Criterias.TimeLogged:
            return <TimeLogged data={data} />
        case Criterias.TotalFailedCodeReview:
            return <TotalFailedCodeReview data={data} />
        case Criterias.TotalFailedDeployment:
            return <TotalFailedDeployment data={data} />
        case Criterias.TotalFailedQA:
            return <TotalFailedQA data={data} />
        case Criterias.Velocity:
            return <Velocity data={data} />
        default:
            return null;
    }
}
