import { Controller, Get, Param } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { Rating } from './ratings.entities';

@Controller('ratings')
export class RatingsController {
    constructor(private readonly ratingsService: RatingsService) {}

    @Get(':movieId')
    async getRatings(@Param('movieId') movieId: number): Promise<Rating[]> {
        return this.ratingsService.getRatingsForMovie(movieId);
    }

}
