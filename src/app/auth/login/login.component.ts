import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, switchMap } from 'rxjs/operators';
import { ToastService } from 'angular-toastify';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.getPopularMovies();
  }

  constructor(
    private http: HttpClient,
    private _toastService: ToastService,
    private router: Router
  ) {}

  currentIndex: number = 0;
  username: string = '';
  password: string = '';
  defaultImageUrl: string = 'https://image.tmdb.org/t/p/original/';
  popularMovies: Movie[] = [];

  slideConfig = {
    slidesToShow: 6,
    slidesToScroll: 1,
    variableWidth: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    autoplay: true,
  };

  slickInit(e: any) {
    this.currentIndex = e.slick.currentSlide;
  }

  breakpoint(e: any) {}

  beforeChange(e: any) {}

  afterChange(e: any) {
    this.currentIndex = e.currentSlide;
  }

  getBackgroundImageUrl(): string {
    const currentMovie = this.popularMovies[this.currentIndex];
    return this.defaultImageUrl + currentMovie.backdrop_path;
  }

  getPopularMovies() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTQyOTY4YTZkODgyMThmMTk2OTlmNzRmODQ5OGVkOSIsInN1YiI6IjY0ZmY3N2NjZTBjYTdmMDEyZWI4NDg1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PsrSrMMAjZdto7_EAEzSgZ0V-RDgC6vGfstQZgFfyFU',
      },
    };

    return this.http
      .get(
        'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1',
        options
      )
      .pipe(
        catchError((): any => {
          return this._toastService.error('Erro ao carregar os filmes');
        })
      )
      .subscribe((res: any) => (this.popularMovies = res.results));
  }

  getToken() {
    return this.http
      .get(
        'https://api.themoviedb.org/3/authentication/token/new?api_key=4542968a6d88218f19699f74f8498ed9'
      )
      .pipe(
        catchError((): any => {
          return this._toastService.error(
            'Algo deu errado, confira seus dados'
          );
        })
      );
  }

  loginRequest(token: string) {
    const body = {
      username: this.username,
      password: this.password,
      request_token: token,
    };

    return this.http
      .post(
        'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=4542968a6d88218f19699f74f8498ed9',
        body
      )
      .pipe(
        catchError((): any => {
          return this._toastService.error(
            'Algo deu errado, confira seus dados'
          );
        })
      );
  }

  getSessionId(token: string) {
    const body = {
      method: 'POST',
    };
    return this.http
      .post(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=4542968a6d88218f19699f74f8498ed9&request_token=${token}`,
        body
      )
      .pipe(
        catchError((): any => {
          return this._toastService.error(
            'Algo deu errado, confira seus dados'
          );
        })
      );
  }

  startProcess() {
    this.getToken()
      .pipe(
        switchMap((tokenResponse: any) => {
          const token = tokenResponse.request_token;
          return this.loginRequest(token);
        })
      )
      .pipe(
        switchMap((data: any) => {
          const token = data.request_token;
          return this.getSessionId(token);
        })
      )
      .subscribe((finalData: any) => {
        if (finalData.success) {
          localStorage.setItem('session_id', finalData.session_id);
          this.router.navigate(['/dashboard']);
        } else {
          this._toastService.error('Algo deu errado, confira seus dados');
        }
      });
  }
}
