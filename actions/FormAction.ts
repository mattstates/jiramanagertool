import { FormActionTypes } from '../enums/formActionTypes.ts';

export interface FormAction {
    payload: any;
    type: FormActionTypes;
}
