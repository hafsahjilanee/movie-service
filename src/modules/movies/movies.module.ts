import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies.entity';
import { MovieService } from './movies.service';  
import { MoviesController } from './movies.controller';
import { OmdbModule } from '../omdb/omdb.module';
import { RatingsModule } from '../ratings/ratings.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie], 'movie'), OmdbModule, RatingsModule],
  providers: [MovieService], 
  controllers: [MoviesController],  
  exports: [MovieService], 
})
export class MovieModule {}
