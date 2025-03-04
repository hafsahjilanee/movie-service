import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';
import { MovieResponseDto } from 'src/common/dto/movies.dto';
import { MoviesFilterDto } from 'src/common/dto/movies-filter.dto';
import { MovieDetailsDto } from 'src/common/dto/movie-details.dto';
import { RatingsService } from '../ratings/ratings.service';
import { OmdbService } from '../omdb/omdb.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie, 'movie') 
    private movieRepository: Repository<Movie>,
    private readonly ratingService: RatingsService,
    private readonly omdbService: OmdbService,
  ) {}

  async getMovies(filterDto: MoviesFilterDto): Promise<MovieResponseDto[]> {
    const { page, year, sort, genre } = filterDto;
    const pageSize = 50;
    const offset = (page - 1) * pageSize;
  
    let query = this.movieRepository
      .createQueryBuilder('movie')
      .select([
        'movie.imdbId',
        'movie.title',
        'movie.genres',
        'movie.releaseDate',
        'movie.budget',
      ]);

    if (year) {
      query = query.where('strftime("%Y", movie.releaseDate) = :year', { year });
    }
    if (genre) {
      query = query.andWhere('movie.genres LIKE :genre', { genre: `%${genre}%` });
    }

    const movies = await query
      .orderBy('movie.releaseDate', sort.toUpperCase() as 'ASC' | 'DESC')
      .limit(pageSize)
      .offset(offset)
      .getMany();

  
    return movies.map(movie => ({
      ...movie,
      genres: JSON.parse(movie.genres), 
      budget: movie.budget ? `$${movie.budget}` : 'N/A',
    }));
  }

  async getMovieDetails(movieId: number): Promise<MovieDetailsDto>
   {
    const movie = await this.movieRepository.findOne({ where: { movieId } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    const averageRating = await this.ratingService.getAverageRating(movie.movieId);

    const omdbDetails = await this.omdbService.getMovieDetails(movie.imdbId);
    const rottenTomatoes = omdbDetails.Ratings.find(r => r.source === 'Rotten Tomatoes');

    return {
      imdbId: movie.imdbId,
      title: movie.title,
      description: movie.overview ?? omdbDetails.Plot,
      releaseDate: movie.releaseDate,
      budget: movie.budget ? `$${movie.budget}` : 'N/A',
      runtime: movie.runtime,
      averageRating: averageRating.toFixed(1),
      rottenTomatoes: rottenTomatoes ? rottenTomatoes.score : 'N/A',
      genres: JSON.parse(movie.genres),
      originalLanguage: movie.language ?? omdbDetails.Language,
      productionCompanies: JSON.parse(movie.productionCompanies),
    };
  }

}
