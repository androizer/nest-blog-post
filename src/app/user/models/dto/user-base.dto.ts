import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { Role } from '../../../shared/enums';

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

  @IsEnum(Role)
  role: Role;

  @IsDate()
  createdOn: Date;

  @IsDate()
  modifiedOn: Date;
}
