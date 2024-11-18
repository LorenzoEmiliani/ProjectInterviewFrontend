import { Component } from '@angular/core';
import { Movie, MovieService } from '../services/movie.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-movieform',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './movieform.component.html',
  styleUrl: './movieform.component.css'
})
export class MovieformComponent {
  
  userId: number = 0;
  movie: Movie = {
    id:0,
    title:'',
    viewCount:0,
  };
  updateMode: boolean = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('userId')!; 
    const id = this.route.snapshot.paramMap.get('movieId');
    if(id) {
      this.updateMode = true;
      this.movie.id = +id;
    }
  }

  onSubmit(form: NgForm): void {
    if(this.updateMode) {
      this.movieService.updateMovie(this.userId, this.movie.id, this.movie).subscribe(() => this.router.navigate([`/${this.userId}/movies`]));
    } else {
      this.movieService.createMovie(this.userId, this.movie).subscribe(() => this.router.navigate([`/${this.userId}/movies`]));
    }
  }

}
