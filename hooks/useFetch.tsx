import { useEffect, useState } from 'react';
import { API_CREDENTIALS } from '../secrets';

export function useFetch<T>(fetchUrl: string): T {
    const [fetchData, updateFetchData] = useState<T>(null);

    const abortController = new AbortController();

    useEffect(() => {
        if (fetchUrl.length) {
            fetch(fetchUrl, {
                headers: new Headers({
                    Authorization: API_CREDENTIALS
                }),
                method: 'GET',
                credentials: 'include',
                signal: abortController.signal
            })
                .then((response: any) => response.json())
                .then((json: T) => {
                    updateFetchData(json);
                })
                .catch((_error: { message: string }) => {
                    console.log(_error.message);
                });
            return () => {
                abortController.abort();
            };
        }
    }, [fetchUrl]);

    return fetchData;
}
