import './App.scss';
import { ChartData } from '../types/chartTypes';
import { Criterias } from '../enums/Criterias';
import { EstimationAccuracy } from './charts/EstimationAccuracy';
import { JiraQueryBuilderForm } from './JiraQueryBuilderForm';
import { JiraResponse } from '../types/jiraTypes';
import { TaskCountFailedCodeReview } from './charts/TaskCountFailedCodeReview';
import { TaskCountFailedQA } from './charts/TaskCountFailedQA';
import { TasksCompleted } from './charts/TasksCompleted';
import { TimeLogged } from './charts/TimeLogged';
import { TotalFailedCodeReview } from './charts/TotalFailedCodeReview';
import { TotalFailedDeployment } from './charts/TotalFailedDeployment';
import { TotalFailedQA } from './charts/TotalFailedQA';
import { urlBuilder } from '../secrets';
import { Velocity } from './charts/Velocity';
import React, { Fragment, useEffect, useState } from 'react';

export interface IAppState {
    assignee: string;
    criterias: Array<Criterias>;
    dateRanges: Array<[string, string]>;
}

export function App() {
    const [appState, updateAppState] = useState<IAppState>({ assignee:'', criterias:[], dateRanges:[] });
    const [loading, updateLoading] = useState<boolean>(false);
    const [vizualizationData, updateVizData] = useState<ChartData>({});

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
        charts = appState.criterias.map((criteria, i) => {
            return mapCriteriaToChartComponent(criteria, vizualizationData, `${criteria.toString()}${i}`)
        })
    }

    console.log(vizualizationData);
    return (
        <Fragment>
            <h3>Customize Your Search</h3>
            <JiraQueryBuilderForm callback={updateAppState} />
            {loading ? 'LOADING...' : charts}
        </Fragment>
    );
}

function mapCriteriaToChartComponent(criteria: Criterias, data: ChartData, key: string): JSX.Element {
    switch (criteria) {
        case Criterias.EstimationAccuracy:
            return <EstimationAccuracy data={data} key={key} />
        case Criterias.TaskCountFailedCodeReview:
            return <TaskCountFailedCodeReview data={data} key={key} />
        case Criterias.TaskCountFailedQA:
            return <TaskCountFailedQA data={data} key={key} />
        case Criterias.TasksCompleted:
            return <TasksCompleted data={data} key={key} />
        case Criterias.TimeLogged:
            return <TimeLogged data={data} key={key} />
        case Criterias.TotalFailedCodeReview:
            return <TotalFailedCodeReview data={data} key={key} />
        case Criterias.TotalFailedDeployment:
            return <TotalFailedDeployment data={data} key={key} />
        case Criterias.TotalFailedQA:
            return <TotalFailedQA data={data} key={key} />
        case Criterias.Velocity:
            return <Velocity data={data} key={key} />
        default:
            return null;
    }
}
