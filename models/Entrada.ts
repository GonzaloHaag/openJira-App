/**Todo esto corre del lado del servidor */
import { Entrada } from "@/interfaces";
import mongoose, {Schema,Model} from "mongoose";

export interface IEntrada extends Entrada {
    /**Al hacer que se extienda de la interface Entrada, voy 
     * a tener las mismas propiedades que esa interface (
     *   _id:string;
   description:string;
   createdAt:number;
   status: EntradaStatus; //Solo va a permitir los que esten en este type)
   Pero si necesito algo adicional solamente para el modelo, lo agrego 
   aca dentro y listo, no necesito cambiarlo en ambos lados
     */

}
const entradaSchema = new Schema({
    /**Definir las propiedades que mis documentos van a tener,
     * por ejemplo el schema de la entrada va a tener un description,creacion y 
     * el estado(completada,pendiente, progreso)
     */
    description: { type:String, required:true }, //Va a ser de tipo string y requerida si o si
    createdAt : { type:Number },
    status : {
        type:String,
        enum:{
            values:['pendiente','en-progreso','completada'], //Para aceptar solo estos 3 status
            message: '{VALUE} no es un estado permitido'
        },
        default:'pendiente' //Valor por defecto del status
    }

});

/**Si esta definido el modelo, que lo use pero sino que lo cree, el mongoose.model recibe el nombre que le quiero dar, y
 * el schema
 * Con este modelo trabajamos siempre para hacer acciones(PUT,GET,DELETE,POST) cuando se llaman a nuestros endpoints
 */
const entradaModel: Model<IEntrada> = mongoose.models.Entrada || mongoose.model('Entrada',entradaSchema);
//Ponerle que el model usa la interface IEntrada es clave, para tener acceso al .description, .status o lo que quier

export default entradaModel;