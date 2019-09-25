import './DateField.scss';
import { FormActionTypes } from '../enums/FormActionTypes';
import { IFormAction } from '../actions/FormAction';
import React from 'react';

interface DateFieldProps {
    dispatch: React.Dispatch<IFormAction>;
    fieldId: string;
    fieldName: string;
    formAction: FormActionTypes;
    value: string;
}

export const DateField: React.FC<DateFieldProps> = ({
    dispatch,
    fieldId,
    fieldName,
    formAction,
    value
}) => {
    return (
        <div className="dateInput">
            <label htmlFor={fieldId}>{fieldName}:</label>
            <input
                id={fieldId}
                type="date"
                value={value}
                onChange={e => {
                    dispatch({ type: formAction, payload: { date: e.target.value } });
                }}
            />
        </div>
    );
};
