import { Option } from '../entities/option.entity';

export class CreatePollDto {
  title: string;
  options: Option[];
}
