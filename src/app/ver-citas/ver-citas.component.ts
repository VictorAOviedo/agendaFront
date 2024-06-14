import { Component, OnInit, inject } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { Contact } from '../model/contact.interface';
import { RouterLink, RouterModule } from '@angular/router';
import { ReservasService } from '../service/booking.service';

@Component({
  selector: 'app-ver-citas',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './ver-citas.component.html',
  styleUrl: './ver-citas.component.css'
})
export class VerCitasComponent implements OnInit{
  private contactService = inject(ContactService);

  //RESERVA
  //reserva: any;

  constructor(private reservasService: ReservasService){}

  contacts: Contact[] = []

  ngOnInit(): void {
    this.contactService.list()
    this.loadAll();


    ////RESERVA
    //this.reservasService.getReserva().subscribe(data => {
    //  this.reserva = data;
    //});

  }

  loadAll(){
    this.contactService.list()
    .subscribe(contacts => {
      this.contacts = contacts
    });
  }

  deleteContact(contact: Contact){
    this.contactService.delete(contact.id)
    .subscribe (() => {
      this.loadAll();
      console.log("delete: ok");
    })
  }
 
}
