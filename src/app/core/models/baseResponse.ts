export interface IValidations {
  errors: string[];
  success: boolean;
}
export interface IBaseResponse<T> {
  validation: IValidations;
  payload: T;
}
