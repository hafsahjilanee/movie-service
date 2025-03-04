import { Controller, Get, Query } from '@nestjs/common';
import { OmdbService } from './omdb.service';

@Controller('omdb')
export class OmdbController {
  constructor(private readonly omdbService: OmdbService) {}

  @Get('movie')
  async getMovie(@Query('title') title: string) {
    return this.omdbService.getMovieByTitle(title);
  }
}
