import {App} from './components/App.tsx'
import React from 'react';
import ReactDOM from 'react-dom';

const APP_ENTRY_ID = 'appEntry';
const appEntryDom = document.getElementById(APP_ENTRY_ID);

ReactDOM.render(<App />, appEntryDom);