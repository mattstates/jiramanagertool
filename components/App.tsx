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

        const data: JiraResponse[] = [];
        const promises = appState.dateRanges.map(dateRange => {
            return fetch(urlBuilder(appState.assignee, dateRange[0], dateRange[1]))
                .then(response => response.json())
                .then((json: JiraResponse) => {
                    return json;
                });
        });

        Promise.all(promises)
            .then(results => {
                results.forEach(result => {
                    data.push(result);
                });

                const formattedData: ChartData = appState.dateRanges.reduce(
                    (hash: ChartData, dateRange, i): ChartData => {
                        hash[dateRange[1]] = data[i];
                        return hash;
                    },
                    {}
                );

                updateVizData(formattedData);
                updateLoading(false);
            })
            .catch((error: { message: string }) => {
                console.log(error.message);
                updateLoading(false);
            });
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

    console.log(vizualizationData);
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
