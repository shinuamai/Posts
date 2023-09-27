import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Post } from '../interfaces/Post';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  urlBase = 'https://jsonplaceholder.typicode.com/posts'

  constructor(private http: HttpClient) { }

  getData(): Observable<Post[]> {
    return this.http.get<Post[]>(this.urlBase) //RECUPERA DATOS DEL SERVIDOR SIN CAMBIOS
      .pipe(
        catchError(error => {
          console.error('Ocurrió un error en la solicitud HTTP GET:', error);
          return throwError(() => error);
        })
      );
  }

  updatePost(updatedPost: Post): Observable<Post> {
    const url = `${this.urlBase}/${updatedPost.id}`;
    return this.http.put<Post>(url, updatedPost) // ACTUALIZA O REMPLAZA ALGUN EXISTENTE
      .pipe(
        catchError(error => {
          console.error('Ocurrió un error en la solicitud HTTP PUT:', error);
          return throwError(() => error);
        })
      );
  }

  deletePost(postId: number): Observable<void> {
    const url = `${this.urlBase}/${postId}`;
    return this.http.delete<void>(url).pipe( //ELIMINA ALGUN DATO EXISTENTE 
      catchError(error => {
        console.error('Ocurrió un error en la solicitud HTTP DELETE:', error);
        return throwError(() => error);
      })
    );
  }

}
