import { useEffect, useState } from 'react';

export function useFetch<T>(fetchUrl: string): T {
    const [fetchData, updateFetchData] = useState<T>(null);

    const abortController = new AbortController();

    useEffect(() => {
        if (fetchUrl.length) {
            fetch(fetchUrl, {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                method: 'GET',
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
