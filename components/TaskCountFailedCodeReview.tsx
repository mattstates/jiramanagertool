import React from 'react';

interface TaskCountFailedCodeReviewProps {
    data: string;
}

export const TaskCountFailedCodeReview: React.FC<TaskCountFailedCodeReviewProps> = ({ data }) => {
    return (
        <div>
            <p>Percent Failed Code Review: {data}%</p>
        </div>
    );
};
