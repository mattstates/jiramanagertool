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
    checkedCriterias: setAllCheckBoxesToBoolean(true),
    assignee: '',
    fromDate: addMonths(currentDate, -12)
        .toISOString()
        .split('T')[0],
    endDate: `${currentDate.toISOString().split('T')[0]}`,
    interval: DateRanges.Months,
    intervalCount: 1
};

function setAllCheckBoxesToBoolean(flag: boolean = false) {
    return Object.values(Criterias).reduce((map: CheckedCriteriaMap, criteria: string) => {
        map[criteria] = flag;
        return map;
    }, {});
}

function formReducer(state: IFormState, action: IFormAction): IFormState {
    switch (action.type) {
        case FormActionTypes.UpdateCheckBoxes:
            const updatedCheckedCriterias = {
                ...state.checkedCriterias
            };
            updatedCheckedCriterias[action.payload.criteria] = action.payload.isChecked;
            return { ...state, checkedCriterias: updatedCheckedCriterias };
        case FormActionTypes.ClearCheckBoxes:
            return { ...state, checkedCriterias: setAllCheckBoxesToBoolean(false) };
        case FormActionTypes.CheckAll:
            return { ...state, checkedCriterias: setAllCheckBoxesToBoolean(true) };
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
                new Date(formState.fromDate),
                new Date(formState.endDate),
                formState.interval,
                formState.intervalCount
            )
        });
    }

    function checkAllHandler(event: React.SyntheticEvent): void {
        event.preventDefault();
        dispatch({ type: FormActionTypes.CheckAll, payload: null });
    }
    function clearHandler(event: React.SyntheticEvent): void {
        event.preventDefault();
        dispatch({ type: FormActionTypes.ClearCheckBoxes, payload: null });
    }

    const checkBoxes = Object.values(Criterias).map(
        (criteria: string, i: number): JSX.Element => {
            const isChecked = formState.checkedCriterias[criteria] ? formState.checkedCriterias[criteria] : false;

            const id = `${criteria}${i}`;
            return <CheckBox id={id} isChecked={isChecked} key={id} criteria={criteria} dispatch={dispatch} />;
        }
    );

    return (
        <form id={formId} onSubmit={submitHandler} autoComplete={'off'}>
            <SearchInput value={formState.assignee} dispatch={dispatch} />

            <p>Criterias:</p>
            <div className="checkboxes">{checkBoxes}</div>
            <button className="small" onClick={checkAllHandler}>
                Check All
            </button>
            <button className="small" onClick={clearHandler}>
                Clear
            </button>

            <div className="dateFields">
                <DateField
                    dispatch={dispatch}
                    fieldId={'fromDateField'}
                    fieldName={'From Date'}
                    formAction={FormActionTypes.UpdateFromDate}
                    value={formState.fromDate}
                />

                <DateField
                    dispatch={dispatch}
                    fieldId={'endDateField'}
                    fieldName={'End Date'}
                    formAction={FormActionTypes.UpdateEndDate}
                    value={formState.endDate}
                />
            </div>
            <DateIntervals
                dateRanges={Object.values(DateRanges)}
                dispatch={dispatch}
                interval={formState.interval}
                intervalCount={formState.intervalCount}
                name="dateIntervals"
            />

            <button
                className={
                    Object.values(formState.checkedCriterias).filter(Boolean).length === 0 ||
                    formState.assignee?.length < 3
                        ? 'disabled'
                        : ''
                }
                type="submit"
            >
                Submit
            </button>
        </form>
    );
};
