import { Rating } from 'src/modules/ratings/ratings.entities';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('movies')
export class Movie {
    @PrimaryGeneratedColumn()
    movieId: number;

    @Column()
    imdbId: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    overview: string;

    @Column({ nullable: true })
    productionCompanies: string;

    @Column({ type: 'text', nullable: true })
    releaseDate: string;

    @Column({ type: 'text', nullable: true })
    budget: string;

    @Column({ type: 'integer', nullable: true })
    revenue: number;

    @Column({ type: 'real', nullable: true })
    runtime: number;

    @Column({ nullable: true })
    language: string;

    @Column({ nullable: true })
    genres: string;

    @Column({ nullable: true })
    status: string;

    @OneToMany(() => Rating, (rating) => rating.movie)
    ratings: Rating[];
}
