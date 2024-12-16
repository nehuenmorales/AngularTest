import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  DataImage } from '../Interfaces/dataImage';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../Interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class ImagesPixabayService {
  private apiKey = '34573560-b4b29946062bf53b893e1ec40';
  private apiUrl: string = `https://pixabay.com/api/?key=${this.apiKey}&lang=es&per_page=21`;

  constructor(private http: HttpClient) { }

  getAllImages(page: number): Observable<ApiResponse<DataImage[]>> {
    const url = `${this.apiUrl}&page=${page}`
    return this.http.get<{ hits: DataImage[] }>(url) 
      .pipe(
        map(response => ({ data: response.hits })),
        catchError(this.handleError)
      );
  }


  searchImages(query: string, page: number): Observable<ApiResponse<DataImage[]>> {
    const url = `${this.apiUrl}&page=${page}&q=${encodeURIComponent(query)}`; 
    return this.http.get<{ hits: DataImage[] }>(url)
    .pipe(
      map((response) => ({
        data: response.hits,
      } as ApiResponse<DataImage[]>)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
