import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}

export class SignInDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
