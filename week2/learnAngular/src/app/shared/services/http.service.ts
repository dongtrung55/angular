import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUser } from '../../auth/shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrlUsers = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  public loadUsers(): Observable<any> {
    return this.http.get<IUser[]>(this.apiUrlUsers).pipe(
      catchError((error) => {
        console.error('Error get user:', error);
        return throwError(error);
      })
    );
  }

  public checkFieldExists(fieldName: string, fieldValue: string): Observable<boolean> {
    return this.http.get<IUser[]>(this.apiUrlUsers).pipe(
      catchError((error) => {
        console.error('Error reading users.json:', error);
        return throwError(error);
      }),
      map((users) => users.some((user) => user[fieldName] === fieldValue))
    );
  }

  public addUser(user: IUser): Observable<any> {
    return this.http.get<IUser[]>(this.apiUrlUsers).pipe(
      catchError((error) => {
        console.error('Error reading users.json:', error);
        return throwError(error);
      }),
      map((users) => {
        // Generate a new user_id
        user['id'] = (users.length + 2).toString();
        users.push(user);

        // Write updated data back to the file
        return this.http.post<IUser[]>(this.apiUrlUsers, user).pipe(
          catchError((error) => {
            console.error('Error adding user:', error);
            return throwError(error);
          })
        );
      })
    );
  }

  public updateUser(user: any): Observable<any> {
    return this.http.patch<IUser[]>(this.apiUrlUsers +'/'+ user.id, user).pipe(
      catchError((error) => {
        console.error('Error adding user:', error);
        return throwError(error);
      })
    );
  }

  public removeUser(user: any): Observable<any> {
    return this.http.delete<IUser[]>(this.apiUrlUsers + '/' +user.id).pipe(
      catchError((error) => {
        console.error('Error remove user:', error);
        return throwError(error);
      })
    );
  }

}
