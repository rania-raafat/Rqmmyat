import { Injectable } from '@angular/core';
import { Service } from '../../models/service';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private servicesUrl =
    'https://rqmmyat.vercel.app/api/services';

  private uploadUrl =
    'https://rqmmyat.vercel.app/api/upload';

  constructor(
    private http: HttpClient
  ) {}

  getServices(): Observable<Service[]> {

    return this.http.get<Service[]>(
      this.servicesUrl
    );

  }

  getService(id: string) {

    return this.http.get(
      `${this.servicesUrl}/${id}`
    );

  }

  createService(data: Service) {

    return this.http.post(
      this.servicesUrl,
      data
    );

  }

  updateService(
    id: string,
    data: Service
  ) {

    return this.http.put(
      `${this.servicesUrl}/${id}`,
      data
    );

  }

  deleteService(id: string) {

    return this.http.delete(
      `${this.servicesUrl}/${id}`
    );

  }

  uploadImage(formData: FormData) {

    return this.http.post(
      this.uploadUrl,
      formData
    );

  }

}