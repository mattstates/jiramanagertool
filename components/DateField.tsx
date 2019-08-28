import React from 'react';
import { IFormAction } from '../actions/FormAction.ts';
import { FormActionTypes } from '../enums/formActionTypes.ts';
import './DateField.scss';

interface DateFieldProps {
    value: string;
    dispatch: React.Dispatch<IFormAction>;
    formAction: FormActionTypes;
    fieldId: string;
    fieldName: string;
}

export const DateField: React.FC<DateFieldProps> = ({ value, dispatch, formAction, fieldId, fieldName }) => {
    return (
        <div className="dateInput">
            <label htmlFor={fieldId}>{fieldName}</label>
            <input
                id={fieldId}
                type="date"
                value={value}
                onChange={(e) => {
                    dispatch({ type: formAction, payload: { date: e.target.value } });
                }}
            />
        </div>
    );
};
