import './JiraQueryBuilderForm.scss';
import { addMonths } from 'date-fns';
import { CheckBox } from './CheckBox';
import { Criterias } from '../enums/Criterias';
import { DateField } from './DateField';
import { DateIntervals } from './DateIntervals';
import { DateRanges } from '../enums/DateRanges';
import { FormActionTypes } from '../enums/FormActionTypes';
import { getDateRanges } from '../utils/getDateRanges';
import { IAppState } from './App';
import { IFormAction } from '../actions/FormAction';
import { SearchInput } from './SearchInput';
import React, { Dispatch, SetStateAction, useReducer } from 'react';

interface IFormProps {
    callback: Dispatch<SetStateAction<IAppState>>;
}

interface IFormState {
    assignee: string;
    checkedCriterias: CheckedCriteriaMap;
    endDate: string;
    fromDate: string;
    interval: DateRanges;
    intervalCount: number;
}

type CheckedCriteriaMap = {
    [criteriaName: string]: boolean;
};

const currentDate: Date = new Date();

const initialFormState: IFormState = {
    // Setting the default to have all boxes selected.
    checkedCriterias: Object.values(Criterias).reduce(
        (map: CheckedCriteriaMap, criteria: string) => {
            map[criteria] = true;
            return map;
        },
        {}
    ),
    assignee: '',
    fromDate: addMonths(currentDate, -12)
        .toISOString()
        .split('T')[0],
    endDate: `${currentDate.toISOString().split('T')[0]}`,
    interval: DateRanges.Months,
    intervalCount: 1
};

function formReducer(state: IFormState, action: IFormAction): IFormState {
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
        case FormActionTypes.UpdateInterval:
            return { ...state, interval: action.payload.interval };
        case FormActionTypes.UpdateIntervalCount:
            return { ...state, intervalCount: action.payload.intervalCount };
        default:
            return { ...state };
    }
}

export const JiraQueryBuilderForm: React.FC<IFormProps> = ({ callback }) => {
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    const formId = 'JiraQueryBuilder';

    function submitHandler(event: React.SyntheticEvent): void {
        event.preventDefault();

        const criterias: Criterias[] = Object.entries(formState.checkedCriterias).reduce(
            (criteriasCollection: Criterias[], keyValTuple: [string, boolean]): Criterias[] => {
                if (!keyValTuple[1]) {
                    return criteriasCollection;
                }

                // TODO: Fix this. It is hacky and makes it so that the key and value must be equal.
                const typedCriteria = keyValTuple[0].replace(/\s/gi, '') as keyof typeof Criterias;

                return [...criteriasCollection, Criterias[typedCriteria]];
            },
            []
        );

        callback({
            assignee: formState.assignee,
            criterias,
            dateRanges: getDateRanges(
                formState.fromDate,
                formState.endDate,
                formState.interval,
                formState.intervalCount
            )
        });
    }

    const checkBoxes = Object.values(Criterias).map(
        (criteria: string, i: number): JSX.Element => {
            const isChecked = formState.checkedCriterias[criteria]
                ? formState.checkedCriterias[criteria]
                : false;

            const id = `${criteria}${i}`;
            return (
                <CheckBox
                    id={id}
                    isChecked={isChecked}
                    key={id}
                    criteria={criteria}
                    dispatch={dispatch}
                />
            );
        }
    );

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
            <DateIntervals
                name="dateIntervals"
                dateRanges={Object.values(DateRanges)}
                interval={formState.interval}
                intervalCount={formState.intervalCount}
                dispatch={dispatch}
            />

            <button type="submit">Submit</button>
        </form>
    );
};
