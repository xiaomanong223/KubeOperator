import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export abstract class CommonService<T> {
  baseUrl = '';

  protected constructor(public http: HttpClient) {

  }

  list(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  get(id: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + id + '/');
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item);
  }

  update(item: T): Observable<T> {
    return this.http.patch<T>(this.baseUrl, item);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + id + '/');
  }
}
