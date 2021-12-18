import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

class Movie {
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteMoviesService {

  constructor() { }

  getFavoriteMovies(): Observable<Movie[]> {
    return of([]);
  }
}
