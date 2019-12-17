import './Dropdown.scss';
import { hostName, jiraApiAutocompleteEndpoint, jiraBaseApiEndpoint } from '../init';
import { JiraAutocompleteIdentity } from '../types/JiraTypes';
import { useFetch } from '../hooks/useFetch';
import React, { useState, useEffect } from 'react';

const START_AUTOCOMPLETE_CHAR_THRESHOLD = 2;

const AUTOCOMPLETE_API =
    hostName + jiraBaseApiEndpoint + jiraApiAutocompleteEndpoint + '?fieldName=assignee&fieldValue=';

interface DropdownProps {
    parentRef: React.MutableRefObject<any>;
    searchString: string;
    ulRef: React.MutableRefObject<any>;
    updateAssignee: React.Dispatch<string>;
}

type AutoCompleteResponseData = { results: JiraAutocompleteIdentity[] };

function convertSearchStringToCollection(input: string): string[] {
    return input.split(',').map((term: string): string => term.trim());
}

function replaceLastItem<T>(collection: T[], item: T): T[] {
    return [...collection.slice(0, collection.length - 1), item];
}

// TODO: Refactor
export const Dropdown: React.FC<DropdownProps> = ({ parentRef, searchString, ulRef, updateAssignee }) => {
    const [activeIndex, udpateActiveIndex] = useState<number>(null);

    let searchCollection = convertSearchStringToCollection(searchString);

    const lowerCaseSearchTerm = searchCollection[searchCollection.length - 1].toLowerCase();

    const data = useFetch<AutoCompleteResponseData>(
        lowerCaseSearchTerm.length > START_AUTOCOMPLETE_CHAR_THRESHOLD ? AUTOCOMPLETE_API + lowerCaseSearchTerm : ''
    );

    useEffect(() => {
        if (activeIndex === -1) {
            parentRef.current.focus();
        }
    }, [activeIndex]);

    function handleKeyUp(e: React.KeyboardEvent): void {
        const maxActiveIndex = data && data.results && data.results.length - 1;

        let newIndex: number;
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                newIndex = activeIndex - 1;
                udpateActiveIndex(newIndex < -1 ? -1 : newIndex);
                break;
            case 'ArrowDown':
                e.preventDefault();
                newIndex = activeIndex === null ? 0 : activeIndex + 1;
                udpateActiveIndex(newIndex > maxActiveIndex ? maxActiveIndex : newIndex);
                break;
            case 'Enter':
                e.preventDefault();
                e.stopPropagation();
                dispatchUpdate();
                break;
        }
    }

    function handleKeyDown(e: React.KeyboardEvent): void {
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                break;
            case 'ArrowDown':
                e.preventDefault();
                break;
        }
    }

    function dispatchUpdate(): void {
        updateAssignee(searchCollection.join(', ').trim());
        udpateActiveIndex(null);
        parentRef.current.focus();
    }

    if (
        lowerCaseSearchTerm.length > 2 &&
        data &&
        data.results &&
        data.results.length &&
        !data.results.some((item: JiraAutocompleteIdentity): boolean => {
            return item.value.toLowerCase() === lowerCaseSearchTerm;
        })
    ) {
        return (
            <ul
                ref={ulRef}
                className="dropdownList"
                tabIndex={0}
                onKeyUp={(e: React.KeyboardEvent) => {
                    handleKeyUp(e);
                }}
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyDown}
                onFocus={() => {
                    udpateActiveIndex(0);
                }}
                onBlur={() => {
                    udpateActiveIndex(null);
                }}
            >
                {data.results.map((item: JiraAutocompleteIdentity, i: number) => {
                    const html = { __html: `<span>${item.displayName}</span>` };
                    if (i === activeIndex) {
                        searchCollection = replaceLastItem(searchCollection, item.value);
                    }

                    return (
                        <li
                            className={i === activeIndex ? 'active' : ''}
                            key={item.value}
                            onClick={() => {
                                searchCollection = replaceLastItem(searchCollection, item.value);
                                dispatchUpdate();
                            }}
                            dangerouslySetInnerHTML={html}
                        />
                    );
                })}
            </ul>
        );
    }
    return <div />;
};
