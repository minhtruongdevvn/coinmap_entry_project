import { registerDecorator, ValidationOptions } from 'class-validator';
import * as zxcvbn from 'zxcvbn';

export function IsPasswordValid(validationOptions?: ValidationOptions) {
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

          const password: string = value;

          if (password.length < 6) {
            this.error = 'Password must has at least 6 character';
            return false;
          }

          const pattern = new RegExp(
            '((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$',
          );
          if (!pattern.test(password)) {
            this.error =
              'Password must has at least 1 upper case, 1 lower case, 1 number or special character';
            return false;
          }

          const result = zxcvbn(password);
          if (result.score < 3) {
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
