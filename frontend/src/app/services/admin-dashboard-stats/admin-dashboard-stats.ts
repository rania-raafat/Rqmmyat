import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardStatsService {

  private apiUrl =
    'https://rqmmyat.vercel.app/api/dashboard';

  constructor(
    private http: HttpClient
  ) {}

  getStats() {

    return this.http.get(
      `${this.apiUrl}/stats`
    );

  }

}