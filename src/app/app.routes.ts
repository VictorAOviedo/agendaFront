import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./contact-form/contact-form.component').then(m => m.ContactFormComponent)
    },
    {
        path: "citas",
        loadComponent: () => import('./ver-citas/ver-citas.component').then(m => m.VerCitasComponent)
    },
    {
        path: 'citas/:id/edit',
        loadComponent: () => import('./contact-form/contact-form.component').then(m => m.ContactFormComponent)
    },
    {
        path: "lugar",
        loadComponent: () => import('./booking/booking.component').then(m => m.BookingComponent)
    },
    {
        path: "detail-booking",
        loadComponent: () => import('./detail-booking/detail-booking.component').then(m => m.DetailBookingComponent)
    },


    {
        path: 'contact-form/:id',
        loadComponent: () => import('./contact-form/contact-form.component').then(m => m.ContactFormComponent)
    },

    {
        path: 'ver-reservas',
        loadComponent: () => import('./see-all-reservation/see-all-reservation.component').then(m => m.SeeAllReservationComponent)
    },
    {
        path: 'crear-reservas',
        loadComponent: () => import('./booking-create/booking-create.component').then(m => m.BookingCreateComponent)
    },
    {
        path: 'ver-reservas/:id/edit',
        loadComponent: () => import('./booking-create/booking-create.component').then(m => m.BookingCreateComponent)
    },
    {
        path: 'contact-form-booking/:id',
        loadComponent: () => import('./booking-patient-update/booking-patient-update.component').then(m => m.BookingPatientUpdateComponent)
    },
];
