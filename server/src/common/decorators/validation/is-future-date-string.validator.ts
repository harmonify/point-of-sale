import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidatorConstraint, registerDecorator } from 'class-validator';
import { DateTime } from 'luxon';

/* It validates that a date is a future date */
const isFutureDateString = (date: string) => {
  const dt = DateTime.fromISO(date);
  return dt.isValid && dt > DateTime.now();
};

@ValidatorConstraint({ async: true })
class IsFutureDateStringConstraint implements ValidatorConstraintInterface {
  async validate(value: string | string[], arguments_: ValidationArguments) {
    return Array.isArray(value)
      ? value.some((v) => isFutureDateString(v))
      : isFutureDateString(value);
  }

  defaultMessage(arguments_: ValidationArguments) {
    const property = arguments_.property;
    return `${property} should be an ISO future date string.`;
  }
}

export const IsFutureDateString = (
  validationOptions?: ValidationOptions,
): PropertyDecorator => {
  return function (object: Record<string, any>, propertyName: string | symbol) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName as string,
      options: validationOptions,
      validator: IsFutureDateStringConstraint,
    });
  };
};
