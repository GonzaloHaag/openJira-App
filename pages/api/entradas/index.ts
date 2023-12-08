/**Cuando alguien haga una llamada a api/entradas va a responder este archivo */
import { db } from '@/database'
import entradaModel, { IEntrada } from '@/models/Entrada'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = | { message: string }
| IEntrada[] //Arreglo de entradas
| IEntrada; //Una sola entrada (cuando me hagan el post)

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    /**Yo voy a tener dos endpoints, uno para crear entradas y otro para
     * obtenerlas, entonces del req.method puedo saber si me estan haciendo un 
     * GET para obtener las entradas o POST para crear una entrada.
     * Para el caso del PUT (actualizar entrada), yo quiero que me manden el id cuando me hacen la peticion HTTP,
     * es decir /api/entradas/IdTarea, lo mismo si quieren un Get (obtener info sobre una tarea en particular) para una sola tarea.
     */
    switch( req.method ) {
      case 'GET' :
        /**Cuando me hagan un get, quiero obtener todas las entradas */
        return getEntradas( res ); //Retorno la funcion y le mando la respuesta

    case 'POST' : 
    /**Cuando me hagan un post quieren crear una nueva entrada */
     return crearEntrada( req, res );

    default :
    return res.status(400).json({message:'EndPoint no existe'})
    }
}

const getEntradas = async( res:NextApiResponse<Data> ) => {
    await db.connect(); //Nos conectamos a la base de datos
    /**Voy a pedir las entradas y las voy a ordenar por la fecha de 
     * creacion de manera ascendente
     * Llamo a mi entradaModel
     */
    const entradas = await entradaModel.find().sort({ createdAt:'ascending' })
    await db.disconnect(); //Siempre desconectarse luego de hacer todo

    /**Ahora le respondemos algo al cliente, y le respondo con las entradas que tengo
     * en mi base de datos cuando me haga 
     * una peticion get a mi endpoint api/entradas
     * Cuando hago la peticion get desde el front, obtengo estas entradas
     */
    res.status(200).json( entradas )
}

const crearEntrada = async (req:NextApiRequest,res:NextApiResponse<Data>) => {
    /**Yo quiero la description de la req.body, si no lo recibo va a ser un string vacio */
    console.log( req.body ); //Aca tenemos lo que manda el frontend( cliente )
    /**Yo solo quiero la descripcion de la tarea y si no viene que sea un 
     * string vacio
     * Cuando me hacen un post deben enviarme la description en el body
    */
    const { description = '' } = req.body;
    const nuevaEntrada = new entradaModel({
      /**Creo una nueva entrada, con mi entradaModel, necesito grabar 
       * la descripcion que me manda el frontend y el createdAt lo puedo 
       * definir aqui
       * Es obligatorio que me manden la description desde el frontend
       * El id lo pone mongo
       */
      description,
      createdAt:Date.now(),
    });
    /**Ahora debo preparar la conexion para esta nueva entrada, lo envuelvo dentro de
     * un try catch ya que 
     * puede fallar
     */
    try {
        await db.connect();
        await nuevaEntrada.save(); //Esto guarda la entrada en la base de datos
        await db.disconnect();
        return res.status(201).json( nuevaEntrada ); //Si todo salio bien
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({message:'Algo salio mal, revisar consola del servidor'})
    }
   
}
