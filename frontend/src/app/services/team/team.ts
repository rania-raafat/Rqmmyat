import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Team } from '../../models/team';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamUrl = 'https://rqmmyat.vercel.app/api/team';

  private uploadUrl = 'https://rqmmyat.vercel.app/api/upload';

  constructor(private http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamUrl);
  }

  getTeam(id: string): Observable<Team> {
    return this.http.get<Team>(`${this.teamUrl}/${id}`);
  }

  createTeam(data: Team) {
    return this.http.post<Team>(
      this.teamUrl,

      data,
    );
  }

  updateTeam(id: string, data: Team) {
    return this.http.put<Team>(
      `${this.teamUrl}/${id}`,

      data,
    );
  }

  deleteTeam(id: string) {
    return this.http.delete(`${this.teamUrl}/${id}`);
  }

  uploadImage(formData: FormData) {
    return this.http.post(
      this.uploadUrl,

      formData,
    );
  }
}
