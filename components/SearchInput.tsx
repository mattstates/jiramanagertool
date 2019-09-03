import React, { useEffect, useRef, useState } from 'react';
import { IFormAction } from '../actions/FormAction.ts';
import { FormActionTypes } from '../enums/FormActionTypes.ts';
import { Dropdown } from './Dropdown.tsx';
import './SearchInput.scss';

const INPUT_ID = 'assigneeField';

interface InputProps {
    dispatch: React.Dispatch<IFormAction>;
    value: string;
}

// TODO: Set up Atlassian Autocomplete to suggest usernames as the user types.

export const SearchInput: React.FC<InputProps> = ({ dispatch, value }) => {
    const inputRef = useRef(null);
    const [showDropdown, updateShowDropdown] = useState<boolean>(true);

    useEffect(() => {
        inputRef.current.focus();
        return () => {
            inputRef.current.blur();
        }
    }, []);

    function updateAssignee (assignee: string): void {
        dispatch({ type: FormActionTypes.UpdateAssignee, payload: { assignee } });
    }

    return (
        <div className="searchInput">
            <label htmlFor={INPUT_ID}>Assignee:</label>
            <input
                id={INPUT_ID}
                type="text"
                value={value}
                onChange={(e) => {
                    updateAssignee(e.target.value)
                    updateShowDropdown(Boolean(e.target.value));
                }}
                ref={inputRef}
                onFocus={() => {
                    updateShowDropdown(Boolean(value));
                }}
                onBlur={() => {
                    updateShowDropdown(false);
                }}
            />
            <Dropdown showDropdown={showDropdown} searchTerm={value} updateAssignee={updateAssignee} />
        </div>
    );
};
