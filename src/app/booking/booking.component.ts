import { Component, OnInit, inject } from '@angular/core';
import { ReservasService } from '../service/booking.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit{

  locales: any[] = [];
  tratamientos: any[] = [];
  horarios: any[] = [];
  localSeleccionado: string = '';
  tratamientoSeleccionado: string = '';
  horarioSeleccionado: string = '';
  patientId: number | null = null;
  private router = inject(Router);

  constructor(private reservasService: ReservasService, private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.contactId$.subscribe(id => {
      this.patientId = id;
    });


    this.reservasService.getLocales().subscribe(data => {
      this.locales = data;
    });

    this.reservasService.getTratamientos().subscribe(data => {
      this.tratamientos = data;
    });
  }

  onBuscarHorarios(): void {
    if (this.localSeleccionado && this.tratamientoSeleccionado) {
      this.reservasService.getHorarios(this.localSeleccionado, this.tratamientoSeleccionado).subscribe(data => {
        this.horarios = data.dateHour;
      });
    }
  }

  onReservarHorario(): void {
    if (this.localSeleccionado && this.tratamientoSeleccionado && this.horarioSeleccionado && this.patientId !== null) {
      this.reservasService.createReserva(this.localSeleccionado, this.tratamientoSeleccionado, this.horarioSeleccionado, this.patientId).subscribe(data => {
        console.log('Reserva creada:', data);
        alert('Reserva creada exitosamente');
        this.reservasService.setReserva(data);
        this.router.navigate(['/detail-booking']);
      }, error => {
        console.error('Error creating reserva:', error);
        alert('Error al crear la reserva');
      });
    }
  }

  onEditarContacto(): void {
    if (this.patientId !== null) {
      this.router.navigate(['/contact-form', this.patientId]);
    }
  }

}
