import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact } from '../model/contact.interface';
import { ContactService } from './contact.service';


@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  
  private apiUrl = 'http://localhost:8080';
  private reservaSubject = new BehaviorSubject<any>(null);
  //contac?: Contact;
 // private reservaData: any;



  constructor(private http: HttpClient) { }



  getTratamientos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/treatment`);
  }

  getLocales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/place`);
  }

  getHorarios(local: string, tratamiento: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/schedules`, {
      params: {
        place: local,
        treatment: tratamiento
      }
    });
  }


  createReserva(local: string, tratamiento: string, fechaHora: string, patientId: number): Observable<any> {

    // Convertir la cadena de fecha y hora en una lista
    const fechaHoraList: string[] = [fechaHora];

    // Crear un objeto con los datos de la reserva
    const reserva = {
        place: local,
        treatment: tratamiento,
        dateHour: fechaHoraList,
        patientId: patientId
    };

    // Enviar el objeto en el cuerpo de la solicitud
    return this.http.post(`${this.apiUrl}/api/booking`, reserva);
}


  setReserva(reserva: any): void {
    this.reservaSubject.next(reserva);
  }

  getReserva(): Observable<any> {
    return this.reservaSubject.asObservable();
  }

//  getReservaData(): any {
//    return this.reservaData;
//  }



}

