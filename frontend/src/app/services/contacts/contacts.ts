import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Contact } from '../../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private contactsUrl = 'https://rqmmyat.vercel.app/api/contacts';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl);
  }

  getContact(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.contactsUrl}/${id}`);
  }

  createContact(data: Contact) {
    return this.http.post<Contact>(
      this.contactsUrl,
      data
    );
  }

  updateContact(id: string, data: Contact) {
    return this.http.put<Contact>(
      `${this.contactsUrl}/${id}`,
      data
    );
  }

  deleteContact(id: string) {
    return this.http.delete(
      `${this.contactsUrl}/${id}`
    );
  }
}