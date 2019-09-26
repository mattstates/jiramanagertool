import merge from 'deepmerge'; //https://github.com/TehShrike/deepmerge
declare var DEVMODE: string; //Webpack assigns a value to this

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
        jiraBaseApiEndpoint: string;
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
        jiraBaseApiEndpoint: '';
    };
}

let publicConfiguration: IAppConfiguration;
try {
    publicConfiguration = require('../appconfig.json');
} catch (error) {
    console.error(error.message);
    publicConfiguration = new Configuration();
}

let CONFIG = publicConfiguration;

try {
    let privateConfiguration = require('../_appconfig.json');
    CONFIG = merge(publicConfiguration, privateConfiguration);
} catch (_error) {
    console.warn('No Private appconfig.json');
}


// TODO: Implement a configuration validator;
const {
    apiHostName,
    jiraApiAutocompleteEndpoint,
    jiraApiSearchEndpoint,
    jiraBaseApiEndpoint
} = CONFIG.urlConfiguration;

const { doneStatusDefinitions, jiraApiMaxResults, options } = CONFIG.jiraApiConfiguration;
const { jiraCustomFields } = options;

const hostName = DEVMODE === 'true' ? apiHostName : '';

export {
    doneStatusDefinitions,
    hostName,
    jiraApiAutocompleteEndpoint,
    jiraApiMaxResults,
    jiraApiSearchEndpoint,
    jiraBaseApiEndpoint,
    jiraCustomFields
};
