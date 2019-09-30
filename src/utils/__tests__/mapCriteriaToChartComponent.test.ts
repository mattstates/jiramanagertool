import { Criterias } from '../../enums/Criterias';
import getEnumValuesAsCollection from '../getEnumAsCollection';
import mapCriteriaToChartComponent from '../mapCriteriaToChartComponent';
import mockJiraResponse from '../../../__mocks__/mockJiraResponse';

describe('mapCriteriaToChartComponent', () => {
    const criteriasCollection = getEnumValuesAsCollection(Criterias);
    test('Criteria return JSX', () => {
        criteriasCollection.forEach(criteria => {
            expect(
                mapCriteriaToChartComponent({
                    criteria,
                    data: { '01/01/2018': mockJiraResponse },
                    key: 'abc'
                })
            ).toMatchSnapshot();
        });
    });
});
