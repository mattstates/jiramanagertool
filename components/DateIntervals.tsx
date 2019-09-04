import React from 'react';
import { DateRanges } from '../enums/DateRanges';
import { IFormAction } from '../actions/FormAction';
import { FormActionTypes } from '../enums/FormActionTypes';

interface IDateIntervalsProps {
    dateRanges: string[];
    name: string;
    dispatch: React.Dispatch<IFormAction>;
    intervalCount: number;
    interval: DateRanges;
}

export const DateIntervals: React.FC<IDateIntervalsProps> = ({ dateRanges, dispatch, name, interval, intervalCount }) => {


    const radioInputFields = dateRanges.map((range: string): JSX.Element => {
        const key = `${name}${range}`;
        return (
            <div key={key} className="intervalField">
                <input onChange={(e) => {
                    dispatch( {type: FormActionTypes.UpdateInterval, payload: { interval: e.target.value } } )
                }} type="radio" id={key} name={name} value={range} checked={range === interval.toString()} />
                <label htmlFor={key}>{range}</label>
            </div>
        );
    });

    return (
        <React.Fragment>
            <p className="formLabel">Choose Interval: {<em>{`(Every ${intervalCount} ${interval})`}</em>}</p>
            <div className="dateInterval">
                <input type="number" value={intervalCount} min={1} onChange={(e) => {
                    dispatch({type: FormActionTypes.UpdateIntervalCount, payload: { intervalCount: e.target.value } })
                }} />
                {radioInputFields}
            </div>
        </React.Fragment>
    );
};
