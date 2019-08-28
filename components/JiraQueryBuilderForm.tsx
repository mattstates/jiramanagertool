import { addMonths } from 'date-fns';
import React, { Dispatch, SetStateAction, useReducer } from 'react';
import { IFormAction } from '../actions/FormAction.ts';
import { Criterias } from '../enums/criterias.ts';
import { FormActionTypes } from '../enums/formActionTypes.ts';
import { getDateRanges } from '../utils/dates.ts';
import { IAppState } from './App.tsx';
import { CheckBox } from './CheckBox.tsx';
import { DateField } from './DateField.tsx';
import './JiraQueryBuilderForm.scss';
import { SearchInput } from './SearchInput.tsx';

interface IFormProps {
    callback: Dispatch<SetStateAction<IAppState>>;
}

interface FormState {
    assignee: string;
    checkedCriterias: { [key: string]: boolean };
    fromDate: string;
    endDate: string;
}

const currentDate: Date = new Date();

const initialFormState: FormState = {
    // Setting the default to have all boxes selected.
    checkedCriterias: Object.values(Criterias).reduce((hash: { [key: string]: boolean }, criteria: string) => {
        hash[criteria] = true;
        return hash;
    }, {}),
    assignee: '',
    fromDate: addMonths(currentDate, -12)
        .toISOString()
        .split('T')[0],
    endDate: `${currentDate.toISOString().split('T')[0]}`
};

function formReducer(state: FormState, action: IFormAction): FormState {
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

export const JiraQueryBuilderForm: React.FC<IFormProps> = ({ callback }) => {
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    const formId = 'JiraQueryBuilder';

    function submitHandler(event: React.SyntheticEvent): void {
        event.preventDefault();

        const criterias = Object.entries(formState.checkedCriterias).reduce((criteriasCollection, keyValTuple) => {
            if (!keyValTuple[1]) {
                return criteriasCollection;
            }

            const typedCriteria = keyValTuple[0].replace(/\s/gi, '') as keyof typeof Criterias;

            return [...criteriasCollection, Criterias[typedCriteria]];
        }, []);

        callback({ assignee: formState.assignee, dateRanges: getDateRanges(formState.fromDate, formState.endDate), criterias });
    }

    const checkBoxes = Object.values(Criterias).map((criteria, i) => {
        const isChecked = formState.checkedCriterias[criteria] ? formState.checkedCriterias[criteria] : false;

        const id = `${criteria}${i}`;
        return <CheckBox id={id} isChecked={isChecked} key={id} criteria={criteria} dispatch={dispatch} />;
    });

    return (
        <form id={formId} onSubmit={submitHandler} autoComplete={'off'}>
            <SearchInput value={formState.assignee} dispatch={dispatch} />

            <p>Criterias:</p>
            <div className="checkboxes">{checkBoxes}</div>

            <div className="dateFields">
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
            </div>

            <button type="submit">Submit</button>
            <p>
                <sup>*Will return data in one month intervals.</sup>
            </p>
        </form>
    );
};
