import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Client } from '../../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private clientsUrl = 'https://rqmmyat.vercel.app/api/clients';

  private uploadUrl = 'https://rqmmyat.vercel.app/api/upload';

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientsUrl);
  }

  getClient(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.clientsUrl}/${id}`);
  }

  createClient(data: Client) {
    return this.http.post<Client>(this.clientsUrl, data);
  }

  updateClient(id: string, data: Client) {
    return this.http.put<Client>(`${this.clientsUrl}/${id}`, data);
  }

  deleteClient(id: string) {
    return this.http.delete(`${this.clientsUrl}/${id}`);
  }

  uploadImage(formData: FormData) {
    return this.http.post(this.uploadUrl, formData);
  }
}
