import React from 'react';
import { IFormAction } from '../actions/FormAction.ts';
import { FormActionTypes } from '../enums/formActionTypes.ts';

interface CheckBoxProps {
    criteria: string;
    dispatch: React.Dispatch<IFormAction>;
    id: string;
    isChecked: boolean;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ criteria, dispatch, id, isChecked }) => {
    return (
        <div className="checkbox">
            <label htmlFor={id}>{criteria}</label>
            <input
                onChange={() => dispatch({ type: FormActionTypes.UpdateCheckBoxes, payload: { criteria, isChecked: !isChecked } })}
                checked={isChecked}
                type="checkbox"
                id={id}
            />
        </div>
    );
};
