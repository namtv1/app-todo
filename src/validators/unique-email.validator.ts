import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from 'src/user/user.service';

/**
 * Customize new validate contraint in class-validator
 */

@ValidatorConstraint({ name: 'IsEmailUnique', async: true })
@Injectable()
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Email ${validationArguments.value} is already exist!`;
  }

  async validate(
    value: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const user = await this.userService.findByEmail(value);

    return !user;
  }
}
