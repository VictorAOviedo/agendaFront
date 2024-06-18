import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact } from '../model/contact.interface';
import { ContactService } from './contact.service';
import { Booking } from '../model/booking.interface';


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


  //crea reserva en el booking.component a partir del local - tratamiento - horarios (el id del paciente ya lo tiene)
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



// crea reserva completa de 0, todos los datos de entity booking y patient (DEBO HACER ALGO SIMILAR A CREATERESERVA 
//PARA PODER CONVERTIR EN STRING[] A DATEHOUR)
//create(booking: Booking){
//  return this.http.post<Booking>('http://localhost:8080/api/booking', booking)
//}

update(id: number, booking: any): Observable<Booking> {
  return this.http.put<Booking>(`http://localhost:8080/api/booking/${id}`, booking);
}

create(booking: any): Observable<Booking> {
  return this.http.post<Booking>('http://localhost:8080/api/booking', booking);
}



/*update(id: number, local: string, tratamiento: string, fechaHora: string, patientId: number, 
      namePatient: string, lastNamePatient: string, codPatient: number, phonePatient: number, emailPatient: string){
  
  const fechaHoraList: string[] = [fechaHora];

  const reserva = {
    place: local,
    treatment: tratamiento,
    dateHour: fechaHoraList,
    patientId: patientId,
    namePatient: namePatient,
    lastNamePatient: lastNamePatient,
    codPatient: codPatient,
    phonePatient: phonePatient,
    emailPatient: emailPatient
};
  
  return this.http.put(`http://localhost:8080/api/booking/${id}`, reserva)
}*/


//update(id: number, booking: Booking){
//  return this.http.put<Booking>(`http://localhost:8080/api/booking/${id}`, booking)
//}







  setReserva(reserva: any): void {
    this.reservaSubject.next(reserva);
  }

  getReserva(): Observable<any> {
    return this.reservaSubject.asObservable();
  }

//  getReservaData(): any {
//    return this.reservaData;
//  }

list(){
  return this.http.get<Booking[]>('http://localhost:8080/api/booking')
}


delete(id: number){
  return this.http.delete<void>(`http://localhost:8080/api/booking/${id}`)
}


get(id: number){
  return this.http.get<Booking>(`http://localhost:8080/api/booking/${id}`)
}







}

