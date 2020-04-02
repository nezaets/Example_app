import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, PostComment } from './post';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  public constructor(private httpClient: HttpClient) { }

  public getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  public getPostComments(postId: number): Observable<PostComment[]> {
    const params = new HttpParams().set('userId', String(postId))
    return this.httpClient.get<PostComment[]>(`https://jsonplaceholder.typicode.com/comments/`, { params });
  }
}
