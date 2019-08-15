import React from 'react';
import * as d3 from 'd3';
interface TasksCompletedProps {
    data: number;
}

export const TasksCompleted: React.FC<TasksCompletedProps> = ({ data }) => {

    return (
        <div>
            <p>Total Tasks: {data}</p>
        </div>
    );
};
