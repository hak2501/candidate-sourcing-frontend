export interface validations {
  errors: string[];
  success: boolean;
}
export interface baseResponse<T> {
  validation: validations;
  payload: T;
}
