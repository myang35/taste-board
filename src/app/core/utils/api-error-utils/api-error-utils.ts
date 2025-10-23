import { HttpErrorResponse } from '@angular/common/http';

export type ApiError = {
  code: string;
  message: string;
  data?: unknown;
};

export class ApiErrorUtils {
  static isApiError(error: unknown): error is ApiError {
    if (!(error instanceof Object)) return false;
    if (!('code' in error)) return false;
    if (!('message' in error)) return false;
    return true;
  }

  static isInvalidInputsError(error: unknown): error is ApiError & {
    data: { inputs: Record<string, string> };
  } {
    if (!this.isApiError(error)) return false;
    if (error.code !== 'INVALID_INPUTS') return false;
    if (!(error.data instanceof Object)) return false;
    if (!('inputs' in error.data)) return false;
    if (!(error.data.inputs instanceof Object)) return false;
    if (
      Object.entries(error.data.inputs).some(
        ([key, value]) => typeof key !== 'string' || typeof value !== 'string',
      )
    )
      return false;
    return true;
  }

  static handleError(
    error: unknown,
    handle: {
      unknownError?: (error: unknown) => void;
      httpErrorResponse?: (error: HttpErrorResponse) => void;
      apiError?: (error: ApiError) => void;
      invalidInputsError?: (
        error: ApiError & {
          data: { inputs: Record<string, string> };
        },
      ) => void;
    },
  ) {
    if (error instanceof HttpErrorResponse) {
      if (ApiErrorUtils.isInvalidInputsError(error.error)) {
        return handle.invalidInputsError?.(error.error);
      }
      if (ApiErrorUtils.isApiError(error.error)) {
        return handle.apiError?.(error.error);
      }
      return handle.httpErrorResponse?.(error);
    }
    return handle.unknownError?.(error);
  }
}
