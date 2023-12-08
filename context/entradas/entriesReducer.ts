import { Entrada } from "@/interfaces";
import { EntradasEstado } from "."


type EntradasActionType = 
//Como quiero que luzca el action.type en el switch del reducer
/**Tambien me van a mandar un payload(va a ser la entrada que se quiere agregar), que sera de tipo Entrada(tendra 
 * id description y eso) */
| { type: '[Entrada] Agregar-entrada',payload:Entrada }
/**Me voy a crear un type para la accion de que cuando 
 * dejo caer la tarea en una lista, cambie su status correspondiente al de 
 * esa lista (pendiente, en progreso o completada)
 */
| { type: '[Entrada] ActualizarStatus - entrada', payload:Entrada} 
| { type: '[Entrada] Refrescar - data',payload:Entrada[]}
//| { type: '[Entrada] Borrar - Tarea',payload:string} //Que me manden el ID de la tarea


//El reducer recibe el estado que va a ser de tipo EntradasEstado y el action, que va a tener el action.type que va a lucir de la forma que declaramos en el type EntradasActionType
//Va a devolver algo de tipo EntradasEstado
export const entriesReducer = (state : EntradasEstado,action:EntradasActionType):EntradasEstado => {
    switch(action.type) {
        /**Definimos el type de EntradasActionType para 
         * cuando hagamos este switch en el case ya me salgan todos los 
         * type que defini alli y no otro.
         */
        case '[Entrada] Agregar-entrada' :
            //En el caso de que se quiera agregar una entrada
            return{
                /**Desestructuro el estado y el array de entradas sera 
                 * lo que ya habia en el array mas el payload que me pasen,YA QUE 
                 * ESE PAYLOAD SERA LA ENTRADA A AGREGAR EN EL ARRAY --> CLAVE
                 */
                ...state,
                entradas: [...state.entradas,action.payload]
            }

        case '[Entrada] ActualizarStatus - entrada':
            return {
                ...state,
                /**Ahora quiero regresar un nuevo arreglo de entradas, ya que quiero modificar solamente 
                 * la entrada que estoy recibiendo en el payload
                 */
                entradas:state.entradas.map((entrada) => {
                    if(entrada._id === action.payload._id) {
                        /**Si esta entrada tiene el mismo id que la entrada.id que 
                         * me estan pasando en el payload, significa que esta es la entrada que debo modificar
                         */
                        entrada.status = action.payload.status; //Es igual al payload.status que se modifico
                        entrada.description = action.payload.description; //Es igual al payload.description que se modifico
                    }
                    return entrada;
                })
            }
        //Para refrescar las tareas que obtengo de mi base de datos
        case '[Entrada] Refrescar - data':
            return{
                ...state,
                entradas : [...action.payload]
            }
        
        //Para borrar una tarea desde el detalle
        // case '[Entrada] Borrar - Tarea':
        //     return{
        //         ...state,
        //         /**Quiero retornar el arreglo de entradas pero sin la entrada que se borro, le hago un filter al estado.entradas 
        //          * y me quedo con todas menos con la que me pasan por el payload(que es la que quiero borrar)
        //          */
        //         entradas: [...state.entradas.filter((task) => task._id !== action.payload)]
        //     }

            default:
                return state; //Esto siempre
    }
}