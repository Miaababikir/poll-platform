import { Option } from '../entities/option.entity';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDate,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePollDto {
  @IsString()
  title: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => Option)
  options: Option[];

  @IsDate()
  @Type(() => Date)
  expireAt: Date;
}
