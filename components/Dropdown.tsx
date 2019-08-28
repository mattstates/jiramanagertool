import React from 'react';
import { useFetch } from '../hooks/useFetch.tsx';
import { jiraApiUrlAutocomplete } from '../secrets.ts';
import './Dropdown.scss';

// function getMatchingKey(inputString: string): string[] {
//     const delimiter = '~|~';
//     const matchWhiteSpaceNotInQuotes = /\s+(?=((\\[\\"]|[^\\"])*"(\\[\\"]|[^\\"])*")*(\\[\\"]|[^\\"])*$)/g;

//     const collection = inputString.replace(matchWhiteSpaceNotInQuotes, delimiter).split(delimiter);
//     return collection;
// }

interface DropdownProps {
    searchTerm: string;
    updateAssignee: React.Dispatch<any>;
    showDropdown: boolean;
}

// TODO: Support comma separated assignee autocomplete.

export const Dropdown: React.FC<DropdownProps> = ({ searchTerm, showDropdown, updateAssignee }) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const data = useFetch(lowerCaseSearchTerm.length ? jiraApiUrlAutocomplete + lowerCaseSearchTerm : '');

    if (data.results && !data.results.every((item: { value: string }) => item.value.toLowerCase() === lowerCaseSearchTerm)) {
        return (
            <ul className="dropdownList">
                {data.results.map((item: any) => (
                    <li
                        key={item.value}
                        onClick={() => {
                            updateAssignee(item.value);
                        }}>
                        {item.value}
                    </li>
                ))}
            </ul>
        );
    }
    return <div />;
};
