import getJiraSearchUrl from '../getJiraSearchUrl';
import { jiraCustomFields } from '../../init';

const CUSTOM_FIELD_NAMES = jiraCustomFields
    .map(jiraCustomField => jiraCustomField.fieldName)
    .join(',');

describe('getJiraSearchUrl', () => {

    const sampleURL = getJiraSearchUrl('Alan Turing', new Date('01/01/2018'), new Date('12/31/2018'), 0);
    const fieldNames = ['key','timeestimate','timeoriginalestimate','timespent','assignee','worklog', ...CUSTOM_FIELD_NAMES]

    test('Returns URL with no spaces', () => {
        expect(sampleURL.match(/\s/g)).toBeNull
    })

    test('URL contains proper fields', () => {
        expect(sampleURL.match(/\s/g)).toBe(null)
        fieldNames.forEach(fieldName => expect(sampleURL.match(fieldName)).toHaveLength)
    })
})