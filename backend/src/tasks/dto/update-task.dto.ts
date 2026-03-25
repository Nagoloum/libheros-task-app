import { IsOptional, IsString, IsDateString, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsString()
  longDescription?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}