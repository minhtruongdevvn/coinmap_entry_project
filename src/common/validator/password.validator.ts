import { registerDecorator, ValidationOptions } from 'class-validator';
import * as zxcvbn from 'zxcvbn';

export type Constraint = {
  maxLength: number;
  minimumScore: number;
  requiredLowercase?: boolean;
  requiredUppercase?: boolean;
  requiredDigit?: boolean;
  requiredSpecial?: boolean;
};

export function IsPasswordValid(
  constraint: Constraint = { maxLength: 8, minimumScore: 3 },
  validationOptions?: ValidationOptions,
) {
  const regex = getRegex(constraint);
  const message = getMessage(constraint);
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) {
            this.error = 'Empty password';
            return false;
          }

          if (typeof value != 'string') {
            this.error = 'Invalid password';
            return false;
          }

          if (!regex.test(value)) {
            this.error = message;
            return false;
          }

          const result = zxcvbn(value);
          if (result.score < constraint.minimumScore) {
            this.error = 'Password is ez to guess';
            return false;
          }
          return true;
        },
        defaultMessage(): string {
          return this.error || 'Something went wrong';
        },
      },
    });
  };
}

const getRegex = (constraint: Constraint) => {
  let expression = '^';
  if (constraint.requiredLowercase) expression += '(?=.*[a-z])';
  if (constraint.requiredUppercase) expression += '(?=.*[A-Z])';
  if (constraint.requiredDigit) expression += '(?=.*\\d)';
  if (constraint.requiredSpecial) expression += '(?=.*[@$!%*?&])';

  let match: string;
  if (constraint.requiredSpecial) match = '[a-zA-Z\\d@$!%*?&]';
  else match = '[a-zA-Z\\d]';

  return new RegExp(expression + match + `{${constraint.maxLength},}$`);
};

const getMessage = (constraint: Constraint) => {
  let message = 'Password must has ';
  let atLeast = '';
  if (constraint.requiredLowercase) atLeast += '1 lower case, ';
  if (constraint.requiredUppercase) atLeast += '1 upper case, ';
  if (constraint.requiredDigit) atLeast += '1 number, ';
  if (constraint.requiredSpecial) atLeast += '1 special character, ';

  if (atLeast)
    message += `at least ${atLeast.substring(0, atLeast.length - 2)} and `;
  message += `minimum ${constraint.maxLength} characters`;

  return message;
};
