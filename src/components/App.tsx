import '../styles/reset.scss';
import './App.scss';
import { ChartData } from '../types/ChartTypes';
import { Criterias } from '../enums/Criterias';
import { format } from 'date-fns';
import { JiraQueryBuilderForm } from './JiraQueryBuilderForm';
import { JiraResponse } from '../types/JiraTypes';
import { Loader } from './Loader';
import { YYYY_MM_DD } from '../constants/dateFormats';
import getJiraResponseData from '../utils/getJiraResponseData';
import mapCriteriaToChartComponent from '../utils/mapCriteriaToChartComponent';
import React, { useEffect, useState } from 'react';

export interface IAppState {
    assignee: string;
    criterias: Array<Criterias>;
    dateRanges: Array<[Date, Date]>;
}

export function App() {
    const [appState, updateAppState] = useState<IAppState>({
        assignee: '',
        criterias: [],
        dateRanges: [],
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

            const formattedData: ChartData = appState.dateRanges.reduce((hash: ChartData, dateRange, i): ChartData => {
                // Not sure why TypeScript doesn't want to accept .reduce without an initial value param.
                hash[format(dateRange[1], YYYY_MM_DD)] = responseData[i].reduce<JiraResponse>(
                    (responseAccumlator, jiraResponse): JiraResponse => {
                        return {
                            ...responseAccumlator,
                            issues: [...responseAccumlator.issues, ...jiraResponse.issues],
                        };
                    },
                    {
                        expand: '',
                        issues: [],
                        maxResults: 0,
                        startAt: 0,
                        total: 0,
                    }
                );
                return hash;
            }, {});

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
                key: `${criteria.toString()}${i}`,
            });
        });
    }

    return (
        <>
            <h3>Customize Your Search</h3>
            <JiraQueryBuilderForm dispatchSetState={updateAppState} />
            {loading ? <Loader /> : charts}
        </>
    );
}
