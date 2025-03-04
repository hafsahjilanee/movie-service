

# Movie Service

This is a **Movie Service** built with **TypeScript**, **Node.js**, and **NestJS**. It provides APIs to fetch movie ratings, list movies with filters, and get movie details by ID.

---

## Features

- **Get Ratings for a Movie**: Fetch ratings for a specific movie by its ID.
- **List Movies**: Fetch a list of movies with pagination, filtering by year, sorting, and genre.
- **Get Movie by ID**: Fetch detailed information about a specific movie by its ID.

---

## APIs

### 1. **Get Ratings for a Movie**
Fetch ratings for a specific movie by its movie ID.

- **Endpoint**: `GET /ratings/:movieId`
- **Example**: `http://localhost:3000/ratings/1`
- **Response**:
  ```json
  [
    {
        "ratingId": 496,
        "movieId": 1,
        "rating": 3,
        "movie": null
    },
    {
        "ratingId": 700,
        "movieId": 1,
        "rating": 4,
        "movie": null
    },
  ]
  ```

---

### 2. **List Movies**
Fetch a list of movies with optional filters, sorting, and pagination.

- **Endpoint**: `GET /movies`
- **Query Parameters**:
  - `page` (optional): Page number for pagination (default: `1`).
  - `year` (optional): Filter movies by release year (e.g., `2005`).
  - `sort` (optional): Sort movies by release date (`asc` or `desc`).
  - `genre` (optional): Filter movies by genre (e.g., `romance`).
- **Example**: `http://localhost:3000/movies?page=1&year=2005&sort=desc&genre=romance`
- **Response**:
  ```json
  [
    {
        "imdbId": "tt0453365",
        "title": "FC Venus",
        "releaseDate": "2005-12-30",
        "budget": "$2196531",
        "genres": [
            {
                "id": 35,
                "name": "Comedy"
            },
            {
                "id": 10749,
                "name": "Romance"
            }
        ]
    },
    {
        "imdbId": "tt0339526",
        "title": "Shooting Gallery",
        "releaseDate": "2005-12-26",
        "budget": "$0",
        "genres": [
            {
                "id": 35,
                "name": "Comedy"
            },
            {
                "id": 18,
                "name": "Drama"
            },
            {
                "id": 10749,
                "name": "Romance"
            },
            {
                "id": 53,
                "name": "Thriller"
            }
        ]
    },
  ]
  ```

---

### 3. **Get Movie by ID**
Fetch detailed information about a specific movie by its ID.

- **Endpoint**: `GET /movies/:movieId`
- **Example**: `http://localhost:3000/movies/2`
- **Response**:
  ```json
  {
    "imdbId": "tt0094675",
    "title": "Ariel",
    "description": "Taisto Kasurinen is a Finnish coal miner whose father has just committed suicide and who is framed for a crime he did not commit. In jail, he starts to dream about leaving the country and starting a new life. He escapes from prison but things don't go as planned...",
    "releaseDate": "1988-10-21",
    "budget": "$0",
    "runtime": 69,
    "averageRating": "3.4",
    "rottenTomatoes": "N/A",
    "genres": [
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 80,
            "name": "Crime"
        }
    ],
    "originalLanguage": "Finnish",
    "productionCompanies": [
        {
            "name": "Villealfa Filmproduction Oy",
            "id": 2303
        },
        {
            "name": "Finnish Film Foundation",
            "id": 2396
        }
    ]
}
  ```

### Prerequisites

- Node.js: Ensure you have Node.js installed (v16 or higher).
- NestJS CLI: Install the NestJS CLI globally.
  ```
  npm install -g @nestjs/cli
  

