import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatDateHour(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "EEEE dd/MM/yyyy, HH:mm 'hs'", { locale: es });
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy", { locale: es });
}

export function formatHour(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "HH:mm", { locale: es });
}
