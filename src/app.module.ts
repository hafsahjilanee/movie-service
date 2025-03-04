import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './modules/movies/movies.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { Movie } from './modules/movies/movies.entity';
import { Rating } from './modules/ratings/ratings.entities';
import { ConfigModule } from '@nestjs/config';
import { OmdbModule } from './modules/omdb/omdb.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',  
      isGlobal: true, 
    }),
    MovieModule,  
    RatingsModule, 
    OmdbModule,
    TypeOrmModule.forRoot({
      name: 'movie',
      type: 'sqlite',
      database: process.env.MOVIES_DB_PATH,
      entities: [Movie, Rating],
      synchronize: true,
    }),
    TypeOrmModule.forRoot({
      name: 'rating',
      type: 'sqlite',
      database: process.env.RATINGS_DB_PATH,
      entities: [Rating, Movie],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
