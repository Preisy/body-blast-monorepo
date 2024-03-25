import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsNumber,
  IsBoolean,
  Length,
  Min,
  Max,
} from 'class-validator';

export class CreateUserRequest {
  @IsDefined()
  @IsString()
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsDefined()
  @IsString()
  @IsStrongPassword(
    { minLength: 8, minNumbers: 1, minUppercase: 1, minSymbols: 0 },
    {
      message: 'Password must be min 8 symbols, 1 number and 1 uppercase symbol',
    },
  )
  @ApiProperty()
  public password: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @Length(1, 50)
  public firstName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @Length(1, 50)
  public lastName?: string;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  @Min(1)
  @Max(100)
  public age: number;

  @IsNumber()
  @ApiProperty()
  @Min(100)
  @Max(250)
  public height: number;

  @IsNumber()
  @ApiProperty()
  @Min(20)
  @Max(600)
  public weight: number;

  @IsNumber()
  @ApiProperty()
  @Min(20)
  @Max(600)
  public weightInYouth: number;

  @IsString()
  @ApiProperty()
  @Length(1, 256)
  public nutritRestrict: string;

  @IsString()
  @ApiProperty()
  @Length(1, 256)
  public allergy: string;

  @IsString()
  @ApiProperty()
  @Length(1, 256)
  public gastroDeseases: string;

  @IsString()
  @ApiProperty()
  @Length(1, 256)
  public mealIntolerance: string;

  @IsBoolean()
  @ApiProperty()
  public insulinResistance: boolean;

  @IsString()
  @ApiProperty()
  @Length(1, 256)
  public kidneyDesease: string;

  @IsString()
  @ApiProperty()
  @Length(1, 256)
  public heartDesease: string;

  @IsString()
  @ApiProperty()
  @Length(1, 256)
  public muscleDesease: string;

  @IsString()
  @ApiProperty()
  @Length(1, 256)
  public loadRestrictions: string;

  @IsString()
  @ApiProperty()
  @Length(1, 256)
  public sportsExp: string;

  @IsString()
  @ApiProperty()
  @Length(1, 256)
  public goals: string;
}
