import { Component, OnInit, inject } from '@angular/core';
import { Contact } from '../model/contact.interface';
import { ReservasService } from '../service/booking.service';
import { ContactService } from '../service/contact.service';
import { BookingComponent } from '../booking/booking.component';
import { Booking } from '../model/booking.interface';
import { RouterModule, RouterLink } from '@angular/router';
import { formatDate, formatHour } from '../model/date-utils';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-see-all-reservation',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule, FormsModule],
  templateUrl: './see-all-reservation.component.html',
  styleUrl: './see-all-reservation.component.css'
})
export class SeeAllReservationComponent implements OnInit{

  private bookingService = inject(ReservasService);


  bookings: Booking[] = []
  filteredBookings: Booking[] = [];

  filterValues = {
    id: '',
    place: '',
    treatment: '',
    date: '',
    hour: '',
    name: '',
    phone: '',
    email: '',
    patientId: ''
  };

  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  

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

  applyFilters(): void {
    this.filteredBookings = this.bookings.filter(booking => {
      return (!this.filterValues.id || booking.id.toString().includes(this.filterValues.id)) &&
             (!this.filterValues.place || booking.place.toLowerCase().includes(this.filterValues.place.toLowerCase())) &&
             (!this.filterValues.treatment || booking.treatment.toLowerCase().includes(this.filterValues.treatment.toLowerCase())) &&
             (!this.filterValues.date || this.formatDate(booking.dateHour).includes(this.filterValues.date)) &&
             (!this.filterValues.hour || this.formatHour(booking.dateHour).includes(this.filterValues.hour)) &&
             (!this.filterValues.name || `${booking.patient.name} ${booking.patient.lastName}`.toLowerCase().includes(this.filterValues.name.toLowerCase())) &&
             (!this.filterValues.phone || `${booking.patient.cod}${booking.patient.phone}`.includes(this.filterValues.phone)) &&
             (!this.filterValues.email || booking.patient.email.toLowerCase().includes(this.filterValues.email.toLowerCase())) &&
             (!this.filterValues.patientId || booking.patient.id.toString().includes(this.filterValues.patientId));
    });
    this.applySorting();
  }

  applySorting(): void {
    if (this.sortColumn) {
      this.filteredBookings.sort((a, b) => {
        let valueA = this.getSortValue(a, this.sortColumn!);
        let valueB = this.getSortValue(b, this.sortColumn!);

        if (valueA < valueB) {
          return this.sortDirection === 'asc' ? -1 : 1;
        } else if (valueA > valueB) {
          return this.sortDirection === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
  }

  getSortValue(booking: Booking, column: string): any {
    switch (column) {
      case 'date':
        return new Date(booking.dateHour);
      case 'hour':
        return new Date(booking.dateHour).getTime();
      default:
        return '';
    }
  }

  sortColumnBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applySorting();
  }

  


  formatDate(dateString: string): string {
    return formatDate(dateString);
  }

  formatHour(dateString: string): string {
    return formatHour(dateString);
  }

  trackById(index: number, booking: Booking): number {
    return booking.id;
  }
}
