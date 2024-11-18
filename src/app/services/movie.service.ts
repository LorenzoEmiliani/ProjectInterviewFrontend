import { Injectable } from '@angular/core';
import { User } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  viewCount: number;
  user?: User;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) {}

  getMovies(userId: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/${userId}/movies`);
  }

  createMovie(userId: number, movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/${userId}/movies`, movie);
  }

  updateMovie(userId: number, movieId: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${userId}/movies/${movieId}`, movie);
  }

  addView(userId: number, movieId: number): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/${userId}/movies/${movieId}/view`, {});
  }

  deleteMovie(userId: number, movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/movies/${movieId}`);
  }
  
}
