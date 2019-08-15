import React from 'react';

interface TaskCountFailedQAProps {
    data: string;
}

export const TaskCountFailedQA: React.FC<TaskCountFailedQAProps> = ({ data }) => {
    return (
        <div>
            <p>Percent Failed QA: {data}%</p>
        </div>
    );
};
