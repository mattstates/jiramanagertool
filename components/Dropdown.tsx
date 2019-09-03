import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { jiraApiUrlAutocomplete } from '../secrets';
import './Dropdown.scss';

// function getMatchingKey(inputString: string): string[] {
//     const delimiter = '~|~';
//     const matchWhiteSpaceNotInQuotes = /\s+(?=((\\[\\"]|[^\\"])*"(\\[\\"]|[^\\"])*")*(\\[\\"]|[^\\"])*$)/g;

//     const collection = inputString.replace(matchWhiteSpaceNotInQuotes, delimiter).split(delimiter);
//     return collection;
// }

interface DropdownProps {
    searchTerm: string;
    showDropdown: boolean;
    updateAssignee: React.Dispatch<string>;
}

// TODO: Support comma separated assignee autocomplete.

export const Dropdown: React.FC<DropdownProps> = ({ showDropdown, searchTerm, updateAssignee }) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const data = useFetch(lowerCaseSearchTerm.length ? jiraApiUrlAutocomplete + lowerCaseSearchTerm : '');

    if (data.results && !data.results.every((item: { value: string }) => item.value.toLowerCase() === lowerCaseSearchTerm)) {
        return (
            <ul className="dropdownList">
                {data.results.map((item: { value: string }) => (
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
