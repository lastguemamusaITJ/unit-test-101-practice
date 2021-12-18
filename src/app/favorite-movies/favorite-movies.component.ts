import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

class Movie {
  title: any;
}

class FavoriteMoviesService {
  getFavoriteMovies(): any {
    return '';
  }
}

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.css']
})
export class FavoriteMoviesComponent implements OnInit {
  favoriteMovies$: Observable<Movie[]>;
  error: string;
  constructor(private favoriteMovieService: FavoriteMoviesService) {}

  ngOnInit(): void {
    this.favoriteMovies$ = this.favoriteMovieService.getFavoriteMovies().pipe(
      catchError((error: any) => {
        this.error = error;

        return of([]);
      })
    );
  }

}
