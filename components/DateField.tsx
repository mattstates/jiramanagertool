import React from 'react';
import { FormAction } from '../actions/FormAction.ts';
import { FormActionTypes } from '../enums/formActionTypes.ts';

interface DateFieldProps {
    value: string;
    dispatch: React.Dispatch<FormAction>;
    formAction: FormActionTypes;
    fieldId: string;
    fieldName: string;
}

export const DateField: React.FC<DateFieldProps> = ({ value, dispatch, formAction, fieldId, fieldName }) => {
    return (
        <React.Fragment>
            <label htmlFor={fieldId}>{fieldName}</label>
            <input
                id={fieldId}
                type="date"
                value={value}
                onChange={(e) => {
                    dispatch({ type: formAction, payload: { date: e.target.value } });
                }}
            />
        </React.Fragment>
    );
};
