import { DateRanges } from '../enums/DateRanges';
import { FormActionTypes } from '../enums/FormActionTypes';
import { IFormAction } from '../actions/FormAction';
import React from 'react';

interface IDateIntervalsProps {
    dateRanges: string[];
    dispatch: React.Dispatch<IFormAction>;
    interval: DateRanges;
    intervalCount: number;
    name: string;
}

export const DateIntervals: React.FC<IDateIntervalsProps> = ({
    dateRanges,
    dispatch,
    interval,
    intervalCount,
    name
}) => {
    const radioInputFields = dateRanges.map(
        (range: string): JSX.Element => {
            const reactKey = `${name}${range}`;
            return (
                <div key={reactKey} className="intervalField">
                    <input
                        onChange={e => {
                            dispatch({
                                type: FormActionTypes.UpdateInterval,
                                payload: { interval: e.target.value }
                            });
                        }}
                        type="radio"
                        id={reactKey}
                        name={name}
                        value={range}
                        checked={range === interval.toString()}
                    />
                    <label htmlFor={reactKey}>{range}</label>
                </div>
            );
        }
    );

    return (
        <>
            <p className="formLabel">Choose Interval: {<em>{`(Every ${intervalCount} ${interval})`}</em>}</p>
            <div className="dateInterval">
                <input
                    type="number"
                    value={intervalCount}
                    min={1}
                    onChange={e => {
                        dispatch({
                            type: FormActionTypes.UpdateIntervalCount,
                            payload: { intervalCount: e.target.value }
                        });
                    }}
                />
                {radioInputFields}
            </div>
        </>
    );
};
