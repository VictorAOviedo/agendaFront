import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from '../model/contact.interface';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-booking-patient-update',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './booking-patient-update.component.html',
  styleUrl: './booking-patient-update.component.css'
})
export class BookingPatientUpdateComponent implements OnInit{

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private contactService = inject(ContactService);
  


  form?: FormGroup;
  contac?: Contact;
  errors: string[] = [];
  message: string[] = [];
  


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    

    if (id) {
      this.contactService.get(parseInt(id))
        .subscribe(contact => {
          this.contac = contact;
          this.form = this.fb.group({
            //            name: [contact.name, [Validators.required]],
            //           lastName: [contact.lastName, [Validators.required]],
            //            cod: [contact.cod, [Validators.required]],
            //            phone: [contact.phone, [Validators.required]],
            //            email: [contact.email, [Validators.email]],

            name: [contact.name, []],
            lastName: [contact.lastName, []],
            cod: [contact.cod, []],
            phone: [contact.phone, []],
            email: [contact.email, []],
          });
        })
    } else {
      this.form = this.fb.group({
        //          name: ["", [Validators.required]],
        //          lastName: ["", [Validators.required]],
        //         cod: ["", [Validators.required]],
        //         phone: ["", [Validators.required]],
        //con expresiones regulares podemos hacer una validacion mas potente para email. Ahi usaremos Validators.pattern
        //         email: ["", [Validators.email]],

        name: ["", []],
        lastName: ["", []],
        cod: ["", []],
        phone: ["", []],
        email: ["", []],
      });
    }

  }


  //Creacion de cita (debe llevarme a elegir consultorio, para luego elegir horarios)
  save() {

    // para que no vieje un formulario vacio
    if (this.form?.invalid) {
      this.form.markAllAsTouched(); // hace que cada control sea tocado. Si toca el boton para enviar formulario, salta notificaciones en el front pidiendo completar los campos vacios
      return;
    }



    const contactForm = this.form!.value;
    let request: Observable<Contact>;


    if (this.contac) {
      request = this.contactService.update(this.contac.id, contactForm);

    } else {
      request = this.contactService.create(contactForm);
    }

      request
        .subscribe({
          next: (contact) => {
            this.errors = [];
            this.contactService.setContactId(contact.id);  // Aquí se almacena el ID del paciente
            this.router.navigate(['/ver-reservas']);
          },
          error: response => {
            this.errors = response.error.errors;
            console.log('response', response.error.errors)
          }
        });


   
  }

}
