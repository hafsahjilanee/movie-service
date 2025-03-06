import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class OmdbService {
  private readonly baseUrl = 'http://www.omdbapi.com/';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
  }
  
  private getApiKey(): string {
    const apiKey = this.configService.get<string>('OMDB_API_KEY');
    if (!apiKey) {
      throw new Error('OMDB_API_KEY is not defined');
    }
    return apiKey;
  }

  async getMovieDetails(imdbId: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.baseUrl, {
          params: { i: imdbId, apikey: this.getApiKey() },
        })
      );

      if (!response.data) {
        throw new HttpException(
          response.data?.Error || 'Movie not found',
          HttpStatus.NOT_FOUND
        );
      }

      return response.data;
    } catch (error) {
      this.handleHttpError(error, 'Error fetching movie details from OMDB API');
    }
  }

  async getMovieByTitle(title: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}`, {
          params: {
            apikey: this.getApiKey(),
            t: title, 
          },
        })
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error fetching data from OMDB API',
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  private handleHttpError(error: any, message: string): never {
    if (error instanceof AxiosError) {
      throw new HttpException(
        error.response?.data?.Error || message,
        error.response?.status || HttpStatus.BAD_GATEWAY
      );
    }
    throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
