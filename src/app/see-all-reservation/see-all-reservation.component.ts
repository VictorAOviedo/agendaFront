import { Component, OnInit, inject } from '@angular/core';
import { Contact } from '../model/contact.interface';
import { ReservasService } from '../service/booking.service';
import { ContactService } from '../service/contact.service';
import { BookingComponent } from '../booking/booking.component';
import { Booking } from '../model/booking.interface';
import { RouterModule, RouterLink } from '@angular/router';
import { formatDate, formatHour } from '../model/date-utils';

@Component({
  selector: 'app-see-all-reservation',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './see-all-reservation.component.html',
  styleUrl: './see-all-reservation.component.css'
})
export class SeeAllReservationComponent implements OnInit{

  private bookingService = inject(ReservasService);


  bookings: Booking[] = []

  ngOnInit(): void {
    this.bookingService.list()
    this.loadAll();

  }

  loadAll(){
    this.bookingService.list()
    .subscribe(booking => {
      this.bookings = booking
    });
  }

  deleteContact(booking: Booking){
    this.bookingService.delete(booking.id)
    .subscribe (() => {
      this.loadAll();
      console.log("delete: ok");
    })
  }

  formatDate(dateString: string): string {
    return formatDate(dateString);
  }

  formatHour(dateString: string): string {
    return formatHour(dateString);
  }
}
