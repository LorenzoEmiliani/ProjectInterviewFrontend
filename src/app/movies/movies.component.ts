import { Component, OnInit } from '@angular/core';
import { Movie, MovieService } from '../services/movie.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];
  userId: number = 0;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('userId')!;
    this.movieService.getMovies(this.userId).subscribe(data => {
      this.movies = data;
      this.movies.sort((a, b) => b.viewCount - a.viewCount);
    });
  }

  addView(movieId: number): void {
    this.movieService.addView(this.userId, movieId).subscribe(() => 
      this.movieService.getMovies(this.userId).subscribe(data => {
        this.movies = data;
        this.movies.sort((a, b) => b.viewCount - a.viewCount);
      })
    );
  }

  deleteMovie(movieId: number): void {
    this.movieService.deleteMovie(this.userId, movieId).subscribe(() => 
      this.movieService.getMovies(this.userId).subscribe(data => {
        this.movies = data;
        this.movies.sort((a, b) => b.viewCount - a.viewCount);
      })
    );
  }

}
