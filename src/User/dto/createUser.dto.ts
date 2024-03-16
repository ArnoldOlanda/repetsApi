import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @MinLength(5)
  name: string;

  @IsDefined()
  @IsString()
  @MinLength(5)
  last_name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsDefined()
  @IsString()
  @Length(9, 9)
  phone: string;

  @IsDefined()
  @IsString()
  @Length(8, 16)
  password: string;
}
