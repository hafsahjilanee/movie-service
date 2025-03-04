export class MovieDetailsDto {
    imdbId: string;
    title: string;
    description: string;
    releaseDate: string;
    budget: string;
    runtime: number;
    averageRating: string;
    rottenTomatoes: string;
    genres: { id: number; name: string }[];
    originalLanguage: string;
    productionCompanies: string[];
  }
  