import React from 'react';
import { FormAction } from '../actions/FormAction.ts';
import { FormActionTypes } from '../enums/formActionTypes.ts';

interface InputProps {
    value: string;
    dispatch: React.Dispatch<FormAction>;
}

// TODO: Set up Atlassian Autocomplete to suggest usernames as the user types.

export const Input: React.FC<InputProps> = ({ value, dispatch }) => {
    const inputId = 'assigneeField';
    return (
        <React.Fragment>
            <label htmlFor={inputId}>Assignee:</label>
            <input
                id={inputId}
                type="text"
                value={value}
                onChange={(e) => {
                    dispatch({ type: FormActionTypes.UpdateAssignee, payload: { assignee: e.target.value } });
                }}
            />
        </React.Fragment>
    );
};
