import React, { Fragment, useEffect, useState } from 'react';
import { Criterias } from '../enums/criterias.ts';
import { urlBuilder } from '../secrets.ts';
import './App.scss';
import { JiraQueryBuilderForm } from './JiraQueryBuilderForm.tsx';

export interface AppState {
    assignee: string;
    dateRanges: Array<[string, string]>;
    criterias: Array<Criterias>;
}

export function App() {
    const [appState, updateAppState] = useState<AppState>({ assignee: '', dateRanges: [], criterias: [] });
    const [vizData, updateVizData] = useState<any>([]);
    const [loading, updateLoading] = useState<boolean>(false);

    console.log(vizData, '<--- vizData');
    // const results = appState.dateRanges.map((dateRange, i) => {
    //     console.log(appState.criterias)
    //     return <Result allowedCriterias={appState.criterias} url={urlBuilder(appState.assignee, dateRange[0], dateRange[1])} fromDate={dateRange[0]} endDate={dateRange[1]} key={dateRange.join('')} />
    // })
    useEffect(() => {
        updateLoading(true);
        console.log('effect');
        updateVizData([]);

        const data: any[] = [];
        const promises = appState.dateRanges.map((dateRange) => {
            return fetch(urlBuilder(appState.assignee, dateRange[0], dateRange[1]))
                .then((response) => response.json())
                .then((json) => {
                    console.log('effect end');
                    return json;
                });
        });

        Promise.all(promises)
            .then((results) => {
                results.forEach((result) => {
                    console.log(vizData, result, '<-- before update');
                    // updateVizData([...vizData, result])
                    data.push(result);
                });
                console.log(appState.dateRanges)
                console.log(data, '<-- ALL DATA')

                const formattedData: { [key: string]: any } = appState.dateRanges.reduce((hash: { [key: string]: any }, dateRange, i) => {
                     hash[dateRange[1]] = data[i];
                     return hash;
                }, {})

                updateVizData(formattedData);
                updateLoading(false);
            })
            .catch((err) => {
                updateLoading(false);
            });
    }, [appState.dateRanges, appState.assignee, appState.criterias]);

    //TODO: Loop through an array of urls and map them to a Result element...
    return (
        <Fragment>
            <p>Customize Your Search</p>
            <JiraQueryBuilderForm callback={updateAppState} />
            {loading ? 'LOADING...' : ''}
            {/* {results} */}
        </Fragment>
    );
}
