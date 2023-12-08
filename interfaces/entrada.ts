/**Como va a lucir mi entrada */
export interface Entrada  {
   /**Va a tener un id de tipo string,descripcion de tipo string
    * fecha de tipo number y el estado sera si 
    * esta completada, en proceso o pendiente
    */
   _id:string;
   description:string;
   createdAt:number;
   status: EntradaStatus; //Solo va a permitir los que esten en este type 
}
export type EntradaStatus = 'pendiente' | 'en-progreso' | 'completada'