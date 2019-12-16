import { AverageOriginalEstimate } from '../components/charts/AverageOriginalEstimate';
import { ChartData } from '../types/ChartTypes';
import { Criterias } from '../enums/Criterias';
import { EstimationAccuracy } from '../components/charts/EstimationAccuracy';
import { TaskCountFailedCodeReview } from '../components/charts/TaskCountFailedCodeReview';
import { TaskCountFailedQA } from '../components/charts/TaskCountFailedQA';
import { TasksCompleted } from '../components/charts/TasksCompleted';
import { TaskVelocity } from '../components/charts/TaskVelocity';
import { TimeLogged } from '../components/charts/TimeLogged';
import { TimeLoggedUnestimated } from '../components/charts/TimeLoggedUnestimated';
import { TimeLoggedUnestimatedPercentage } from '../components/charts/TimeLoggedUnestimatedPercentage';
import { TimeVelocity } from '../components/charts/TimeVelocity';
import { TotalFailedCodeReview } from '../components/charts/TotalFailedCodeReview';
import { TotalFailedDeployment } from '../components/charts/TotalFailedDeployment';
import { TotalFailedQA } from '../components/charts/TotalFailedQA';
import { TotalTimeOriginalEstimate } from '../components/charts/TotalTimeOriginalEstimate';
import React from 'react';

export default function mapCriteriaToChartComponent({
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
        case Criterias.TimeLoggedUnestimated:
            return <TimeLoggedUnestimated data={data} key={key} />;
        case Criterias.TimeLoggedUnestimatedPercentage:
            return <TimeLoggedUnestimatedPercentage data={data} key={key} />;
    }
}
