import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { UserformComponent } from './userform/userform.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieformComponent } from './movieform/movieform.component';

export const routes: Routes = [
    {path: '', component: StartComponent},
    {path: 'new', component: UserformComponent},
    {path: ':userId', component: UserformComponent},
    {path: ':userId/movies', component: MoviesComponent},
    {path: ':userId/movies/new', component: MovieformComponent},
    {path: ':userId/movies/:movieId', component: MovieformComponent}
];
