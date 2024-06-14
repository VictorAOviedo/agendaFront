import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatDateHour(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "EEEE dd/MM/yyyy, HH:mm 'hs'", { locale: es });
}
