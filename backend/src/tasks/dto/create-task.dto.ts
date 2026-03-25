import { IsNotEmpty, IsString, IsDateString, IsOptional, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  shortDescription: string;

  @IsOptional()
  @IsString()
  longDescription?: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;        // Format ISO : "2026-04-15T00:00:00.000Z"
}