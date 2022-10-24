import { IsNotEmpty } from 'class-validator';

export class Skill {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string;
}
