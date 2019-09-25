import { JiraResponse } from '../types/JiraTypes';
import getJiraSearchUrl from './getJiraSearchUrl';
/**
 * @description Fetches all results in the event that there are more issues than the max results query param allows. Has a dependency on urlBuilder()
 */
export async function getJiraResponseData(assignee: string, dateRanges: Array<[string, string]>) {
    // TODO: Handle fetching errors.
    const initialPromises = dateRanges.map(async (dateRange) => {
        const response = await fetch(getJiraSearchUrl(assignee, dateRange[0], dateRange[1], 0));
        const json: JiraResponse = await response.json();
        return json;
    });
    const initialResponses = await Promise.all<JiraResponse>(initialPromises);
    const subsequentPromises = initialResponses.map(async (initialResponse, responseIndex): Promise<JiraResponse[]> => {
        const { maxResults, total } = initialResponse;
        const apiCallCount = Math.floor(total / maxResults);
        let remainingResults: Promise<JiraResponse>[] = [
            new Promise<JiraResponse>((resolve, _reject) => {
                resolve(initialResponse);
            })
        ];
        if (apiCallCount > 0) {
            remainingResults = [
                ...remainingResults,
                ...new Array(apiCallCount).fill(null).map(async (_element, i) => {
                    const response = await fetch(getJiraSearchUrl(assignee, dateRanges[responseIndex][0], dateRanges[responseIndex][1], (i + 1) * maxResults));
                    const json: JiraResponse = await response.json();
                    return json;
                })
            ];
        }
        return await Promise.all<JiraResponse>(remainingResults);
    });
    const subsequentResponses = await Promise.all(subsequentPromises);
    return subsequentResponses;
}
