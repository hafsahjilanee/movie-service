import { IsOptional, IsInt, Min, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class MoviesFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort: 'asc' | 'desc' = 'asc';

  @IsOptional()
  @IsString()
  genre?: string;
}
