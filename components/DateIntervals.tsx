import React, { useState } from 'react';
import { DateRanges } from '../enums/DateRanges';

interface IDateIntervalsProps {
    dateRanges: string[];
    name: string;
    defaultDateRange: string;
}

export const DateIntervals: React.FC<IDateIntervalsProps> = ({ dateRanges, defaultDateRange, name }) => {
    const [selectedRange, updateSelectedRange] = useState<string>(defaultDateRange);

    const inputs = dateRanges.map((range: string): JSX.Element => {
        const key = `${name}${range}`;
        return (
            <div key={key}>
                <input onChange={(e) => {updateSelectedRange(e.target.value)}} type="radio" id={key} name={name} value={range} checked={range === selectedRange} />
                <label htmlFor={key}>{range}</label>
            </div>
        );
    });
    return <div>{inputs}</div>;
};
