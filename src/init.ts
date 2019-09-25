import merge from 'deepmerge'; //https://github.com/TehShrike/deepmerge
declare var DEVMODE: string;

interface IAppConfiguration {
    jiraApiConfiguration: {
        doneStatusDefinitions: string[];
        jiraApiMaxResults: number;
        options?: {
            jiraCustomFields?: {
                aggregate: boolean;
                average: boolean;
                displayName: string;
                fieldName: string;
                percentOfTotal: boolean;
            }[];
        };
    };
    urlConfiguration: {
        apiHostName: string;
        jiraApiAutocompleteEndpoint: string;
        jiraApiSearchEndpoint: string;
        jirabaseApiEndpoint: string;
        test?: string;
    };
}

class Configuration implements IAppConfiguration {
    public jiraApiConfiguration: {
        doneStatusDefinitions: [];
        jiraApiMaxResults: 0;
    };
    public urlConfiguration: {
        apiHostName: '';
        jiraApiAutocompleteEndpoint: '';
        jiraApiSearchEndpoint: '';
        jirabaseApiEndpoint: '';
    };
}

let publicConfiguration: IAppConfiguration;
try {
    publicConfiguration = require('../appconfig.json');
} catch (error) {
    console.error(error.message);
    publicConfiguration = new Configuration();
}

let privateConfiguration: IAppConfiguration;
try {
    privateConfiguration = require('../_appconfig.json');
} catch (error) {
    console.error(error.message);
    privateConfiguration = new Configuration();
}

const CONFIG = merge(publicConfiguration, privateConfiguration, {
    arrayMerge: (_destination, source) => source
});

// TODO: Implement a configuration validator;
const {
    apiHostName,
    jiraApiAutocompleteEndpoint,
    jiraApiSearchEndpoint,
    jirabaseApiEndpoint
} = CONFIG.urlConfiguration;

const { doneStatusDefinitions, jiraApiMaxResults, options } = CONFIG.jiraApiConfiguration;
const { jiraCustomFields } = options;

const hostName = DEVMODE === 'true' ? apiHostName : '';

export {
    hostName,
    jiraApiAutocompleteEndpoint,
    jiraApiSearchEndpoint,
    jirabaseApiEndpoint,
    doneStatusDefinitions,
    jiraApiMaxResults,
    jiraCustomFields
};
