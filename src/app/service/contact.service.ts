import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Contact } from '../model/contact.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  private http = inject(HttpClient);

  


  list(){
    return this.http.get<Contact[]>('http://localhost:8080/patient')
  }

  get(id: number){
    return this.http.get<Contact>(`http://localhost:8080/patient/${id}`)
  }

  create(contact: Contact){
    return this.http.post<Contact>('http://localhost:8080/patient', contact)
  }

  update(id: number, contact: Contact){
    return this.http.put<Contact>(`http://localhost:8080/patient/${id}`, contact)
  }

  delete(id: number){
    return this.http.delete<void>(`http://localhost:8080/patient/${id}`)
  }

  private contactIdSubject = new BehaviorSubject<number | null>(null);
  contactId$ = this.contactIdSubject.asObservable();

  setContactId(id: number) {
    this.contactIdSubject.next(id);
  }


}
