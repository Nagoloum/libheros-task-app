import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTaskListDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;
}