import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostResponse } from '../interfaces/IPostResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private http: HttpClient = inject(HttpClient);
  // private readonly postsApiUrl = 'https://dummyjson.com/posts';

  getPosts(): Observable<IPostResponse> {
    return this.http.get<IPostResponse>('https://dummyjson.com/posts');
  }
}
