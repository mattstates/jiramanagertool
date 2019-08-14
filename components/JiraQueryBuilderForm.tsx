import React, { Dispatch, SetStateAction, useEffect, useReducer } from 'react';
import { FormAction } from '../actions/FormAction.ts';
import { Criterias } from '../enums/criterias.ts';
import { FormActionTypes } from '../enums/formActionTypes.ts';
import { CheckBox } from './CheckBox.tsx';
import { Input } from './Input.tsx';
import './JiraQueryBuilderForm.scss';

interface FormProps {
    callback: Dispatch<SetStateAction<string>>;
}

interface FormState {
    assignee: string;
    checkedCriterias: { [key: string]: boolean };
}

const initialFormState: FormState = {
    // Setting the default to have all boxes selected.
    checkedCriterias: Object.values(Criterias).reduce((hash: { [key: string]: boolean }, criteria: string) => {
        hash[criteria] = true;
        return hash;
    }, {}),
    assignee: ''
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
    }

    const checkBoxes = Object.values(Criterias).map((criteria, i) => {
        const isChecked = formState.checkedCriterias[criteria] ? formState.checkedCriterias[criteria] : false;

        const id = `${criteria}${i}`;
        return <CheckBox id={id} isChecked={isChecked} key={id} criteria={criteria} dispatch={dispatch} />;
    });

    return (
        <form id={formId} onSubmit={submitHandler}>
            <Input value={formState.assignee} dispatch={dispatch} />
            <div className="checkboxes">{checkBoxes}</div>
            {/* <Dropdown labelName={formId} collection={Object.values(Criterias)} form={formId} /> */}
            <button type="submit">Submit</button>
        </form>
    );
};
