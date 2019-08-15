import React from 'react';

interface TotalFailedCodeReviewProps {
    data: number;
}

export const TotalFailedCodeReview: React.FC<TotalFailedCodeReviewProps> = ({ data }) => {
    return (
        <div>
            <p>Total Times Failed Code Review: {data}</p>
        </div>
    );
};
