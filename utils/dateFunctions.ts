/**Funcion para calcular hace cuanto se creo una entrada */
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const getFormatDistanceToNow = ( fecha:number ) => {
  const fromNow = formatDistanceToNow( fecha, { locale: es } );
  return fromNow;
}