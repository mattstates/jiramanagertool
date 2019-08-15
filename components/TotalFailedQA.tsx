import React from 'react';

interface TotalFailedQAProps {
    data: number;
}

export const TotalFailedQA: React.FC<TotalFailedQAProps> = ({ data }) => {
    return (
        <div>
            <p>Total Times Failed QA: {data}</p>
        </div>
    );
};
