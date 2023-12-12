import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(
    private http: HttpClient,
  ) {

  }

  list() {
    let params = new HttpParams();

    const opts = { params: params };

    return this.http.get<any>(`${environment.apiUrl}` + '/users/list', opts).pipe(map(res => {
      return res
    }))
  }

  create(data: any) {
    return this.http.post<any>(`${environment.apiUrl}` + '/users/create', data).pipe(map(res => {
      return res
    }))
  }

  update(data: any) {
    return this.http.put<any>(`${environment.apiUrl}` + '/users/update', data).pipe(map(res => {
      return res
    }))
  }

  deleteOne(id: string) {
    return this.http.delete<any>(`${environment.apiUrl}` + '/users/delete/' + id).pipe(map(res => {
      return res
    }))
  }

  deletelist(data: any) {
    return this.http.post<any>(`${environment.apiUrl}` + '/users/delete',data).pipe(map(res => {
      return res
    }))
  }
}