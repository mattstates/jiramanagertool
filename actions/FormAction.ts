import { FormActionTypes } from '../enums/FormActionTypes.ts';

export interface IFormAction {
    payload: any;
    type: FormActionTypes;
}
