import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  Project
} from '../../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projectsUrl =
    'https://rqmmyat.vercel.app/api/projects';

  private uploadUrl =
    'https://rqmmyat.vercel.app/api/upload';

  constructor(
    private http: HttpClient
  ) {}

  getProjects(): Observable<Project[]> {

    return this.http.get<Project[]>(
      this.projectsUrl
    );

  }

  getProject(
    id: string
  ): Observable<Project> {

    return this.http.get<Project>(
      `${this.projectsUrl}/${id}`
    );

  }

  createProject(
    data: Project
  ) {

    return this.http.post<Project>(
      this.projectsUrl,
      data
    );

  }

  updateProject(
    id: string,
    data: Project
  ) {

    return this.http.put<Project>(
      `${this.projectsUrl}/${id}`,
      data
    );

  }

  deleteProject(
    id: string
  ) {

    return this.http.delete(
      `${this.projectsUrl}/${id}`
    );

  }

  uploadImage(
    formData: FormData
  ) {

    return this.http.post(
      this.uploadUrl,
      formData
    );

  }

}