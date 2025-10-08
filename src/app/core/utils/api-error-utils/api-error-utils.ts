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
}
