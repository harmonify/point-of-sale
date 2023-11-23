export class StringUtil {
  static toNumber(params: {
    value: string | null;
    defaultValue?: number;
    isInteger?: boolean;
    throwIfFailed?: boolean;
  }): number {
    if (!params.value) {
      if (params.throwIfFailed) {
        throw new Error(`Convertion error. ${params.value} is not a number.`);
      }
      return NaN;
    }

    const result = parseFloat(params.value);

    // Check if the conversion was successful and the result is a finite number
    if (!isNaN(result) && isFinite(result)) {
      // If isInteger is true, round the result to the nearest integer
      return params.isInteger ? Math.round(result) : result;
    } else if (params.defaultValue) {
      // If the conversion failed, return the default value
      return params.defaultValue;
    } else if (params.throwIfFailed) {
      throw new Error(`Convertion error. ${params.value} is not a number.`);
    } else {
      return result;
    }
  }
}
