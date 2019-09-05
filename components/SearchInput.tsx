import React, { useEffect, useRef } from 'react';
import { IFormAction } from '../actions/FormAction';
import { FormActionTypes } from '../enums/FormActionTypes';
import { Dropdown } from './Dropdown';
import './SearchInput.scss';

const INPUT_ID = 'assigneeField';

interface InputProps {
    dispatch: React.Dispatch<IFormAction>;
    value: string;
}

// TODO: Set up Atlassian Autocomplete to suggest usernames as the user types.
export const SearchInput: React.FC<InputProps> = ({ dispatch, value }) => {
    const inputRef = useRef(null);
    const ulRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
        return () => {
            inputRef.current.blur();
        };
    }, []);

    function updateAssignee(assignee: string): void {
        dispatch({ type: FormActionTypes.UpdateAssignee, payload: { assignee } });
    }

    return (
        <div className="searchInput">
            <label htmlFor={INPUT_ID}>Assignee:</label>
            <input
                id={INPUT_ID}
                type="text"
                value={value}
                onChange={e => {
                    updateAssignee(e.target.value);
                }}
                ref={inputRef}
                onKeyUp={(e: React.KeyboardEvent) => {
                    console.log(e.key);
                    if (e.key === 'ArrowDown') {
                        console.log(ulRef.current);
                        ulRef.current.focus();
                    }
                }}
            />
            <Dropdown
                searchString={value}
                updateAssignee={updateAssignee}
                parentRef={inputRef}
                ulRef={ulRef}
            />
        </div>
    );
};
