import React, { Dispatch, SetStateAction, useEffect, useReducer } from 'react';
import { FormAction } from '../actions/FormAction.ts';
import { Criterias } from '../enums/criterias.ts';
import { FormActionTypes } from '../enums/formActionTypes.ts';
// TODO: Refactor this function...
import { urlBuilder } from '../secrets.ts';
import { CheckBox } from './CheckBox.tsx';
import { DateField } from './DateField.tsx';
import { Input } from './Input.tsx';
import './JiraQueryBuilderForm.scss';

interface FormProps {
    callback: Dispatch<SetStateAction<string>>;
}

interface FormState {
    assignee: string;
    checkedCriterias: { [key: string]: boolean };
    fromDate: string;
    endDate: string;
}

const currentDate: string = new Date().toISOString().split('T')[0];

const initialFormState: FormState = {
    // Setting the default to have all boxes selected.
    checkedCriterias: Object.values(Criterias).reduce((hash: { [key: string]: boolean }, criteria: string) => {
        hash[criteria] = true;
        return hash;
    }, {}),
    assignee: '',
    fromDate: '',
    endDate: `${currentDate}`
};

function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case FormActionTypes.UpdateCheckBoxes:
            const updatedCheckedCriterias = {
                ...state.checkedCriterias
            };
            updatedCheckedCriterias[action.payload.criteria] = action.payload.isChecked;
            return { ...state, checkedCriterias: updatedCheckedCriterias };
        case FormActionTypes.UpdateAssignee:
            return { ...state, assignee: action.payload.assignee };
        case FormActionTypes.UpdateFromDate:
            return { ...state, fromDate: action.payload.date };
        case FormActionTypes.UpdateEndDate:
            return { ...state, endDate: action.payload.date };
        default:
            return { ...state };
    }
}

export const JiraQueryBuilderForm: React.FC<FormProps> = ({ callback }) => {
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    const formId = 'JiraQueryBuilder';

    useEffect(() => {
        //TODO: update list of preselected
    }, []);

    function submitHandler(event: React.SyntheticEvent): void {
        event.preventDefault();
        console.log(formState);
        callback(urlBuilder(formState));
    }

    const checkBoxes = Object.values(Criterias).map((criteria, i) => {
        const isChecked = formState.checkedCriterias[criteria] ? formState.checkedCriterias[criteria] : false;

        const id = `${criteria}${i}`;
        return <CheckBox id={id} isChecked={isChecked} key={id} criteria={criteria} dispatch={dispatch} />;
    });

    return (
        <form id={formId} onSubmit={submitHandler}>
            <Input value={formState.assignee} dispatch={dispatch} />
            <p>Criterias:</p>

            <div className="checkboxes">{checkBoxes}</div>

            <DateField
                dispatch={dispatch}
                value={formState.fromDate}
                formAction={FormActionTypes.UpdateFromDate}
                fieldId={'fromDateField'}
                fieldName={'From Date'}
            />
            <DateField
                dispatch={dispatch}
                value={formState.endDate}
                formAction={FormActionTypes.UpdateEndDate}
                fieldId={'endDateField'}
                fieldName={'End Date'}
            />

            <button type="submit">Submit</button>
        </form>
    );
};
