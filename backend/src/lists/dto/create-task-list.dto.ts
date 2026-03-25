import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTaskListDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Le nom doit faire au moins 3 caractères' })
  name: string;
}