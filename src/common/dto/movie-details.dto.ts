import { IsString, IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class GenreDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}

export class MovieDetailsDto {
  @IsString()
  imdbId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  releaseDate: string;

  @IsString()
  budget: string;

  @IsNumber()
  runtime: number;

  @IsString()
  averageRating: string;

  @IsString()
  rottenTomatoes: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GenreDto)
  genres: GenreDto[];

  @IsString()
  originalLanguage: string;

  @IsArray()
  @IsString({ each: true })
  productionCompanies: string[];
}