import { useEffect, useState } from 'react';
import { API_CREDENTIALS } from '../secrets.ts';

export function useFetch(fetchUrl: string): any {
    const [isFetchCompleted, updateIsFetchCompleted] = useState<boolean>(false);
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
                updateIsFetchCompleted(true);
            })
            .catch((error: any) => {
                updateFetchData({ errorMessage: error.message });
                updateIsFetchCompleted(true);
            });
        return () => {
            abortController.abort();
        };
    }, [fetchUrl]);

    return fetchData;
}
