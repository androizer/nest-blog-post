import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class UserBase {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  fullName: string;

  @IsString()
  @Length(8, 16)
  password: string;
}
