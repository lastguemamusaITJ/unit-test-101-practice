import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteMoviesComponent } from './favorite-movies.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {of, throwError} from 'rxjs';


class Movie {
  title: string;
}

const favoriteMoviesToUse: Movie[] = [
  {title: 'Interstellar'} as Movie,
  {title: 'The big Lebowski'} as Movie,
  {title: 'Fences'} as Movie
];


class FavoriteMoviesService {
  getFavoriteMovies(): any {
    return '';
  }
}

describe('FavoriteMoviesComponent', () => {
  let component: FavoriteMoviesComponent;
  let fixture: ComponentFixture<FavoriteMoviesComponent>;
  let favoriteMovieService: FavoriteMoviesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteMoviesComponent ],
      providers: [FavoriteMoviesService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteMoviesComponent);
    component = fixture.componentInstance;
    favoriteMovieService = TestBed.get(FavoriteMoviesService);
    jest.spyOn(favoriteMovieService, 'getFavoriteMovies').mockReturnValue(of(favoriteMoviesToUse));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Render', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have a title', () => {
      const titleElements = fixture.debugElement.queryAll(By.css('h1'));
      expect(titleElements.length).toBe(1);
      expect(titleElements[0].nativeElement.innerHTML).toBe('Favorite movies');
    });

    it('show all the favorite movies', () => {
      const movieElements = fixture.debugElement.queryAll(By.css('.movie'));
      expect(movieElements.length).toBe(favoriteMoviesToUse.length);
    });

    it('should show the movie titles', () => {
      const movieElements = fixture.debugElement.queryAll(By.css('.movie'));
      movieElements.forEach((movieElement: DebugElement, index) => {
        expect(movieElement.nativeElement.innerHTML).toContain(favoriteMoviesToUse[index].title);
      });
    });

  });

  describe('Getting the movies', () => {
    it('should get the movies from the service', () => {
      fixture.detectChanges();
      expect(favoriteMovieService.getFavoriteMovies).toHaveBeenCalled();
    });

    it('should show an error if getting the movies fail', () => {
      const errorToThrow = 'User not found';
      jest
        .spyOn(favoriteMovieService, 'getFavoriteMovies')
        .mockReturnValue(throwError(errorToThrow));

      fixture.detectChanges();

      const errorElement = fixture.debugElement.queryAll(By.css('.error'));
      expect(errorElement.length).toBe(1);
      expect(errorElement[0].nativeElement.innerHTML).toContain(errorToThrow);
    });

    it('should not show an error if getting the movies succeeds', () => {
      fixture.detectChanges();

      const errorElement = fixture.debugElement.queryAll(By.css('.error'));
      expect(errorElement.length).toBe(0);
    });

  });

});
