import React from 'react';

interface ResultProps {
    data: any[];
}

// TESTING JIRA RESPONSES
// TODO: Break each result into its own view and control it with the criteria checkboxes.
export const Result: React.FC<ResultProps> = ({ data }) => {
    console.log(data);
    // customfield_13380
    let tasksFailedCodeReview = 0;
    let numFailedCodeReview = 0;
    // customfield_13381
    let tasksFailedQa = 0;
    let numFailedQa = 0;
    data.forEach((task) => {
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
    return (
        data.length > 0 ?
        <div>
            <p>Percent Failed Code Review: {((tasksFailedCodeReview / data.length) * 100).toFixed(2)}%</p>
            <p>Total Times Failed Code Review: {numFailedCodeReview}</p>

            <p>Percent Failed QA: {((tasksFailedQa / data.length) * 100).toFixed(2)}%</p>
            <p>Total Times Failed QA: {numFailedQa}</p>

            <p>total tasks: {data.length}</p>
        </div>
        : <React.Fragment />
    );
};
