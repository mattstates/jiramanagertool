import { FormActionTypes } from '../enums/formActionTypes.ts';

export interface IFormAction {
    payload: any;
    type: FormActionTypes;
}
