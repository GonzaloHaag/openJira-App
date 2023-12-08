/**Yo quiero que cuando me hagan una peticion HTTP a una tarea en particular como:
 * /api/entradas/idTarea, quiero mostrar este archivo, y como es un argumento dinamico, debo
 * hacerlo asi
 * A este endpoint me pueden hacer un get a esa tarea especifica, un Put para actualizarla o un
 * delete para borrarla
 * Este archivo es para el endpoint /api/entradas/idTarea
 */
import { db } from "@/database";
import entradaModel, { IEntrada } from "@/models/Entrada";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IEntrada;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log(req.query); aca viene el id dinamico de la URL, es decir el id de la tarea --> clave
  const { id } = req.query; //Pido el id solamente -> Siempre son string
  if (!mongoose.isValidObjectId(id)) {
    /**Voy a preguntar si el id que me mandan en la URL es una objeto valido de mongo, si no lo es, retorno
     * un error
     */
    return res.status(400).json({ message: "El id no es válido" });
  }
  switch (
    req.method //Para saber que metodo es, si PUT, GET O DELETE
  ) {
    case "PUT":
      /**Para actualizar la entrada, siempre poner return */
      return actualizarEntrada(req,res);
    case "GET":
        /**Devolver la entrada que me estan pidiendo por url(endpoint) */
      return obtenerEntrada(req,res);

    case "DELETE" :
      return borrarTarea(req,res);

    default:
      return res.status(400).json({ message: "El metodo no existe" });
  }
}

const actualizarEntrada = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query; //En el req.query viene lo que es dinamico en la URL, en este caso el id de la tarea
  await db.connect();
  const entradaPorActualizar = await entradaModel.findById(id); //Busco por ID en mi entradaModel

  if (!entradaPorActualizar) {
    /**Si esto es null */
    return res.status(400).json({ message: "No hay entrada con es ID: " + id });
  }
  /**Ahora yo quiero desestructurar algo que viene del req.body, que es lo que me manda el
   * frontend
   * Si la descripcion viene uso esa, si no uso la que ya estaba en mi entradaPorActualizar, lo mismo con
   * el status
   * Al ponerle un valor por defecto, hace que no sea obligatorio mandar estos parametros desde el frontend
   */
  const {
    description = entradaPorActualizar.description,
    status = entradaPorActualizar.status,
  } = req.body;
  try {
    /**El findByIdAndUpdate recibe el id a actualizar y lo que quiero actualizar de esa tarea, en este caso
     * la descripcion y el status
     * Siempre trabajando con el entradaModel
     * El run validators es para que en el status solo tome los enums permitidos que defini en models, Entrada.ts
     */
    const updatedEntry = await entradaModel.findByIdAndUpdate(
      id, //el id de la query que viene en la URL
      { description, status },
      { runValidators: true, new: true }
    );
    /**Si todo salio bien devuelvo la entrada actualizada, el ! es para decirle que nunca va a ser null, con esto si
     * yo en el body cambio la descripcion o el status, se actualizara en mi base de datos. Pero siempre desde el frontend.
     * Si no me mandan nada desde el front con el description o status, muestro la tarea como estaba antes.
     */
    res.status(200).json(updatedEntry!);
    await db.disconnect(); //Siempre esto
  } catch (error:any) {
    await db.disconnect();
    res.status(400).json({ message:error.errors.status.message })
  }
};

const obtenerEntrada = async(req:NextApiRequest,res:NextApiResponse<Data>) => {
    const { id } = req.query; //En el req.query viene lo que es dinamico en la URL, en este caso el id de la tarea
    await db.connect();
    const entradaBuscada = await entradaModel.findById( id ); //Busco EN MI MODEL POR EL ID QUE ME MANDAN EN LA URL
    await db.disconnect();
    if( !entradaBuscada ) {
        //Si es null
        return res.status(400).json({message:'El id solicitado no existe: ' + id})
    }
    return res.status(200).json( entradaBuscada ); //Devuelvo la entrada buscada por ID si existe en mi base de datos
}

/**Para borrar una tarea, no devuelvo nada porque la tarea se elimino, no tengo nada por retornar */
const borrarTarea = async(req:NextApiRequest,res:NextApiResponse<Data>) => {
  const { id } = req.query; //obtengo el id que viene por url
  await db.connect();
  await entradaModel.findByIdAndDelete( id );
  await db.disconnect();
  res.status(200).json({ message:'Tarea eliminada correctamente' })
 
}