import { Movie } from 'src/modules/movies/movies.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('ratings')
export class Rating {
    @PrimaryGeneratedColumn()
    ratingId: number;

    @Column()
    userId: number;

    @Column()
    movieId: number;

    @ManyToOne(() => Movie, (movie) => movie.ratings, { eager: true })
    @JoinColumn({ name: 'movieId' })
    movie: Movie;

    @Column('real')
    rating: number;

    @Column('bigint')
    timestamp: number;
}
