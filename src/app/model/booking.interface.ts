import { Contact } from "./contact.interface";

export interface Booking{
    id: number;
    place: string;
    treatment: string;
    dateHour: string;
    patient: Contact;
}