import { useEffect, useState } from 'react';
import { API_CREDENTIALS } from '../secrets';

export function useFetch(fetchUrl: string): { results?: any } {
    const [fetchData, updateFetchData] = useState<object>({});

    const abortController = new AbortController();

    useEffect(() => {
        fetch(fetchUrl, {
            headers: new Headers({
                Authorization: API_CREDENTIALS
            }),
            method: 'GET',
            credentials: 'include',
            signal: abortController.signal
        })
            .then((response: any) => response.json())
            .then((json: object) => {
                updateFetchData(json);
            })
            .catch((error: any) => {
                updateFetchData({ errorMessage: error.message });
            });
        return () => {
            abortController.abort();
        };
    }, [fetchUrl]);

    return fetchData;
}
