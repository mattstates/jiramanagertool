import React from 'react';
import { FormAction } from '../actions/FormAction.ts';
import { FormActionTypes } from '../enums/formActionTypes.ts';

interface InputProps {
    value: string;
    dispatch: React.Dispatch<FormAction>;
}

export const Input: React.FC<InputProps> = ({ value, dispatch }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => {
                dispatch({ type: FormActionTypes.UpdateAssignee, payload: { assignee: e.target.value } });
            }}
        />
    );
};
