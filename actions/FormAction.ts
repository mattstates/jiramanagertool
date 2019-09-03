import { FormActionTypes } from '../enums/FormActionTypes';

export interface IFormAction {
    payload: any;
    type: FormActionTypes;
}
