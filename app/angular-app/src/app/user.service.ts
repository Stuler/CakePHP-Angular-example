import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root' // ✅ This ensures UserService is globally available
})
export class UserService {
  private baseUrl = 'http://localhost:8765/api/users';

  constructor(private http: HttpClient) {}  // ✅ Inject HttpClient

  getUsers(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(response => response.users) // ✅ Extract the correct array from the response
    );
  }

}
