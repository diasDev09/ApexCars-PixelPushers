import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Tipamos somente o que nos interessa da resposta da Unsplash
interface UnsplashResponse {
  results: Array<{
    urls: { regular: string };
  }>;
}

@Injectable({ providedIn: 'root' })
export class ImagemService {

  private readonly ACCESS_KEY = 'sua-chave';
  private readonly BASE_URL = 'https://api.unsplash.com';
  private readonly FALLBACK_URL = 'assets/car-placeholder.png';

  constructor(private http: HttpClient) {}

  buscarImagem(termo: string): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Client-ID ${this.ACCESS_KEY}`
    });

    const query = this.montarQuery(termo);

    return this.http
      .get<UnsplashResponse>(`${this.BASE_URL}/search/photos`, {
        headers,
        params: { query, per_page: '1' }
      })
      .pipe(
        map(response =>
          response.results.length > 0
            ? response.results[0].urls.regular
            : this.FALLBACK_URL
        ),
        catchError(() => of(this.FALLBACK_URL))
      );
  } // <- fecha buscarImagem

  private montarQuery(nomeMarca: string): string {
    return `${nomeMarca} car vehicle automobile`;
  } // <- fecha montarQuery

} // <- fecha a classe