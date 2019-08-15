import React from 'react';
import { Criterias } from '../enums/criterias.ts';
import { useFetch } from '../hooks/useFetch.tsx';
import { TaskCountFailedCodeReview } from './TaskCountFailedCodeReview.tsx';
import { TaskCountFailedQA } from './TaskCountFailedQA.tsx';
import { TasksCompleted } from './TasksCompleted.tsx';
import { TotalFailedCodeReview } from './TotalFailedCodeReview.tsx';
import { TotalFailedQA } from './TotalFailedQA.tsx';

interface ResultProps {
    url: string;
    fromDate: string;
    endDate: string;
    allowedCriterias: Array<Criterias>;
}

// TESTING JIRA RESPONSES
// TODO: Break each result into its own view and control it with the criteria checkboxes.
export const Result: React.FC<ResultProps> = ({ url, fromDate, endDate, allowedCriterias }) => {
    const data = useFetch(url);
    console.log(data, '<----- RESULT')
    if (!data.issues) {
        return <React.Fragment />;
    }

    // customfield_13380
    let tasksFailedCodeReview = 0;
    let numFailedCodeReview = 0;

    // customfield_13381
    let tasksFailedQa = 0;
    let numFailedQa = 0;

    data.issues.forEach((task: any) => {
        const { fields } = task;
        if (fields.customfield_13380) {
            tasksFailedCodeReview += 1;
            numFailedCodeReview += fields.customfield_13380;
        }
        if (fields.customfield_13381) {
            tasksFailedQa += 1;
            numFailedQa += fields.customfield_13381;
        }
    });

    return data.issues.length > 0 ? (
        <div>
            <h2>from {fromDate} to {endDate}</h2>
            {allowedCriterias.includes(Criterias.TaskCountFailedQA) && <TaskCountFailedQA data={((tasksFailedQa / data.issues.length) * 100).toFixed(2)} />}
            <TotalFailedQA data={numFailedQa} />

            <TaskCountFailedCodeReview data={((tasksFailedCodeReview / data.issues.length) * 100).toFixed(2)} />
            <TotalFailedCodeReview data={numFailedCodeReview} />

            <TasksCompleted data={data.issues.length} />
        </div>
    ) : (
        <React.Fragment />
    );
};
