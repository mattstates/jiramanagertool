import React, { useEffect, useReducer } from 'react';
import { useFetch } from '../hooks/useFetch.tsx';
import { jiraApiUrlAutocomplete } from '../secrets.ts';
import './Dropdown.scss';


function getMatchingKey(inputString: string): string[] {
    const delimiter = '~|~';
    const matchWhiteSpaceNotInQuotes = /\s+(?=((\\[\\"]|[^\\"])*"(\\[\\"]|[^\\"])*")*(\\[\\"]|[^\\"])*$)/g;

    const collection = inputString.replace(matchWhiteSpaceNotInQuotes, delimiter).split(delimiter);
    return collection;
}

interface IDropdownState {
    dropdownListItems: string[];
    currentPredicate: string[];
    operatorsList: string[];
    jiraApiSuggestions: any;
}

interface DropdownProps {
    searchTerm: string;
    autocompleteData: any;
}

const initialState: IDropdownState = {
    dropdownListItems: [],
    currentPredicate: [],
    operatorsList: [],
    jiraApiSuggestions: {}
};

const ACTION_TYPES = {
    UPDATE_PREDICATE: 'UPDATE_PREDICATE',
    UPDATE_OPERATORS_LIST: 'UPDATE_OPERATORS_LIST',
    UPDATE_JIRA_API_SUGGESTIONS: 'UPDATE_JIRA_API_SUGGESTIONS',
    UPDATE_DROPDOWNLIST_ITEMS: 'UPDATE_DROPDOWNLIST_ITEMS'
};

function reducer(state: any, action: any): any {
    switch (action.type) {
        case ACTION_TYPES.UPDATE_PREDICATE: // eslint-disable-line no-case-declarations
            return { ...state, ...action.payload };
        case ACTION_TYPES.UPDATE_OPERATORS_LIST:
            return { ...state, operatorsList: action.payload };
        case ACTION_TYPES.UPDATE_JIRA_API_SUGGESTIONS:
            return { ...state, ...action.payload };
        case ACTION_TYPES.UPDATE_DROPDOWNLIST_ITEMS:
            return { ...state, ...action.payload };
        default:
            throw new Error();
    }
}

export const Dropdown: React.FC<DropdownProps> = ({ searchTerm, autocompleteData }) => {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const data = useFetch('');

/*
    useEffect(() => {
        const lastSearchStringItem = getMatchingKey(searchString.trim()).reverse()[0];
        const matchedPredicate = autoCompleteData.visibleFieldNames.find((item) => item.value.toLowerCase() === lastSearchStringItem.toLowerCase());

        let abortController;
        let signal;

        if (state.operatorsList.length) {
            abortController = new AbortController();
            signal = abortController.signal;
            fetch(
                `${jiraApiUrlAutocomplete}/suggestions?fieldName=${state.currentPredicate.value}&fieldValue=${lastSearchStringItem}`,
                getFetchOptions({ signal })
            )
                .then((res) => res.json())
                .then((json) => {
                    console.log(json, '<-- API SUGGESTIONS ---');
                    dispatch({
                        type: ACTION_TYPES.UPDATE_JIRA_API_SUGGESTIONS,
                        payload: { jiraApiSuggestions: json.results, dropdownListItems: json.results.map((item) => item.value) }
                    });
                })
                .catch(console.error);
        } else if (matchedPredicate) {
            dispatch({
                type: ACTION_TYPES.UPDATE_PREDICATE,
                payload: {
                    currentPredicate: matchedPredicate,
                    operatorsList: matchedPredicate.operators,
                    dropdownListItems: matchedPredicate.operators
                }
            });
        } else {
            const dropdownListItems = autoCompleteData.visibleFieldNames
                .filter((item) => {
                    return item.displayName.match(new RegExp(lastSearchStringItem, 'i')) !== null;
                })
                .slice(0, 10)
                .map((item) => item.displayName);
            dispatch({
                type: ACTION_TYPES.UPDATE_DROPDOWNLIST_ITEMS,
                payload: {
                    dropdownListItems
                }
            });
        }
        return () => {
            if (abortController) {
                abortController.abort();
            }
        };
    }, [searchString]);
*/
    return (
        <ul id="dropdownList">
            {state.dropdownListItems.map((item: any) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}
