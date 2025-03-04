import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingsService } from './ratings.service';
import { Rating } from './ratings.entities';
import { Movie } from '../movies/movies.entity';
import { RatingsController } from './ratings.controller';
import { MovieModule } from '../movies/movies.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [TypeOrmModule.forFeature([Rating], 'rating'), CacheModule.register()], 
    controllers: [RatingsController],
    providers: [RatingsService],
    exports: [RatingsService],
})
export class RatingsModule {}
