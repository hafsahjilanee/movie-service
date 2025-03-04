import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './ratings.entities';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RatingsService {
    constructor(
        @InjectRepository(Rating, 'rating')  
        private ratingRepository: Repository<Rating>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async getRatingsForMovie(movieId: number): Promise<Rating[]> {
        return this.ratingRepository.find({
            where: { movieId },
            relations: ['movie'],
            select: ['ratingId', 'rating', 'movieId'],  
          });
    }

    async getAverageRating(movieId: number): Promise<number> {
        const cachedAverage = await this.cacheManager.get<number>(`average-${movieId}`);
        if (cachedAverage) {
          return cachedAverage;
        }
    
        const ratings = await this.getRatingsForMovie(movieId);
        const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
        const average = sum / ratings.length;
    
        await this.cacheManager.set(`average-${movieId}`, average, 3600*1000);
        return average;
      }
}
