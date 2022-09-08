import { Option } from '../entities/option.entity';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDate,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePollDto {
  @IsString()
  title: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(5)
  options: Option[];

  @IsDate()
  @Type(() => Date)
  expireAt: Date;
}
