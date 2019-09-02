import React, { Fragment, useEffect, useState } from 'react';
import { Criterias } from '../enums/criterias.ts';
import { urlBuilder } from '../secrets.ts';
import './App.scss';
import { EstimationAccuracy } from './charts/EstimationAccuracy.tsx';
import { TaskCountFailedCodeReview } from './charts/TaskCountFailedCodeReview.tsx';
import { TaskCountFailedQA } from './charts/TaskCountFailedQA.tsx';
import { TasksCompleted } from './charts/TasksCompleted.tsx';
import { TimeLogged } from './charts/TimeLogged.tsx';
import { TotalFailedCodeReview } from './charts/TotalFailedCodeReview.tsx';
import { TotalFailedDeployment } from './charts/TotalFailedDeployment.tsx';
import { TotalFailedQA } from './charts/TotalFailedQA.tsx';
import { Velocity } from './charts/Velocity.tsx';
import { JiraQueryBuilderForm } from './JiraQueryBuilderForm.tsx';

export interface IAppState {
    assignee: string;
    dateRanges: Array<[string, string]>;
    criterias: Array<Criterias>;
}

export function App() {
    const [appState, updateAppState] = useState < IAppState > ({ assignee: '', dateRanges: [], criterias: [] });
    const [vizData, updateVizData] = useState < any > ([]);
    const [loading, updateLoading] = useState < boolean > (false);

    console.log(vizData, '<--- vizData');

    useEffect(() => {
        updateLoading(true);
        updateVizData([]);

        const data: any[] = [];
        const promises = appState.dateRanges.map((dateRange) => {
            return fetch(urlBuilder(appState.assignee, dateRange[0], dateRange[1]))
                .then((response) => response.json())
                .then((json) => {
                    return json;
                });
        });

        Promise.all(promises)
            .then((results) => {
                results.forEach((result) => {
                    data.push(result);
                });

                const formattedData: { [key: string]: any } = appState.dateRanges.reduce((hash: { [key: string]: any }, dateRange, i) => {
                    hash[dateRange[1]] = data[i];
                    return hash;
                }, {});

                updateVizData(formattedData);
                updateLoading(false);
            })
            .catch((err) => {
                updateLoading(false);
            });
    }, [appState.dateRanges, appState.assignee, appState.criterias]);

    //TODO: Loop through an array of urls and map them to a Result element...
    const isVisDataAvailable = Object.keys(vizData).length > 0;

    return (
        <Fragment>
            <p>Customize Your Search</p>
            <JiraQueryBuilderForm callback={updateAppState} />
            {loading ? 'LOADING...' : ''}
            {!loading && renderCriteria(Criterias.TasksCompleted, appState.criterias) && isVisDataAvailable && <TasksCompleted data={vizData} />}
            {!loading && renderCriteria(Criterias.TimeLogged, appState.criterias) && isVisDataAvailable && <TimeLogged data={vizData} />}
            {!loading && renderCriteria(Criterias.Velocity, appState.criterias) && isVisDataAvailable && <Velocity data={vizData} />}

            {!loading && renderCriteria(Criterias.TotalFailedDeployment, appState.criterias) && isVisDataAvailable && <TotalFailedDeployment data={vizData} />}

            {!loading && renderCriteria(Criterias.TaskCountFailedQA, appState.criterias) && isVisDataAvailable && <TaskCountFailedQA data={vizData} />}
            {!loading && renderCriteria(Criterias.TotalFailedQA, appState.criterias) && isVisDataAvailable && <TotalFailedQA data={vizData} />}

            {!loading && renderCriteria(Criterias.TaskCountFailedCodeReview, appState.criterias) && isVisDataAvailable && (
                <TaskCountFailedCodeReview data={vizData} />
            )}
            {!loading && renderCriteria(Criterias.TotalFailedCodeReview, appState.criterias) && isVisDataAvailable && <TotalFailedCodeReview data={vizData} />}
            {!loading && renderCriteria(Criterias.EstimationAccuracy, appState.criterias) && isVisDataAvailable && <EstimationAccuracy data={vizData} />}
        </Fragment>
    );
}

function renderCriteria(criteriaToShow: Criterias, allowedCriterias: Criterias[]) {
    return allowedCriterias.indexOf(criteriaToShow) > -1;
}
