import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../service/booking.service';
import { CommonModule } from '@angular/common';
import { formatDateHour } from '../model/date-utils';
import { ContactService } from '../service/contact.service';


@Component({
  selector: 'app-detail-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-booking.component.html',
  styleUrl: './detail-booking.component.css'
})
export class DetailBookingComponent implements OnInit{

  reserva: any;
  patient: any;
  contact: any;
  patientId: number | null = null;

  constructor(private reservasService: ReservasService, private contactService: ContactService) { }

  ngOnInit(): void {
    this.reservasService.getReserva().subscribe(reserva => {
      this.reserva = reserva;
    });

    this.contactService.contactId$.subscribe(id => {
      this.patientId = id;
    });
  }

  formatDate(dateString: string): string {
    return formatDateHour(dateString);
  }


}
