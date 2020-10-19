import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Validate,
  Validator,
  ValidatorConstraint,
} from 'class-validator';

import { UniqueEmailValidator } from '../../validators/unique-email.validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail()
  email: string;

  @MaxLength(30, {
    message: 'Email is too long. Maximal length is 50',
  })
  @MinLength(8, { message: 'Email too short.' })
  password: string;
}

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail()
  @MaxLength(30, {
    message: 'Email is too long. Maximal length is 50',
  })
  @MinLength(8, { message: 'Email too short.' })
  @Validate(UniqueEmailValidator)
  readonly email: string;

  @IsNotEmpty({ message: 'Password is required!' })
  readonly password: string;

  @IsNotEmpty({ message: 'Username is required!' })
  readonly userName: string;
}
