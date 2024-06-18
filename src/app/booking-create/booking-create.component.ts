import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReservasService } from '../service/booking.service';
import { Booking } from '../model/booking.interface';
import { ContactService } from '../service/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-create',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './booking-create.component.html',
  styleUrl: './booking-create.component.css'
})
export class BookingCreateComponent implements OnInit{

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private bookingService = inject(ReservasService);
  


  patientId: number | null = null;
  


  form?: FormGroup;
  booking?: Booking;
  errors: string[] = [];
  message: string[] = [];

  locales: any[] = [];
  tratamientos: any[] = [];
  horarios: any[] = [];
  localSeleccionado: string = '';
  tratamientoSeleccionado: string = '';

  constructor(private reservasService: ReservasService, private contactService: ContactService) { }
 

  ngOnInit(): void {
    


    this.reservasService.getLocales().subscribe(data => {
      this.locales = data;
    });

    this.reservasService.getTratamientos().subscribe(data => {
      this.tratamientos = data;
    });

    this.contactService.contactId$.subscribe(id => {
      this.patientId = id;
    });




    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bookingService.get(parseInt(id)).subscribe(booking => {
          this.booking = booking;
          this.localSeleccionado = booking.place;
        this.tratamientoSeleccionado = booking.treatment;
          this.form = this.fb.group({
            //            name: [contact.name, [Validators.required]],
            //           lastName: [contact.lastName, [Validators.required]],
            //            cod: [contact.cod, [Validators.required]],
            //            phone: [contact.phone, [Validators.required]],
            //            email: [contact.email, [Validators.email]],

            place: [booking.place, []],
            treatment: [booking.treatment, []],
            dateHour: [booking.dateHour, []],
            idPatient: [booking.patient.id,[]],
            namePatient: [booking.patient.name, []],
            lastNamePatient: [booking.patient.lastName, []],
            codPatient: [booking.patient.cod, []],
            phonePatient: [booking.patient.phone, []],
            emailPatient: [booking.patient.email, []],
          });        
          this.onBuscarHorarios();
        });
    } else {
      this.form = this.fb.group({
        //          name: ["", [Validators.required]],
        //          lastName: ["", [Validators.required]],
        //         cod: ["", [Validators.required]],
        //         phone: ["", [Validators.required]],
        //con expresiones regulares podemos hacer una validacion mas potente para email. Ahi usaremos Validators.pattern
        //         email: ["", [Validators.email]],

        place: ["", []],
        treatment: ["", []],
        dateHour: ["", []],
        namePatient: ["", []],
        lastNamePatient: ["", []],
        codPatient: ["", []],
        phonePatient: ["", []],
        emailPatient: ["", []],
      });

       // Call onBuscarHorarios when place or treatment changes
       this.form.get('place')?.valueChanges.subscribe(value => {
        this.localSeleccionado = value;
        this.onBuscarHorarios();
      });

      this.form.get('treatment')?.valueChanges.subscribe(value => {
        this.tratamientoSeleccionado = value;
        this.onBuscarHorarios();
      });

    }

  }

  onBuscarHorarios(): void {
    this.localSeleccionado = this.form?.get('place')?.value;
    this.tratamientoSeleccionado = this.form?.get('treatment')?.value;
  
    if (this.localSeleccionado && this.tratamientoSeleccionado) {
      this.reservasService.getHorarios(this.localSeleccionado, this.tratamientoSeleccionado).subscribe(data => {
        this.horarios = data.dateHour;
      });
    }
  }
  




  

save() {
  if (this.form?.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const bookingForm = this.form!.value;
  let request: Observable<any>;

  if (this.booking) {
    const { place, treatment, dateHour } = bookingForm;
    const updatedBooking = {
      place,
      treatment,
      dateHour: [dateHour], // Enviar dateHour como una lista
      patientId: this.booking.patient.id, // Utiliza el ID del paciente existente
    
    };
    request = this.bookingService.update(this.booking.id, updatedBooking);
  } else {
    const newBooking = {
      place: bookingForm.place,
      treatment: bookingForm.treatment,
      dateHour: [bookingForm.dateHour], // Enviar dateHour como una lista
    
    };
    request = this.bookingService.create(newBooking);
  }

  request.subscribe({
    next: (booking) => {
      this.errors = [];
      this.router.navigate(['/ver-reservas']);
    },
    error: response => {
      this.errors = response.error.errors;
      console.log('response', response.error.errors);
    }
  });
}


onEditarContacto(): void {
  const idPatient = this.form?.get('idPatient')?.value;
  if (idPatient) {  
    this.save;
    this.router.navigate(['/contact-form-booking', idPatient]);
  } else {
    console.error('Patient ID is null or undefined');
  }
}
  

}






