import { IsInt, IsOptional, Min } from 'class-validator';

export class GetMoviesDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;
}

export class MovieResponseDto {
  imdbId: string;
  title: string;
  genres: string;
  releaseDate: string;
  budget: string; 
}
