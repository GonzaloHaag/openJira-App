import { isValidObjectId } from "mongoose"; //Para verificar que sea un id valido de mongo
import { db } from ".";
import entradaModel, { IEntrada } from "@/models/Entrada";

export const getEntradaPorId = async( id:string ): Promise<IEntrada | null> => {
   if( !isValidObjectId( id )) return null; //Si esto no es valido, retorno un null. Estoy preguntado si el id es valido de mong
   /**Si es valido me voy a conectar a la base de datos */
   await db.connect();
   const entrada = await entradaModel.findById( id ); //Busco en la base de datos la entrada con ese ID que recibo
   await db.disconnect();
   return JSON.parse(JSON.stringify(entrada)); //Esto es necesario, sino el ID dara un error de parsializacion
}