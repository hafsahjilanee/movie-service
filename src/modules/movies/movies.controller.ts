import { Controller, Get, Query, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { MovieService } from './movies.service';
import { MoviesFilterDto } from 'src/common/dto/movies-filter.dto';
import { MovieDetailsDto } from 'src/common/dto/movie-details.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MovieService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async listMovies(@Query() filterDto: MoviesFilterDto) {
    return this.moviesService.getMovies(filterDto);
  }

  @Get(':movieId')
  async getMovieDetails(@Param('movieId') movieId: number): Promise<MovieDetailsDto> 
  {
    const movie = await this.moviesService.getMovieDetails(movieId);
    return movie;
  }
}
