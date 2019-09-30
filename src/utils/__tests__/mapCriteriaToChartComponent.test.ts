import mapCriteriaToChartComponent from '../mapCriteriaToChartComponent';
import { Criterias } from '../../enums/Criterias';
import mockJiraResponse from '../../../__mocks__/mockJiraResponse';

describe('mapCriteriaToChartComponent', () => {
    test('Criteria return JSX', () => {
        expect(mapCriteriaToChartComponent({criteria: Criterias.AverageOriginalEstimate, data: {'01/01/2018': mockJiraResponse}, key: 'abc'})).toMatchSnapshot()
    })
})