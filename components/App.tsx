import React, { Fragment, useState } from 'react';
import { useFetch } from '../hooks/useFetch.tsx';
import './App.scss';
import { JiraQueryBuilderForm } from './JiraQueryBuilderForm.tsx';
import { Result } from './Result.tsx';

export default function App() {
    const [appState, updateAppState] = useState<string>('');
    const data = useFetch(appState);

    return (
        <Fragment>
            <p>Customize Your Search</p>
            <JiraQueryBuilderForm callback={updateAppState} />
            <Result data={data.issues ? data.issues : []} />
        </Fragment>
    );
}
